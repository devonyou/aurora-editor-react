import { useRef } from 'react';
import { AuroraToolbar, AuroraTextarea, AuroraEditor, AuroraEditorHandle } from './components';

export default function App() {
    const editorRef = useRef<AuroraEditorHandle>(null);

    return (
        <>
            <AuroraEditor
                ref={editorRef}
                initContent={''}
                placeholder="명령어 사용시에는 '/'를 입력해주세요."
                tooltip={true}
                bubble={true}
                primaryColor={'#16b75e'}
            >
                <AuroraToolbar />
                <AuroraTextarea />
            </AuroraEditor>
        </>
    );
}
