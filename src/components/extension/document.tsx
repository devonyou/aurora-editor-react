import { Document as TiptapDocument } from '@tiptap/extension-document';

export const Document = TiptapDocument.extend({
    addOptions() {
        return {
            ...this.parent?.(),
            content: 'block+',
        };
    },
    addAttributes() {
        return {
            ...this.parent?.(),
        };
    },
});
