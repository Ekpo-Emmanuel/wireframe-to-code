import React from 'react';
import { Button } from '@/components/ui/button';
import { Copy, Download, RefreshCw } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { toast } from 'sonner';

interface ActionButtonsProps {
  isReady: boolean;
  loading: boolean;
  codeResp: string;
  record: any;
  onRegenerate: () => void;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({ 
  isReady, 
  loading, 
  codeResp, 
  record, 
  onRegenerate 
}) => {
  const copyCodeToClipboard = () => {
    if (codeResp) {
      navigator.clipboard.writeText(codeResp);
      toast.success("Code copied to clipboard!");
    }
  };

  const downloadCode = () => {
    if (codeResp) {
      const element = document.createElement("a");
      const file = new Blob([codeResp], {type: 'text/javascript'});
      element.href = URL.createObjectURL(file);
      element.download = `wireframe-code-${record?.uid || 'download'}.jsx`;
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
      toast.success("Code downloaded successfully!");
    }
  };

  if (!isReady) return null;

  return (
    <div className="flex items-center gap-2">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={copyCodeToClipboard}
              className="flex items-center gap-1"
            >
              <Copy className="h-4 w-4" />
              <span className="hidden sm:inline">Copy</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>Copy code to clipboard</TooltipContent>
        </Tooltip>
      </TooltipProvider>
      
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={downloadCode}
              className="flex items-center gap-1"
            >
              <Download className="h-4 w-4" />
              <span className="hidden sm:inline">Download</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>Download code as file</TooltipContent>
        </Tooltip>
      </TooltipProvider>
      
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={onRegenerate}
              className="flex items-center gap-1"
              disabled={loading}
            >
              <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
              <span className="hidden sm:inline">Regenerate</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>Regenerate code from wireframe</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};

export default ActionButtons; 