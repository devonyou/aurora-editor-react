import { createContext, useContext } from 'react';
import type { Editor } from '@tiptap/react';

export interface AuroraEditorContextValue {
    editor: Editor | null;
    bubble?: boolean;
    tooltip?: boolean;
    html: string;
    setContent: (content: string) => void;
    insertContent: (content: string | object) => void;
    focus: () => void;
    getHTML: () => string;
    getJSON: () => object;
    setClear: () => void;
}

export const AuroraEditorContext = createContext<AuroraEditorContextValue | null>(null);

export function useAuroraEditor() {
    const ctx = useContext(AuroraEditorContext);
    if (!ctx) throw new Error('useAuroraEditor must be used within AuroraEditor');
    return ctx;
}
