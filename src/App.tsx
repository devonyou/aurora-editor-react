import { useRef } from 'react';
import { AuroraTextarea, AuroraToolbar, AuroraEditor, AuroraEditorRef } from '.';
// import { AuroraTextarea, AuroraToolbar, AuroraEditor, AuroraEditorRef } from 'aurora-editor-react';
import { v4 as uuidv4 } from 'uuid';
import { Button, Flex } from 'antd';

const imageUrl = 'https://templates.tiptap.dev/placeholder-image.jpg';
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
                clipTitle: 'Placeholder Image',
                thumbnailUrl: imageUrl,
                onPlay: () => {},
            });
        }, 2000);
    };

    return (
        <>
            <Button onClick={insert}>insert</Button>
            <Flex justify="center" align="center">
                <Flex style={{ width: 700, height: 'inherit' }}>
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
                        <AuroraToolbar />
                        <div style={{ backgroundColor: '#b2b2b2', height: 0.5, width: '100%', marginTop: '0.5rem' }} />
                        <AuroraTextarea />
                    </AuroraEditor>
                </Flex>
            </Flex>
        </>
    );
}
