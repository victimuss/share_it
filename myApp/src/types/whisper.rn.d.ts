declare module 'whisper.rn' {
  export interface ContextOptions {
    filePath: string | number;
    isBundleAsset?: boolean;
    useGpu?: boolean;
    useCoreMLIos?: boolean;
    useFlashAttn?: boolean;
    coreMLModelAsset?: {
      filename: string;
      assets: string[] | number[];
    };
  }

  export interface TranscribeOptions {
    language?: string;
    task?: 'transcribe' | 'translate';
    nThreads?: number;
    [key: string]: any;
  }

  export interface TranscribeResult {
    result: string;
    segments: Array<{
      text: string;
      t0: number;
      t1: number;
    }>;
  }

  export class WhisperContext {
    RealtimeTranscriber(arg0: { language: string; }) {
      throw new Error('Method not implemented.');
    }
    id: number;
    transcribe(filePathOrBase64: string | number, options?: TranscribeOptions): {
      stop: () => Promise<void>;
      promise: Promise<TranscribeResult>;
    };
    transcribeRealtime(options?: any): Promise<{
      stop: () => Promise<void>;
      subscribe: (callback: (event: any) => void) => void;
    }>;
    release(): Promise<void>;
  }

  export function initWhisper(options: ContextOptions): Promise<WhisperContext>;
  export function releaseAllWhisper(): Promise<void>;
}
