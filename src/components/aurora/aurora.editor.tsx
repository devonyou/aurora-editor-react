import { forwardRef, useImperativeHandle } from 'react';
import { ConfigProvider as AntdConfigProvider } from 'antd';
import { antdTheme } from './antd.theme';
import { useAuroraEditorCore, UseAuroraEditorProps } from './use.aurora.editor';
import { AuroraEditorContext } from './aurora.editor.context';
import style from './aurora.editor.module.css';
import { BubbleProvider } from '@/components/bubble';

export interface AuroraEditorRef {
    focus: () => void;
    getHTML: () => string;
    getJSON: () => object;
    setContent: (content: string | object) => void;
    setClear: () => void;
    insertContent: (content: string | object) => void;
}

export const AuroraEditor = forwardRef<AuroraEditorRef, UseAuroraEditorProps>((props, ref) => {
    const { content, config = {}, onUpdate, children } = props;
    const { color = '#60A5FA', bubble = true } = config;
    const editorState = useAuroraEditorCore({ content, config, onUpdate });

    const { editor } = editorState;

    useImperativeHandle(
        ref,
        () => ({
            focus: () => editor?.chain().focus().run(),
            getHTML: () => editor?.getHTML() || '',
            getJSON: () => editor?.getJSON() || {},
            setContent: (content: string | object) => editor?.commands.setContent(content),
            setClear: () => editor?.commands.clearContent(),
            insertContent: (content: string | object) => editor?.chain().focus().insertContent(content).run(),
        }),
        [editor]
    );

    return (
        <AuroraEditorContext.Provider value={editorState}>
            <div className={style.auroraEditorContainer}>
                <AntdConfigProvider theme={antdTheme(color)}>
                    <BubbleProvider>{children}</BubbleProvider>
                </AntdConfigProvider>
            </div>
        </AuroraEditorContext.Provider>
    );
});
