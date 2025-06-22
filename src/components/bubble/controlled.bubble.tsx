import { Editor, isNodeSelection } from '@tiptap/core';
import { posToDOMRect } from '@tiptap/react';
import Popper from '@mui/material/Popper';

interface ControlledBubbleMenuProps {
    editor: Editor;
    open: boolean;
    children: React.ReactNode;
}

export default function ControlledBubbleMenu({ editor, open, children }: ControlledBubbleMenuProps) {
    if (!editor) return null;

    const selection = editor.state.selection;
    const { $from } = selection;
    const isTextSelected = $from.parent.type.name === 'paragraph';

    return (
        <Popper
            open={open && isTextSelected}
            placement="top"
            modifiers={[
                {
                    name: 'offset',
                    options: {
                        offset: [0, 4],
                    },
                },
                {
                    name: 'flip',
                    enabled: true,
                    options: {
                        boundary: editor.options.element,
                        fallbackPlacements: ['bottom', 'top-start', 'bottom-start', 'top-end', 'bottom-end'],
                        padding: 8,
                    },
                },
            ]}
            anchorEl={() => {
                const { ranges } = selection;
                const from = Math.min(...ranges.map(range => range.$from.pos));
                const to = Math.max(...ranges.map(range => range.$to.pos));

                return {
                    getBoundingClientRect: () => {
                        if (isNodeSelection(selection)) {
                            const node = editor.view.nodeDOM(from) as HTMLElement;
                            if (node) {
                                return node.getBoundingClientRect();
                            }
                        }

                        return posToDOMRect(editor.view, from, to);
                    },
                };
            }}
        >
            {children}
        </Popper>
    );
}
