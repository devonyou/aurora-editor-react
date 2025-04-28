import { Editor, BubbleMenu, isTextSelection } from '@tiptap/react';
import Bubble from './bubble';

interface BubbleContainerProps {
    editor: Editor | null;
    bubble: boolean;
}

export default function BubbleContainer({ editor, bubble }: BubbleContainerProps) {
    return (
        <>
            {bubble && (
                <BubbleMenu
                    editor={editor}
                    tippyOptions={{ duration: 100, placement: 'bottom-start', sticky: true }}
                    shouldShow={({ editor, state, from, to }) => {
                        if (from === to) return false;

                        const { selection } = state;
                        const isText = isTextSelection(selection);
                        return isText;
                    }}
                >
                    <Bubble />
                </BubbleMenu>
            )}
        </>
    );
}
