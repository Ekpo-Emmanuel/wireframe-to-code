import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Code, ImageIcon } from 'lucide-react';
import CodeEditor from './CodeEditor';
import WireframeTab from './WireframeTab';
import LoadingState from './LoadingState';
import { RECORD } from '../[uid]/page';

interface TabsContainerProps {
  loading: boolean;
  progress: number;
  progressMessage: string;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  codeResp: string;
  isReady: boolean;
  record: RECORD | null | undefined;
  onRegenerate: () => void;
}

const TabsContainer: React.FC<TabsContainerProps> = ({
  loading,
  progress,
  progressMessage,
  activeTab,
  setActiveTab,
  codeResp,
  isReady,
  record,
  onRegenerate
}) => {
  if (loading) {
    return <LoadingState progress={progress} progressMessage={progressMessage} />;
  }

  return (
    <Tabs defaultValue="code" value={activeTab} onValueChange={setActiveTab} className="w-full">
      <div className="border-b border-gray-200 dark:border-gray-700 px-4">
        <TabsList className="h-10 bg-transparent">
          <TabsTrigger 
            value="code" 
            className="data-[state=active]:border-b-2 data-[state=active]:border-blue-500 data-[state=active]:shadow-none rounded-none px-4 h-10 font-medium"
          >
            <Code className="h-4 w-4 mr-2" />
            Code
          </TabsTrigger>
          <TabsTrigger 
            value="wireframe" 
            className="data-[state=active]:border-b-2 data-[state=active]:border-blue-500 data-[state=active]:shadow-none rounded-none px-4 h-10 font-medium"
          >
            <ImageIcon className="h-4 w-4 mr-2" />
            Wireframe
          </TabsTrigger>
        </TabsList>
      </div>
      
      <TabsContent value="code" className="mt-0 p-0">
        <CodeEditor codeResp={codeResp} isReady={isReady} />
      </TabsContent>
      
      <TabsContent value="wireframe" className="mt-0 p-6">
        <WireframeTab 
          record={record} 
          loading={loading} 
          onRegenerate={onRegenerate} 
          setActiveTab={setActiveTab} 
        />
      </TabsContent>
    </Tabs>
  );
};

export default TabsContainer; 