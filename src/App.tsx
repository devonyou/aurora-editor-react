import { useRef } from 'react';
import { AuroraTextarea, AuroraToolbar, AuroraEditor, AuroraEditorRef } from '.';
// import { AuroraTextarea, AuroraToolbar, AuroraEditor, AuroraEditorRef } from 'aurora-editor-react';
import { v4 as uuidv4 } from 'uuid';
import { Button } from 'antd';

const imageUrl =
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSaRQfyxh4dq5DxFfLR1q84jfeNftErRrz1nhDWzQxOuUbCo0QKjcmwU8WtSRAWkf_BWeUyB7wwDWnCOiqwKXGkzSO-xNhYwKbXacPKoPdPmA';
const content = '';

export default function App() {
    const editorRef = useRef<AuroraEditorRef>(null);

    const insert = () => {
        const uuid = uuidv4();

        editorRef.current?.insertClip({ clipId: uuid });

        setTimeout(() => {
            editorRef.current?.updateClip({
                clipId: uuid,
                clipUrl: imageUrl,
                clipTime: '00:00:00',
                clipTitle: 'title',
                thumbnailUrl: imageUrl,
                onPlay: () => {
                    // console.log(editorRef.current?.getHTML());
                },
            });
        }, 2000);
    };

    return (
        <>
            <Button onClick={insert}>insert</Button>
            <AuroraEditor
                ref={editorRef}
                content={content}
                config={{
                    placeholder: '명령어 사용시에는 "/"를 입력해주세요.',
                    tooltip: true,
                    bubble: true,
                    color: '#16b75e',
                }}
            >
                {/* <AuroraToolbar /> */}
                <AuroraTextarea />
            </AuroraEditor>
        </>
    );
}
