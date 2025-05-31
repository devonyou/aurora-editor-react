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
import Dropcursor from '@tiptap/extension-dropcursor';
import { CodeBlock } from './extension/code.block';
import { Indent } from './extension/indent';
import { ResizableImage } from './extension/resizable.image';
import AutoJoiner from 'tiptap-extension-auto-joiner';
import DragHandle from 'tiptap-extension-global-drag-handle';

interface UseAuroraEditorOptions {
    content?: string;
    placeholder?: string;
    tooltip?: boolean;
    bubble?: boolean;
    onUpdate?: (html: string) => void;
    onUploadImage?: (file: File) => Promise<string>;
}

export function useAuroraEditor({
    content = '',
    placeholder = '',
    tooltip = true,
    bubble = false,
    onUpdate,
    onUploadImage,
}: UseAuroraEditorOptions = {}) {
    const [html, setHtml] = useState(content);

    const getExtensions = () => {
        const extensions = [
            StarterKit.configure({
                heading: { levels: [1, 2, 3] },
                codeBlock: false,
                dropcursor: false,
            }),
            Dropcursor.configure({
                color: '#C5D8F7',
                width: 5,
            }),
            Indent,
            TextStyle.configure({ mergeNestedSpanStyles: true }),
            TextAlign.configure({
                types: ['heading', 'paragraph'],
                alignments: ['left', 'center', 'right', 'justify'],
                defaultAlignment: 'left',
            }),
            Color.configure({ types: ['textStyle', 'highlight'] }),
            Highlight.configure({ multicolor: true }),
            Placeholder.configure({ placeholder }),
            TaskList.configure({ HTMLAttributes: { class: 'aurora-task-list' } }),
            TaskItem.configure({ nested: true, HTMLAttributes: { class: 'aurora-task-list-item' } }),
            Link.configure({
                openOnClick: true,
                autolink: true,
                defaultProtocol: 'https',
                protocols: ['http', 'https'],
                isAllowedUri: (url, ctx) => !!url,
                shouldAutoLink: url => !!url,
                HTMLAttributes: { class: 'aurora-link' },
            }),
            CodeBlock.configure({ HTMLAttributes: { class: 'aurora-code-block' } }),
            Youtube.configure({
                controls: false,
                nocookie: true,
                inline: false,
                width: 480,
                height: 270,
                modestBranding: true,
                autoplay: false,
                HTMLAttributes: { class: 'aurora-youtube' },
            }),
            ResizableImage.configure({
                inline: false,
                allowBase64: true,
                HTMLAttributes: { class: 'aurora-resizable-image', width: '480px', height: 'auto' },
            }),
            Underline.configure({ HTMLAttributes: { class: 'aurora-underline' } }),
            AutoJoiner.configure({}),
            DragHandle.configure({
                dragHandleWidth: 27,
                scrollTreshold: 100,
                dragHandleSelector: 'aurora-drag-handle',
                excludedTags: [],
                customNodes: [],
            }),
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

    // 이미지 붙여넣기 처리를 위한 이벤트 핸들러
    useEffect(() => {
        if (editor) {
            const handlePaste = (event: ClipboardEvent) => {
                const items = event.clipboardData?.items;

                if (!items) return;

                for (let i = 0; i < items.length; i++) {
                    const item = items[i];

                    if (item.type.indexOf('image') === 0) {
                        const blob = item.getAsFile();
                        if (blob) {
                            // 이미지를 붙여넣을 때 기본 크기 설정
                            const reader = new FileReader();
                            reader.onload = readerEvent => {
                                editor
                                    .chain()
                                    .focus()
                                    .insertContent({
                                        type: 'resizableImage',
                                        attrs: {
                                            src: readerEvent.target?.result as string,
                                            width: '480px',
                                            height: 'auto',
                                        },
                                    })
                                    .insertContent('<p></p>')
                                    .run();
                            };
                            reader.readAsDataURL(blob);
                            event.preventDefault();
                            break;
                        }
                    }
                }
            };

            // 에디터의 DOM 요소에 붙여넣기 이벤트 리스너 추가
            const editorElement = editor.view.dom;
            editorElement.addEventListener('paste', handlePaste);

            return () => {
                editorElement.removeEventListener('paste', handlePaste);
            };
        }
    }, [editor]);

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

    const result = {
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
        ...(onUploadImage ? { onUploadImage: (file: File) => onUploadImage(file) } : undefined),
    };

    return result;
}
