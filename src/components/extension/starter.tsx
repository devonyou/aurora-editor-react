import { Level } from '@tiptap/extension-heading';
import StarterKit from '@tiptap/starter-kit';

export const Starter = StarterKit.extend({
    addOptions() {
        return {
            ...this.parent?.(),
            heading: { levels: [1, 2, 3] as Level[] },
            orderedList: {
                keepMarks: true,
            },
            bulletList: {
                keepMarks: true,
            },
        };
    },
});
