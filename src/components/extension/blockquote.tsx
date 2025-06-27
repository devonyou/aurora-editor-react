import { Blockquote as TiptapBlockquote } from '@tiptap/extension-blockquote';

export const Blockquote = TiptapBlockquote.extend({
    addOptions() {
        return {
            ...this.parent?.(),
            HTMLAttributes: {
                style: 'border-left: 2px solid #e0e0e0; padding-left: 1rem;line-height: 0.8;',
            },
        };
    },
    addAttributes() {
        return {
            ...this.parent?.(),
        };
    },
});
