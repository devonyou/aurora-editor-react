import { Flex, Space } from 'antd';
import { Align, Bold, FontColor, Italic, Link, Strike, Underline } from '../toolbar/action';
import { useAuroraContext } from '../aurora.provider';
import { Controller } from '../toolbar/action';
import { forwardRef, useImperativeHandle } from 'react';
import { BubbleMenu, Editor, isTextSelection } from '@tiptap/react';

export type BubbleHandle = {
    editor: Editor | null;
};

interface BubbleProps {}

const Bubble = forwardRef<BubbleHandle, BubbleProps>((props, ref) => {
    const { editor, bubble } = useAuroraContext();

    useImperativeHandle(
        ref,
        () => ({
            editor,
        }),
        [editor]
    );

    if (!editor) return null;
    if (!bubble) return null;

    return (
        <BubbleMenu
            editor={editor}
            tippyOptions={{ duration: 100, placement: 'bottom-start', sticky: true }}
            shouldShow={({ editor, state, from, to }) => {
                if (from === to) return false;

                const { selection } = state;
                const isText = isTextSelection(selection);
                return isText;
            }}
        >
            <Flex
                style={{
                    backgroundColor: '#ffffff',
                    padding: '1px',
                    borderRadius: '10px',
                    boxShadow: '0 3px 15px rgba(0, 0, 0, 0.1)',
                    border: '1px solid #f0f0f0',
                }}
            >
                <Space>
                    <Controller />
                    <Bold />
                    <Italic />
                    <Underline />
                    <Strike />
                    <FontColor />
                    <Align />
                    <Link />
                </Space>
            </Flex>
        </BubbleMenu>
    );
});

export default Bubble;
