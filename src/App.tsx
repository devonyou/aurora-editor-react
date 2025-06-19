import { useRef } from 'react';
import { AuroraTextarea, AuroraToolbar, AuroraEditor, AuroraEditorRef } from '.';

export default function App() {
    const editorRef = useRef<AuroraEditorRef>(null);

    return (
        <>
            <AuroraEditor
                ref={editorRef}
                content={''}
                config={{
                    placeholder: '명령어 사용시에는 "/"를 입력해주세요.',
                    tooltip: true,
                    bubble: true,
                    color: '#16b75e',
                }}
            >
                <AuroraToolbar />
                <AuroraTextarea />
            </AuroraEditor>
        </>
    );
}
