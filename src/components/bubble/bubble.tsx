import { Flex, Space } from 'antd';
import { Align, Bold, FontColor, Italic, Link, Strike, Underline } from '../toolbar/action';
import { Controller } from '../toolbar/action';
import { forwardRef, useImperativeHandle, useState } from 'react';
import { useAuroraEditor } from '@/components/aurora';
import ControlledBubbleMenu from './controlled.bubble';

export type BubbleHandle = {};

interface BubbleProps {}

const Bubble = forwardRef<BubbleHandle, BubbleProps>((props, ref) => {
    const { editor, bubble } = useAuroraEditor();

    if (!editor || !bubble) return null;

    return (
        <ControlledBubbleMenu editor={editor} open={!editor.view.state.selection.empty}>
            <Flex
                style={{
                    backgroundColor: '#ffffff',
                    padding: '5px',
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
        </ControlledBubbleMenu>
    );
});

export default Bubble;
