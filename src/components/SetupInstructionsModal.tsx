import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ExternalLink, CheckCircle2 } from "lucide-react";

interface SetupInstructionsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description: string;
  instructions: Array<{
    step: number;
    text: string;
    icon?: React.ReactNode;
  }>;
  tips?: string[];
  primaryButton: {
    text: string;
    url: string;
  };
  folderStructure?: string;
}

export const SetupInstructionsModal = ({
  open,
  onOpenChange,
  title,
  description,
  instructions,
  tips,
  primaryButton,
  folderStructure
}: SetupInstructionsModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-gray-900">
            {title}
          </DialogTitle>
          <DialogDescription className="text-gray-600">
            {description}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Instructions */}
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-900 text-lg">
              📋 Instrucciones paso a paso:
            </h3>
            {instructions.map((instruction) => (
              <div
                key={instruction.step}
                className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg"
              >
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 font-bold">
                  {instruction.step}
                </div>
                <div className="flex-1">
                  <p className="text-gray-700">{instruction.text}</p>
                </div>
                {instruction.icon && (
                  <div className="flex-shrink-0">
                    {instruction.icon}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Folder Structure */}
          {folderStructure && (
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 font-mono text-xs">
              <pre className="text-gray-700 whitespace-pre-wrap">
                {folderStructure}
              </pre>
            </div>
          )}

          {/* Tips */}
          {tips && tips.length > 0 && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-semibold text-blue-900 mb-2">
                💡 Tips importantes:
              </h4>
              <ul className="space-y-2">
                {tips.map((tip, index) => (
                  <li key={index} className="text-sm text-blue-800 flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 flex-shrink-0 mt-0.5" />
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* CTA Button */}
          <Button
            size="lg"
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
            onClick={() => {
              window.open(primaryButton.url, '_blank');
              onOpenChange(false);
            }}
          >
            <ExternalLink className="w-5 h-5 mr-2" />
            {primaryButton.text}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
