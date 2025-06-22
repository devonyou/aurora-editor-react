import { Dropcursor as TiptapDropcursor } from '@tiptap/extension-dropcursor';

export const Dropcursor = TiptapDropcursor.extend({
    addOptions() {
        return {
            ...this.parent?.(),
            // color: '#C5D8F7',
            width: 3,
        };
    },

    addAttributes() {
        return {
            ...this.parent?.(),
        };
    },
});
