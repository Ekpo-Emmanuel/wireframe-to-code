"use client"
import AppHeader from '@/app/_components/AppHeader'
import Constants from '@/data/Constants'
import axios from 'axios'
import { ArrowLeft } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import SelectionDetail from '../_components/SelectionDetail'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import ActionButtons from '../_components/ActionButtons'
import TabsContainer from '../_components/TabsContainer'
import { SidebarProvider } from '@/components/ui/sidebar'

export interface RECORD {
    id: number,
    description: string,
    code: any,
    imageUrl: string,
    model: string,
    createdBy: string,
    uid: string
}

function ViewCodePage() {
    const router = useRouter();
    const { uid } = useParams();
    const [loading, setLoading] = useState(false);
    const [codeResp, setCodeResp] = useState('');
    const [record, setRecord] = useState<RECORD | null>();
    const [isReady, setIsReady] = useState(false);
    const [progress, setProgress] = useState(0);
    const [progressMessage, setProgressMessage] = useState('Initializing...');
    const [activeTab, setActiveTab] = useState("code");

    useEffect(() => {
        if (typeof window !== undefined) {
            uid && GetRecordInfo();
        }
    }, [uid]);

    useEffect(() => {
        let interval: NodeJS.Timeout;
        
        if (loading && progress < 95) {
            interval = setInterval(() => {
                setProgress(prev => {
                    const newProgress = prev + Math.random() * 5;
                    
                    if (newProgress > 80) {
                        setProgressMessage('Finalizing code generation...');
                    } else if (newProgress > 60) {
                        setProgressMessage('Optimizing components...');
                    } else if (newProgress > 40) {
                        setProgressMessage('Generating responsive layout...');
                    } else if (newProgress > 20) {
                        setProgressMessage('Analyzing wireframe elements...');
                    }
                    
                    return Math.min(newProgress, 95);
                });
            }, 800);
        }
        
        return () => clearInterval(interval);
    }, [loading, progress]);

    const GetRecordInfo = async (regen = false) => {
        setIsReady(false);
        setCodeResp('');
        setLoading(true);
        setProgress(0);
        setProgressMessage('Initializing...');

        try {
            const result = await axios.get('/api/wireframe-to-code?uid=' + uid);
            const resp = result?.data;
            setRecord(resp);

            if (resp?.code == null || regen) {
                GenerateCode(resp);
            } else {
                setCodeResp(resp?.code?.resp);
                setLoading(false);
                setIsReady(true);
                setProgress(100);
            }
        } catch (error) {
            console.error("Error fetching record:", error);
            toast.error("Failed to load design. Please try again.");
            setLoading(false);
        }
    }

    const GenerateCode = async (record: RECORD) => {
        setLoading(true);
        try {
            const res = await fetch('/api/ai-model', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    description: record?.description + ":" + Constants.PROMPT,
                    model: record.model,
                    imageUrl: record?.imageUrl
                })
            });

            if (!res.body) {
                toast.error("Failed to generate code. Please try again.");
                setLoading(false);
                return;
            }

            const reader = res.body.getReader();
            const decoder = new TextDecoder();
            setLoading(false);
            
            while (true) {
                const { done, value } = await reader.read();
                if (done) break;

                const text = (decoder.decode(value))
                    .replace('```jsx', '')
                    .replace('```javascript', '')
                    .replace('javascript', '')
                    .replace('jsx', '')
                    .replace('```', '');
                
                setCodeResp((prev) => prev + text);
            }

            setProgress(100);
            setIsReady(true);
            UpdateCodeToDb();
            toast.success("Code generated successfully!");
        } catch (error) {
            console.error("Error generating code:", error);
            toast.error("Failed to generate code. Please try again.");
            setLoading(false);
        }
    }

    useEffect(() => {
        if (codeResp !== '' && record?.uid && isReady && record?.code == null) {
            UpdateCodeToDb();
        }
    }, [codeResp, record, isReady]);

    const UpdateCodeToDb = async () => {
        try {
            await axios.put('/api/wireframe-to-code', {
                uid: record?.uid,
                codeResp: { resp: codeResp }
            });
        } catch (error) {
            console.error("Error updating code in database:", error);
        }
    }

    const handleRegenerate = () => {
        GetRecordInfo(true);
    };

    return (
        <SidebarProvider>
            <div className="flex flex-col w-full min-h-screen bg-gray-50 dark:bg-gray-900">
                <AppHeader hideSidebar={true} />
                
                {/* Back button and actions */}
                <div className="container mx-auto px-4 py-4 flex items-center justify-between">
                    <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => router.back()}
                        className="flex items-center gap-1 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Back to Designs
                    </Button>
                    
                    <ActionButtons 
                        isReady={isReady} 
                        loading={loading} 
                        codeResp={codeResp} 
                        record={record} 
                        onRegenerate={handleRegenerate} 
                    />
                </div>
                
                {/* Main content */}
                <div className="container mx-auto px-4 pb-10 flex-grow">
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                        {/* Left sidebar */}
                        <div className="lg:col-span-1">
                            <div className="sticky top-20">
                                <SelectionDetail 
                                    record={record} 
                                    regenrateCode={handleRegenerate}
                                    isReady={isReady} 
                                />
                            </div>
                        </div>
                        
                        {/* Main content area with tabs */}
                        <div className="lg:col-span-3">
                            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden border border-gray-200 dark:border-gray-700">
                                <TabsContainer 
                                    loading={loading}
                                    progress={progress}
                                    progressMessage={progressMessage}
                                    activeTab={activeTab}
                                    setActiveTab={setActiveTab}
                                    codeResp={codeResp}
                                    isReady={isReady}
                                    record={record}
                                    onRegenerate={handleRegenerate}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </SidebarProvider>
    )
}

export default ViewCodePage; 