import { EditorState } from '@tiptap/pm/state';
import { EditorView } from '@tiptap/pm/view';
import { Editor, BubbleMenu } from '@tiptap/react';
import Bubble from './bubble';

interface BubbleContainerProps {
    editor: Editor | null;
    bubble: boolean;
}

export default function BubbleContainer({ editor, bubble }: BubbleContainerProps) {
    const shouldShowBubble = ({
        editor,
        view,
        state,
        from,
        to,
    }: {
        editor: Editor;
        view: EditorView;
        state: EditorState;
        from: number;
        to: number;
    }) => {
        if (from === to) return false;

        const isImage = editor.isActive('resizableImage') || editor.isActive('image');
        const isCodeBlock = editor.isActive('codeBlock');
        const isYoutube = editor.isActive('youtube');
        const isHr = editor.isActive('horizontalRule');

        return !isImage && !isCodeBlock && !isYoutube && !isHr;
    };

    return (
        <>
            {bubble && (
                <BubbleMenu
                    editor={editor}
                    tippyOptions={{ duration: 100, placement: 'bottom' }}
                    shouldShow={shouldShowBubble}
                >
                    <Bubble />
                </BubbleMenu>
            )}
        </>
    );
}
