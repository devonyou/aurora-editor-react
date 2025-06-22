import { Underline as TiptapUnderline } from '@tiptap/extension-underline';

export const Underline = TiptapUnderline.extend({
    addOptions() {
        return {
            ...this.parent?.(),
            HTMLAttributes: {
                class: 'aurora-underline',
            },
        };
    },
});
