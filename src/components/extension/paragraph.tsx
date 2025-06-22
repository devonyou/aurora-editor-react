import { Paragraph as TiptapParagraph } from '@tiptap/extension-paragraph';

export const Paragraph = TiptapParagraph.extend({
    addOptions() {
        return {
            ...this.parent?.(),
            HTMLAttributes: {
                class: 'aurora-paragraph',
            },
        };
    },
});
