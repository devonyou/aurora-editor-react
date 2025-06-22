import { Color as TiptapColor } from '@tiptap/extension-color';

export const Color = TiptapColor.extend({
    addOptions() {
        return {
            ...this.parent?.(),
            // types: ['text', 'paragraph', 'heading', 'textStyle'],
        };
    },
});
