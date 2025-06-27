import { TaskItem as TiptapTaskItem } from '@tiptap/extension-task-item';
import { NodeViewContent, NodeViewWrapper, ReactNodeViewRenderer } from '@tiptap/react';
import { Flex, Checkbox } from 'antd';
import styled from 'styled-components';

const StyledCheckbox = styled(Checkbox)`
    .ant-checkbox-inner {
        width: 20px;
        height: 20px;
    }

    .ant-checkbox-inner::after {
        top: 45%;
        left: 22%;
        width: 5px;
        height: 10px;
    }

    .ant-checkbox {
        width: 20px;
        height: 20px;
    }

    .ant-checkbox + span {
        margin-left: 8px;
        font-size: 16px;
    }
`;

const TaskItemRenderer: React.FC = () => {
    return (
        <NodeViewWrapper>
            <Flex align="center" gap={8}>
                <StyledCheckbox />
                <NodeViewContent as={'li'} />
            </Flex>
        </NodeViewWrapper>
    );
};

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
        };
    },

    addNodeView() {
        return ReactNodeViewRenderer(TaskItemRenderer);
    },
});
