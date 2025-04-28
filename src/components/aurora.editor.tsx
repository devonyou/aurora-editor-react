import React, { forwardRef, useImperativeHandle } from 'react';
import { AuroraProvider, useAuroraContext } from './aurora.provider';
import { ConfigProvider as AntdConfigProvider } from 'antd';
import style from './aurora.editor.module.css';

export interface AuroraEditorHandle {
    focus: () => void;
    getHTML: () => string;
    getJSON: () => object;
    setContent: (content: string | object) => void;
    setClear: () => void;
    insertContent: (content: string | object) => void;
}

interface AuroraEditorProps {
    children?: React.ReactNode;
    initContent?: string;
    placeholder?: string;
    tooltip?: boolean;
    bubble?: boolean;
    onUpdate?: (html: string) => void;
}

export const AuroraEditor = forwardRef<AuroraEditorHandle, AuroraEditorProps>((props, ref) => {
    return (
        <div className={style.auroraEditorContainer}>
            <AntdConfigProvider
                theme={{
                    token: {
                        colorPrimary: '#60A5FA',
                        fontFamily: 'ACCchildrenheartOTF-Regular',
                    },
                    components: {
                        Tooltip: {
                            fontSize: 10,
                        },
                    },
                }}
            >
                <AuroraProvider
                    content={props.initContent}
                    placeholder={props.placeholder}
                    onUpdate={props.onUpdate}
                    tooltip={props.tooltip}
                    bubble={props.bubble}
                >
                    <InnerAuroraEditor ref={ref} />
                    {props.children}
                </AuroraProvider>
            </AntdConfigProvider>
        </div>
    );
});

const InnerAuroraEditor = forwardRef<AuroraEditorHandle, {}>((props, ref) => {
    const auroraContext = useAuroraContext();

    useImperativeHandle(ref, () => ({
        focus: () => auroraContext.editor?.chain().focus().run(),
        getHTML: () => auroraContext.editor?.getHTML() || '',
        getJSON: () => auroraContext.editor?.getJSON() || {},
        setContent: (content: string | object) => {
            auroraContext.editor?.commands.setContent(content);
        },
        setClear: () => {
            auroraContext.editor?.commands.clearContent();
        },
        insertContent: (content: string | object) => {
            auroraContext.editor?.chain().focus().insertContent(content).run();
        },
    }));

    return null;
});
