import React, { forwardRef, useImperativeHandle } from 'react';
import { AuroraProvider, useAuroraContext } from './aurora.provider';
import { ConfigProvider as AntdConfigProvider } from 'antd';
import style from './aurora.editor.module.css';
import Bubble from './bubble/bubble';

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
    primaryColor?: string;
    onUpdate?: (html: string) => void;
    onUploadImage?: (file: File) => Promise<string>;
}

export const AuroraEditor = forwardRef<AuroraEditorHandle, AuroraEditorProps>((props, ref) => {
    const { primaryColor = '#60A5FA' } = props;

    return (
        <div
            className={style.auroraEditorContainer}
            style={{ '--aurora-primary-color': primaryColor } as React.CSSProperties}
        >
            <AntdConfigProvider
                theme={{
                    token: {
                        colorPrimary: primaryColor,
                        fontFamily: 'ACCchildrenheartOTF-Regular',
                    },
                    components: {
                        Tooltip: {
                            fontSize: 10,
                        },
                    },
                }}
            >
                {/* <BubbleProvider> */}
                <AuroraProvider
                    content={props.initContent}
                    placeholder={props.placeholder}
                    tooltip={props.tooltip}
                    bubble={props.bubble}
                    onUpdate={props.onUpdate}
                    onUploadImage={props.onUploadImage}
                >
                    <InnerAuroraEditor ref={ref} />
                    <Bubble />
                    {props.children}
                </AuroraProvider>
                {/* </BubbleProvider> */}
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
