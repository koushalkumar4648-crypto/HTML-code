export interface EditorProps {
  code: string;
  onChange: (value: string) => void;
}

export interface PreviewProps {
  code: string;
  refreshTrigger: number;
  onClose: () => void;
  onDownload: () => void;
}

export interface ToolbarProps {
  onDownload: () => void;
  onGenerate: (prompt: string) => Promise<void>;
  isGenerating: boolean;
  onRun: () => void;
  onClear: () => void;
}