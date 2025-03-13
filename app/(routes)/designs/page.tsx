"use client"
import { useAuth } from '@/app/auth-context'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import DesignCard from './_components/DesignCard';
import { RECORD } from '@/app/(routes)/view-code/[uid]/page';
import { Code, Loader2, Paintbrush } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

function Designs() {
    const { user } = useAuth();
    const [wireframeList, setWireframeList] = useState<RECORD[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (user?.email) {
            fetchWireframes();
        }
    }, [user]);

    const fetchWireframes = async () => {
        setIsLoading(true);
        try {
            const result = await axios.get('/api/wireframe-to-code?email=' + user?.email);
            setWireframeList(result.data || []);
        } catch (error) {
            console.error("Error fetching wireframes:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                        Your Designs
                    </h1>
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                        View and manage all your wireframe to code conversions
                    </p>
                </div>
                
                <Link href="/dashboard">
                    <Button className="mt-4 md:mt-0 bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700">
                        <Paintbrush className="mr-2 h-4 w-4" />
                        Create New Design
                    </Button>
                </Link>
            </div>
            
            {/* Content Section */}
            {isLoading ? (
                <div className="flex flex-col items-center justify-center py-20">
                    <Loader2 className="h-10 w-10 text-blue-500 animate-spin mb-4" />
                    <p className="text-gray-500 dark:text-gray-400">Loading your designs...</p>
                </div>
            ) : wireframeList.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {wireframeList.map((item, index) => (
                        <DesignCard key={index} item={item} />
                    ))}
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center py-20 bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700">
                    <div className="w-16 h-16 mb-4  bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center">
                        <Code className="h-8 w-8 text-blue-500 dark:text-blue-400" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">No designs yet</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 text-center max-w-md mb-6">
                        You haven't created any wireframe to code conversions yet. Start by uploading a wireframe image.
                    </p>
                    <Link href="/dashboard">
                        <Button className="bg-gradient-to-r h-10 text-sm from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700">
                            <Paintbrush className="mr-2 h-4 w-4" />
                            Create Your First Design
                        </Button>
                    </Link>
                </div>
            )}
        </div>
    );
}

export default Designs