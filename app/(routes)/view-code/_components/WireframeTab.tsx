import React from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Code, ImageIcon, RefreshCw } from 'lucide-react';
import { RECORD } from '../[uid]/page';

interface WireframeTabProps {
  record: RECORD | null | undefined;
  loading: boolean;
  onRegenerate: () => void;
  setActiveTab: (tab: string) => void;
}

const WireframeTab: React.FC<WireframeTabProps> = ({ 
  record, 
  loading, 
  onRegenerate,
  setActiveTab
}) => {
  if (!record?.imageUrl) {
    return (
      <div className="text-center p-10">
        <ImageIcon className="h-16 w-16 mx-auto text-gray-300 dark:text-gray-600 mb-4" />
        <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300">
          No wireframe image available
        </h3>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center">
      <div className="relative max-w-3xl w-full h-[50vh] border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800">
        <Image 
          src={record.imageUrl} 
          alt="Wireframe" 
          fill
          className="object-contain p-4"
        />
      </div>
      
      <div className="w-full max-w-3xl mt-6 space-y-4">
        {/* AI Model */}
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
            AI Model
          </h3>
          <div className="flex items-center">
            <div className="flex-shrink-0 mr-3">
              <div className="h-8 w-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                <Code className="h-4 w-4 text-white" />
              </div>
            </div>
            <div>
              <p className="font-medium text-gray-900 dark:text-gray-100">
                {record.model || "Default Model"}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Used for code generation
              </p>
            </div>
          </div>
        </div>
        
        {/* Description */}
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
            Description
          </h3>
          <p className="text-gray-900 dark:text-gray-100 whitespace-pre-wrap">
            {record.description || "No description provided"}
          </p>
        </div>
        
        {/* Regenerate Button */}
        <div className="flex justify-center mt-4">
          <Button 
            onClick={() => {
              onRegenerate();
              setActiveTab("code"); // Switch to code tab after regenerating
            }}
            disabled={loading}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-2"
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
            Regenerate Code
          </Button>
        </div>
      </div>
    </div>
  );
};

export default WireframeTab; 