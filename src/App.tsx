import { useRef } from 'react';
import { AuroraTextarea, AuroraToolbar, AuroraEditor, AuroraEditorRef } from '.';
// import { AuroraTextarea, AuroraToolbar, AuroraEditor, AuroraEditorRef } from 'aurora-editor-react';
import { Flex } from 'antd';

const content = '';

export default function App() {
    const editorRef = useRef<AuroraEditorRef>(null);

    return (
        <>
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
