import { createContext, useContext, ReactNode } from 'react';
import { useAuroraEditor } from './use.aurora.editor';
import { Editor } from '@tiptap/react';

interface AuroraContextValue {
    editor: Editor | null;
    content: string;
    tooltip: boolean;
    bubble: boolean;
    insertContent: (content: string | object) => void;
    onUploadImage?: (file: File) => Promise<string>;
}

const AuroraContext = createContext<AuroraContextValue | undefined>(undefined);

export function useAuroraContext() {
    const context = useContext(AuroraContext);
    if (context === undefined) {
        throw new Error('useAuroraContext must be used within an AuroraProvider');
    }
    return context;
}

interface AuroraProviderProps {
    children: ReactNode;
    content?: string;
    placeholder?: string;
    activeColor?: string;
    tooltip?: boolean;
    bubble?: boolean;
    onUpdate?: (html: string) => void;
    onUploadImage?: (file: File) => Promise<string>;
}

export function AuroraProvider({
    children,
    content,
    placeholder,
    tooltip,
    bubble,
    onUpdate,
    onUploadImage,
}: AuroraProviderProps) {
    const auroraValue = useAuroraEditor({
        content,
        placeholder,
        tooltip,
        bubble,
        onUpdate,
        onUploadImage,
    });

    return <AuroraContext.Provider value={auroraValue}>{children}</AuroraContext.Provider>;
}
