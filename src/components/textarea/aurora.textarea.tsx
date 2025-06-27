import { useRef } from 'react';
import { EditorContent } from '@tiptap/react';
import { useAuroraEditor } from '@/components/aurora';
import Bubble from '@/components/bubble/bubble';
import { useBubbleContext } from '@/components/bubble';
import styled from 'styled-components';

const StyledEditorContent = styled(EditorContent)`
    width: inherit;
    height: inherit;
    min-height: inherit;
`;

export default function AuroraTextarea() {
    const { editor } = useAuroraEditor();
    const editorRef = useRef<HTMLDivElement>(null);
    const bubbleRef = useBubbleContext();

    return (
        <div className="aurora-editor-textarea">
            <Bubble ref={bubbleRef} />

            <StyledEditorContent ref={editorRef} editor={editor} spellCheck={false} />
        </div>
    );
}
