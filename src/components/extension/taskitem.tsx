import { TaskItem as TiptapTaskItem } from '@tiptap/extension-task-item';

export const TaskItem = TiptapTaskItem.extend({
    addOptions() {
        return {
            ...this.parent?.(),
            nested: false,
        };
    },

    addAttributes() {
        return {
            ...this.parent?.(),
            class: { default: 'aurora-task-item' },
        };
    },
});
