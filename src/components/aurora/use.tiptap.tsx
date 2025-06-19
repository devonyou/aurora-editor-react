import { useState, useCallback, useEffect } from 'react';
import { useEditor } from '@tiptap/react';
import { getExtensions } from './tiptap.extensions';
import { AuroraEditorContextValue } from './aurora.editor.context';

export interface UseTiptapProps {
    content: string;
    config?: {
        placeholder?: string;
        tooltip?: boolean;
        bubble?: boolean;
    };
    onUpdate?: (html: string) => void;
}

export function useTiptap(props: UseTiptapProps): AuroraEditorContextValue {
    const { content = '', config = {}, onUpdate } = props;
    const { placeholder = '', tooltip = true, bubble = true } = config;

    const [html, setHtml] = useState(content);

    const handleUpdate = useCallback(
        (newHtml: string) => {
            setHtml(newHtml);
            onUpdate?.(newHtml);
        },
        [onUpdate]
    );

    const editor = useEditor({
        extensions: getExtensions(placeholder),
        content,
        autofocus: true,
        editable: true,
        onUpdate: ({ editor }) => {
            handleUpdate(editor.getHTML());
        },
    });

    useEffect(() => {
        return () => {
            editor?.destroy();
        };
    }, [editor]);

    return {
        editor,
        html,
        tooltip,
        bubble,
        setContent: (newContent: string) => {
            setHtml(newContent);
            editor?.commands.setContent(newContent);
        },
        focus: () => editor?.chain().focus().run(),
        getHTML: () => editor?.getHTML() || '',
        getJSON: () => editor?.getJSON() || {},
        setClear: () => {
            setHtml('');
            editor?.commands.clearContent();
        },
        insertContent: (content: string | object) => {
            editor?.chain().focus().insertContent(content).run();
        },
    };
}
