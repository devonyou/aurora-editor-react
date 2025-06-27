import { HorizontalRule } from '@tiptap/extension-horizontal-rule';

export const Horizon = HorizontalRule.extend({
    addNodeView() {
        return () => {
            const dom = document.createElement('hr');

            let isSelected = false;

            const updateStyles = () => {
                dom.style.border = 'none';
                dom.style.borderTop = isSelected ? '2px solid #1890ff' : '1px solid #e0e0e0';
                dom.style.margin = '2rem 0';
            };

            updateStyles();

            return {
                dom,

                selectNode() {
                    isSelected = true;
                    updateStyles();
                },

                deselectNode() {
                    isSelected = false;
                    updateStyles();
                },

                update(updatedNode) {
                    return updatedNode.type.name === 'horizontalRule';
                },
            };
        };
    },
});
