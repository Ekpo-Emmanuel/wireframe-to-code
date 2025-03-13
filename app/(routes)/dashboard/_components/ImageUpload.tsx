"use client";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  CloudUpload,
  FileImage,
  ImageIcon,
  Loader2Icon,
  Upload,
  WandSparkles,
  X,
} from "lucide-react";
import Image from "next/image";
//@ts-ignore
import uuid4 from "uuid4";
import React, { ChangeEvent, useState } from "react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { supabase } from "@/configs/supabaseConfig";
import axios from "axios";
import { useAuth } from "@/app/auth-context";
import { useRouter } from "next/navigation";
import Constants from "@/data/Constants";
import { toast } from "sonner";

function ImageUpload() {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [file, setFile] = useState<any>();
    const [model, setModel] = useState<string>();
    const [description, setDescription] = useState<string>();
  const { user } = useAuth();
    const router = useRouter();
    const [loading, setLoading] = useState(false);

  const handleImageSelect = (event: ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files) {
            const imageUrl = URL.createObjectURL(files[0]);
            setFile(files[0]);
            setPreviewUrl(imageUrl);
        }
  };

  const handleConvertToCode = async () => {
        if (!file || !model || !description) {
      toast.error("Please complete all fields before continuing");
            return;
        }

        setLoading(true);

    try {
      const fileName = `${Date.now()}_${uuid4()}.png`;
      const filePath = `wireframe-to-code/${fileName}`;

      const { data, error } = await supabase.storage
        .from("wireframes")
        .upload(filePath, file, {
          cacheControl: "3600",
          upsert: false,
        });

      if (error) {
        throw error;
      }


      const { data: urlData } = supabase.storage
        .from("wireframes")
        .getPublicUrl(filePath);

      const imageUrl = urlData.publicUrl;

        const uid = uuid4();
      const result = await axios.post("/api/wireframe-to-code", {
            uid: uid,
            description: description,
            imageUrl: imageUrl,
            model: model,
        email: user?.email,
        });

        if (result.data?.error) {
        toast.error(
          "Not enough credits available. Please purchase more credits to continue."
        );
            setLoading(false);
            return;
        }

      setLoading(false);
      toast.success("Conversion started successfully!");
      router.push("/view-code/" + uid);
    } catch (error: any) {
      toast.error(`Upload failed: ${error.message}`);
        setLoading(false);
    }
  };

    return (
    <div className="mt-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Image Upload Section */}
        <div className=" overflow-hidden border dark:bg-sidebar">
          <div className="p-6 border-b ">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              Wireframe Image
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Upload your wireframe or design mockup
            </p>
          </div>

          <div className="p-6">
            {!previewUrl ? (
              <div className="border-2 h-full border-dashed border-gray-300 dark:border-gray-700 p-8 flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-800/50 transition-all hover:bg-gray-100 dark:hover:bg-gray-800">
                <div className="w-16 h-16 mb-4 bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center">
                  <FileImage className="h-8 w-8 text-blue-500 dark:text-blue-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
                  Upload Wireframe
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 text-center mb-6">
                  Drag and drop your image here, or click to browse
                </p>
                <label htmlFor="imageSelect" className="cursor-pointer">
                  <div className="inline-flex items-center justify-center px-4 h-8 text-sm py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium hover:from-blue-700 hover:to-purple-700 transition-all">
                    <Upload className="h-4 w-4 mr-2" />
                    Select Image
                  </div>
                        </label>
                <input
                  type="file"
                  id="imageSelect"
                  className="hidden"
                  accept="image/*"
                        multiple={false}
                  onChange={handleImageSelect}
                />
                {/* <p className="mt-4 text-xs text-gray-500 dark:text-gray-400">
                                    Supported formats: PNG, JPG, JPEG, GIF
                                </p> */}
              </div>
            ) : (
              <div className="relative overflow-hidden border border-gray-200 dark:border-gray-700">
                <div className="aspect-video relative bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                  <Image
                    src={previewUrl}
                    alt="Preview"
                    width={800}
                    height={600}
                    className="max-w-full max-h-[300px] object-contain"
                  />
                </div>
                <button
                            onClick={() => setPreviewUrl(null)}
                  className="absolute top-2 right-2 p-1.5 bg-white/80 dark:bg-gray-800/80 text-gray-700 dark:text-gray-300 hover:text-red-500 dark:hover:text-red-400"
                >
                  <X className="h-4 w-4" />
                </button>
                <div className="p-3 bg-gray-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 text-xs text-gray-500 dark:text-gray-400">
                  {file?.name && (
                    <p className="truncate">
                      {file.name} ({Math.round(file.size / 1024)} KB)
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Configuration Section */}
        <div className="bg-white dark:bg-sidebar overflow-hidden border ">
          <div className="p-6 border-b border-gray-200 dark:border-gray-800">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              Configuration
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Select model and describe your requirements
            </p>
                    </div>

          <div className="p-6 space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-900 dark:text-gray-100">
                AI Model
              </label>
                    <Select onValueChange={(value) => setModel(value)}>
                <SelectTrigger className="w-full border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800">
                            <SelectValue placeholder="Select AI Model" />
                        </SelectTrigger>
                        <SelectContent>
                            {Constants?.AiModelList.map((model, index) => (
                    <SelectItem value={model.name} key={index}>
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 overflow-hidden bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                          <Image
                            src={model.icon}
                            alt={model.name}
                            width={20}
                            height={20}
                          />
                        </div>
                        <span>{model.name}</span>
                                    </div>
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-900 dark:text-gray-100">
                Description
              </label>
              <Textarea
                placeholder="Describe your webpage requirements in detail..."
                className="min-h-[150px] border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 resize-none"
                onChange={(event) => setDescription(event?.target.value)}
              />
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Provide details about layout, functionality, color scheme, and
                any specific requirements.
              </p>
            </div>
            </div>
        </div>
      </div>

      <div className="mt-8 flex justify-center">
        <Button
          onClick={handleConvertToCode}
          disabled={loading || !file || !model || !description}
          className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium text-sm h-10 hover:from-blue-700 hover:to-purple-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <>
              <Loader2Icon className="h-5 w-5 mr-2 animate-spin" />
              Processing...
            </>
          ) : (
            <>
              <WandSparkles className="h-5 w-5 mr-2" />
              Convert to Code
            </>
          )}
        </Button>
      </div>
    </div>
  );
}

export default ImageUpload;
