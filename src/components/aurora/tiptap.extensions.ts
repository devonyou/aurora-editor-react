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
import AutoJoiner from 'tiptap-extension-auto-joiner';
import DragHandle from 'tiptap-extension-global-drag-handle';
import { Indent } from '../extension/indent';
import { CodeBlock } from '../extension/code.block';

export const getExtensions = (placeholder: string) => {
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
