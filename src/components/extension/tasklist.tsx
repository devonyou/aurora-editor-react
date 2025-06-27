import { TaskList as TiptapTaskList } from '@tiptap/extension-task-list';
import { NodeViewContent, NodeViewWrapper, ReactNodeViewRenderer } from '@tiptap/react';

const TaskListRenderer: React.FC = () => {
    return (
        <NodeViewWrapper>
            <NodeViewContent as={'ul'} />
        </NodeViewWrapper>
    );
};

export const TaskList = TiptapTaskList.extend({
    addOptions() {
        return {
            ...this.parent?.(),
        };
    },

    addAttributes() {
        return {
            ...this.parent?.(),
        };
    },

    addNodeView() {
        return ReactNodeViewRenderer(TaskListRenderer);
    },
});
