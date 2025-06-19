import { useEffect, useState, useRef } from 'react';
import { useAuroraContext } from '../aurora.provider';
import { EditorContent } from '@tiptap/react';
import { Flex } from 'antd';

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
        <Flex className="aurora-editor-textarea">
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
        </Flex>
    );
}
