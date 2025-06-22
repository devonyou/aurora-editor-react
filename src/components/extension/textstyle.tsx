import { TextStyle as TiptapTextStyle } from '@tiptap/extension-text-style';

export const TextStyle = TiptapTextStyle.extend({
    addOptions() {
        return {
            ...this.parent?.(),
            mergeNestedSpanStyles: true,
        };
    },
});
