import { useState, useCallback, useEffect } from 'react';
import { useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import Placeholder from '@tiptap/extension-placeholder';
import TextAlign from '@tiptap/extension-text-align';
import TaskItem from '@tiptap/extension-task-item';
import TaskList from '@tiptap/extension-task-list';
import Link from '@tiptap/extension-link';
import Youtube from '@tiptap/extension-youtube';
import TextStyle from '@tiptap/extension-text-style';
import Color from '@tiptap/extension-color';
import Highlight from '@tiptap/extension-highlight';
import { CodeBlock } from './extension/code.block';
import { Indent } from './extension/indent';
import { ResizableImage } from './extension/resizable.image';

interface UseAuroraEditorOptions {
    content?: string;
    placeholder?: string;
    tooltip?: boolean;
    bubble?: boolean;
    onUpdate?: (html: string) => void;
}

export function useAuroraEditor({
    content = '',
    placeholder = '',
    tooltip = true,
    bubble = false,
    onUpdate,
}: UseAuroraEditorOptions = {}) {
    const [html, setHtml] = useState(content);

    const getExtensions = () => {
        const extensions = [
            StarterKit.configure({
                heading: { levels: [1, 2, 3] },
                codeBlock: false,
            }),
            Indent,
            TextStyle.configure({ mergeNestedSpanStyles: true }),
            TextAlign.configure({
                types: ['heading', 'paragraph'],
                alignments: ['left', 'center', 'right', 'justify'],
                defaultAlignment: 'left',
            }),
            Color.configure({
                types: ['textStyle', 'highlight'],
            }),
            Highlight.configure({ multicolor: true }),
            Placeholder.configure({ placeholder }),
            TaskList.configure({
                HTMLAttributes: { class: 'aurora-task-list' },
            }),
            TaskItem.configure({
                nested: true,
                HTMLAttributes: { class: 'aurora-task-list-item' },
            }),
            Link.configure({
                openOnClick: true,
                autolink: true,
                defaultProtocol: 'https',
                protocols: ['http', 'https'],
                isAllowedUri: (url, ctx) => !!url,
                shouldAutoLink: url => !!url,
                HTMLAttributes: { class: 'aurora-link' },
            }),
            CodeBlock.configure({
                HTMLAttributes: { class: 'aurora-code-block' },
            }),
            Youtube.configure({
                controls: false,
                nocookie: true,
                HTMLAttributes: { class: 'aurora-youtube' },
            }),
            ResizableImage,
            Underline.configure({
                HTMLAttributes: { class: 'aurora-underline' },
            }),
            // DragHandle.configure({
            //     handleClass: 'aurora-drag-handle',
            // }),
        ];

        return extensions;
    };

    const editor = useEditor({
        extensions: getExtensions(),
        content,
        autofocus: true,
        editable: true,
        onUpdate: ({ editor }) => {
            handleUpdate(editor.getHTML());
        },
    });

    const handleUpdate = useCallback(
        (newHtml: string) => {
            setHtml(newHtml);
            onUpdate?.(newHtml);
        },
        [onUpdate]
    );

    useEffect(() => {
        return () => {
            editor?.destroy();
        };
    }, [editor]);

    return {
        editor,
        content: html,
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
