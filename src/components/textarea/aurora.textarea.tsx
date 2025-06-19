import { useRef } from 'react';
import { EditorContent } from '@tiptap/react';
import { useAuroraEditor } from '@/components/aurora';
import Bubble from '@/components/bubble/bubble';
import { useBubbleContext } from '@/components/bubble';

export default function AuroraTextarea() {
    const { editor } = useAuroraEditor();
    const editorRef = useRef<HTMLDivElement>(null);
    const bubbleRef = useBubbleContext();

    return (
        <div className="aurora-editor-textarea">
            <Bubble ref={bubbleRef} />
            <EditorContent
                ref={editorRef}
                editor={editor}
                spellCheck={false}
                style={{
                    width: 'inherit',
                    height: 'inherit',
                    minHeight: 'inherit',
                }}
            />
        </div>
    );
}
