import { Highlight as TiptapHighlight } from '@tiptap/extension-highlight';

export const Highlight = TiptapHighlight.extend({
    addOptions() {
        return {
            ...this.parent?.(),
            multicolor: true,
        };
    },
});
