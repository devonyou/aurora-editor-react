import { Text as TiptapText } from '@tiptap/extension-text';

export const Text = TiptapText.extend({
    addOptions() {
        return {
            ...this.parent?.(),
        };
    },
});
