import { useTiptap } from './use.tiptap';

export interface UseAuroraEditorProps {
    children?: React.ReactNode;
    content: string;
    config?: {
        placeholder?: string;
        tooltip?: boolean;
        bubble?: boolean;
        color?: string;
        limit?: number;
    };
    onUpdate?: (html: string) => void;
}

export function useAuroraEditorCore(props: UseAuroraEditorProps) {
    const { content, config = {}, onUpdate } = props;

    const tiptap = useTiptap({ content, config, onUpdate });
    return tiptap;
}
