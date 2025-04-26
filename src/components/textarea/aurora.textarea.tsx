import { useEffect, useState } from 'react';
import { useAuroraContext } from '../aurora.provider';
import { EditorContent } from '@tiptap/react';
import BubbleContainer from '../bubble/bubble.container';

export default function AuroraTextarea() {
    const { editor, bubble } = useAuroraContext();
    const [isEditable, setIsEditable] = useState(true);

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
                style={{
                    width: 'inherit',
                    height: 'inherit',
                    minHeight: 'inherit',
                }}
            />
        </div>
    );
}
