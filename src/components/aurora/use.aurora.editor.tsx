import { useTiptap } from './use.tiptap';

export interface UseAuroraEditorProps {
    children?: React.ReactNode;
    content: string;
    config?: {
        placeholder?: string;
        tooltip?: boolean;
        bubble?: boolean;
        color?: string;
    };
    onUpdate?: (html: string) => void;
}

export function useAuroraEditorCore(props: UseAuroraEditorProps) {
    const { content, config = {}, onUpdate } = props;
    const { placeholder = '' } = config;

    const tiptap = useTiptap({ content, config: { placeholder }, onUpdate });
    return tiptap;
}
