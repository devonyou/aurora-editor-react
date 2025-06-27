import { Level } from '@tiptap/extension-heading';
import StarterKit from '@tiptap/starter-kit';

export const Starter = StarterKit.extend({
    addOptions() {
        return {
            ...this.parent?.(),
            horizontalRule: false as const,
            paragraph: false as const,
            gapcursor: false as const,
            dropcursor: false as const,
            codeBlock: false as const,
            blockquote: false as const,
            text: false as const,
            document: false as const,
            heading: { levels: [1, 2, 3] as Level[] },
            orderedList: {
                keepMarks: true,
            },
            bulletList: {
                keepMarks: true,
                HTMLAttributes: {
                    style: 'list-style-type: disc;',
                },
            },
        };
    },
});
