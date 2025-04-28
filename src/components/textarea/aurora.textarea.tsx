import { useEffect, useState, useRef } from 'react';
import { useAuroraContext } from '../aurora.provider';
import { EditorContent } from '@tiptap/react';
import BubbleContainer from '../bubble/bubble.container';

export default function AuroraTextarea() {
    const { editor, bubble } = useAuroraContext();
    const [isEditable, setIsEditable] = useState(true);
    const editorRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (editor) {
            editor.setEditable(isEditable);
        }
    }, [isEditable, editor]);

    return (
        <div className="aurora-editor-textarea">
            <BubbleContainer editor={editor} bubble={bubble} />
            <EditorContent
                editor={editor}
                spellCheck={false}
                ref={editorRef}
                style={{
                    width: 'inherit',
                    height: 'inherit',
                    minHeight: 'inherit',
                }}
            />
        </div>
    );
}
