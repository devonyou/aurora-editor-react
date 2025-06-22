import { TextAlign as TiptapTextAlign } from '@tiptap/extension-text-align';

export const TextAlign = TiptapTextAlign.extend({
    addOptions() {
        return {
            ...this.parent?.(),
            types: ['heading', 'paragraph'],
            alignments: ['left', 'center', 'right', 'justify'],
            defaultAlignment: 'left',
        };
    },
});
