import { RECORD } from '@/app/(routes)/view-code/[uid]/page'
import { Button } from '@/components/ui/button'
import Constants from '@/data/Constants'
import { Calendar, Code } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

interface DesignCardProps {
  item: RECORD;
}

function DesignCard({ item }: DesignCardProps) {
    const modelObj = item && Constants.AiModelList.find((x => x.name == item?.model));
    
    return (
        <div className="group overflow-hidden border border-gray-200 bg-white transition-all hover:shadow-md dark:border-gray-800 dark:bg-gray-900">
            {/* Image Section */}
            <div className="relative aspect-video overflow-hidden bg-gray-100 dark:bg-gray-800">
                <Image 
                    src={item?.imageUrl || '/placeholder.png'} 
                    alt={item?.description?.substring(0, 20) || 'Wireframe image'}
                    width={600} 
                    height={400}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                
                {/* Model Badge */}
                {modelObj && (
                    <div className="absolute left-3 top-3 flex items-center gap-1.5 rounded-full bg-white/90 px-2.5 pl-1 py-1 text-xs font-medium shadow-sm backdrop-blur-sm dark:bg-gray-800/90">
                        <div className="h-5 w-5 overflow-hidden rounded-full">
                            <Image 
                                src={modelObj?.icon} 
                                alt={modelObj?.name || ''} 
                                width={20} 
                                height={20}
                                className="h-full w-full"
                            />
                        </div>
                        <span className="text-gray-700 dark:text-gray-300">{modelObj.name}</span>
                    </div>
                )}
                
                {/* ID Badge */}
                <div className="absolute bottom-3 left-3 flex items-center gap-1.5 rounded-full bg-white/90 px-2.5 py-1 text-xs font-medium shadow-sm backdrop-blur-sm dark:bg-gray-800/90">
                    <Calendar className="h-3.5 w-3.5 text-gray-500 dark:text-gray-400" />
                    <span className="text-gray-700 dark:text-gray-300">ID: {item?.id || 'N/A'}</span>
                </div>
            </div>
            
            {/* Content Section */}
            <div className="p-4">
                {/* Description */}
                <div className="mb-4">
                    <h3 className="line-clamp-1 text-sm font-medium text-gray-900 dark:text-gray-100">
                        {item?.description?.substring(0, 60) || 'No description'}
                    </h3>
                    <p className="mt-1 line-clamp-2 text-xs text-gray-500 dark:text-gray-400">
                        {item?.description || 'No additional details available for this design.'}
                    </p>
                </div>
                
                {/* Action Button */}
                <Link href={'/view-code/' + item?.uid} className="w-full">
                    <Button 
                        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700"
                        size="sm"
                    >
                        <Code className="mr-2 h-4 w-4" />
                        View Generated Code
                    </Button>
                </Link>
            </div>
        </div>
    )
}

export default DesignCard