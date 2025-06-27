import { forwardRef, useImperativeHandle } from 'react';
import { ConfigProvider as AntdConfigProvider } from 'antd';
import { antdTheme } from './antd.theme';
import { useAuroraEditorCore, UseAuroraEditorProps } from './use.aurora.editor';
import { AuroraEditorContext } from './aurora.editor.context';
import { BubbleProvider } from '@/components/bubble';
import style from './aurora.editor.module.css';

export interface AuroraEditorRef {
    focus: () => void;
    getCharacterCount: () => number;
    getHTML: () => string;
    getJSON: () => object;
    setContent: (content: string | object) => void;
    setClear: () => void;
    insertContent: (content: string | object) => void;
    insertClip: (props: { clipId: string }) => void;
    updateClip: (props: {
        clipId: string;
        clipUrl: string;
        clipTime: string;
        clipTitle: string;
        thumbnailUrl: string;
        onPlay: () => void;
    }) => void;
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
            getCharacterCount: () => editor?.storage.characterCount.characters() || 0,
            getHTML: () => editor?.getHTML() || '',
            getJSON: () => editor?.getJSON() || {},
            setContent: (content: string | object) => editor?.commands.setContent(content),
            setClear: () => editor?.commands.clearContent(),
            insertContent: (content: string | object) => editor?.chain().focus().insertContent(content).run(),
            insertClip: ({ clipId }: { clipId: string }) => {
                const { state, view } = editor!;
                if (!state || !view) return;

                const { doc, tr } = state;

                const endPos = doc.content.size;

                const clipNode = state.schema.nodes.clip.create({
                    clipId,
                    loading: true,
                    thumbnailUrl: null,
                });

                const paragraph = state.schema.nodes.paragraph.create();

                const transaction = tr
                    .insert(endPos, clipNode)
                    .insert(endPos + 1, paragraph)
                    .setSelection(state.selection.constructor.near(tr.doc.resolve(endPos + 2)));

                view.dispatch(transaction);
                view.focus();
            },
            updateClip: (props: {
                clipId: string;
                clipUrl: string;
                clipTime: string;
                clipTitle: string;
                thumbnailUrl: string;
                onPlay: () => void;
            }) => {
                const { state, view } = editor!;
                const { clipId } = props;
                let tr = state.tr;

                state.doc.descendants((node, pos) => {
                    if (node.type.name === 'clip' && node.attrs.clipId === clipId) {
                        tr = tr.setNodeMarkup(pos, undefined, {
                            ...node.attrs,
                            loading: false,
                            ...props,
                        });
                    }
                });

                if (tr.docChanged) {
                    view.dispatch(tr);
                }
            },
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
