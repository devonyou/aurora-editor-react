import { DropcursorOptions, Dropcursor as TiptapDropcursor } from '@tiptap/extension-dropcursor';

export const Dropcursor = TiptapDropcursor.extend({
    addOptions(): DropcursorOptions {
        return {
            ...this.parent?.(),
            color: '#111111',
            width: 2,
        };
    },
});
