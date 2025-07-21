export interface ChatMessage {
  role: "user" | "model";
  parts: Array<{
    text?: string;
    inlineData?: {
      mimeType: string;
      data: string;
    };
  }>;
}

export interface GeminiResponse {
  candidates: Array<{
    content: {
      parts: Array<{
        text: string;
      }>;
    };
  }>;
}

export interface ChatBubbleProps {
  message: string;
  sender: 'user' | 'ai';
  imageUrl?: string;
  isLoading?: boolean;
  isActionBubble?: boolean;
  actionButtonId?: string;
  actionButtonText?: string;
  actionData?: any;
  isCodeBubble?: boolean;
  codeContent?: string;
  codeLang?: string;
  onImageClick?: (src: string) => void;
  onActionClick?: (data: any) => void;
}

export interface LogoProps {
  text: string;
  className?: string;
  id?: string;
}

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  className?: string;
}

export interface CodingCanvasProps {
  isOpen: boolean;
  onClose: () => void;
}

export interface VoiceInputProps {
  onTranscript: (text: string) => void;
  disabled?: boolean;
}

export interface ExportChatProps {
  chatHistory: ChatMessage[];
  disabled?: boolean;
}

export interface ClearChatProps {
  onClear: () => void;
  disabled?: boolean;
}

export interface SettingsProps {
  isOpen: boolean;
  onClose: () => void;
  theme: string;
  onThemeChange: (theme: string) => void;
} 