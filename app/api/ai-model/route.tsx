import Constants from "@/data/Constants";
import { NextRequest } from "next/server";
import OpenAI from "openai";

// Configure OpenAI client with timeout
const openai = new OpenAI({
    baseURL: "https://openrouter.ai/api/v1",
    apiKey: process.env.OPENROUTER_AI_API_KEY,
    timeout: 50000, // 50 second timeout (leaving buffer for Vercel's 60s limit)
    maxRetries: 2, // Retry failed requests twice
});

export const maxDuration = 60;
export const runtime = 'edge'; // Use Edge runtime for better performance

export async function POST(req: NextRequest) {
    try {
        // Parse request with validation
        const body = await req.json();
        const { model, description, imageUrl } = body;
        
        if (!description || !imageUrl) {
            return new Response(
                JSON.stringify({ error: "Missing required parameters" }),
                { status: 400, headers: { "Content-Type": "application/json" } }
            );
        }

        // Find model or use default
        const ModelObj = Constants.AiModelList.find(item => item.name === model);
        const modelName = ModelObj?.modelName ?? 'google/gemini-2.0-pro-exp-02-05:free';
        
        // Optimize prompt for better performance
        const optimizedDescription = description.trim().slice(0, 1000); // Limit description length
        
        // Create completion with optimized parameters
        const response = await openai.chat.completions.create({
            model: modelName,
            stream: true,
            max_tokens: 2000, // Limit token usage
            temperature: 0.7, // Slightly reduce randomness for faster responses
            messages: [
                {
                    "role": "user",
                    "content": [
                        {
                            "type": "text",
                            "text": optimizedDescription
                        },
                        {
                            "type": "image_url",
                            "image_url": {
                                "url": imageUrl
                            }
                        }
                    ]
                }
            ]
        });

        // Create a readable stream with error handling
        const stream = new ReadableStream({
            async start(controller) {
                try {
                    for await (const chunk of response) {
                        const text = chunk.choices?.[0]?.delta?.content || "";
                        if (text) {
                            controller.enqueue(new TextEncoder().encode(text));
                        }
                    }
                } catch (error) {
                    console.error("Stream processing error:", error);
                    controller.enqueue(new TextEncoder().encode("\nError during processing. Please try again."));
                } finally {
                    controller.close();
                }
            },
        });

        return new Response(stream, {
            headers: {
                "Content-Type": "text/plain; charset=utf-8",
                "Cache-Control": "no-cache, no-transform",
            },
        });
    } catch (error) {
        console.error("API error:", error);
        return new Response(
            JSON.stringify({ error: "Failed to process request" }),
            { status: 500, headers: { "Content-Type": "application/json" } }
        );
    }
}