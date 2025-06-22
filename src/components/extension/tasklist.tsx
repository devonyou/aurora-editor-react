import { TaskList as TiptapTaskList } from '@tiptap/extension-task-list';

export const TaskList = TiptapTaskList.extend({
    addOptions() {
        return {
            ...this.parent?.(),
        };
    },

    addAttributes() {
        return {
            ...this.parent?.(),
            class: { default: 'aurora-task-list' },
        };
    },
});
