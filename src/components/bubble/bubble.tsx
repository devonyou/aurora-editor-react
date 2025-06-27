import { Flex } from 'antd';
import { Align, Bold, FontColor, Italic, Link, Strike, Underline } from '../toolbar/action';
import { Controller } from '../toolbar/action';
import { forwardRef } from 'react';
import { useAuroraEditor } from '@/components/aurora';
import ControlledBubbleMenu from './controlled.bubble';
import styled from 'styled-components';

export type BubbleHandle = {};

interface BubbleProps {}

const StyledBubble = styled(Flex)`
    background-color: #ffffff;
    padding: 5px;
    border-radius: 0.25rem;
    box-shadow: 0 3px 15px rgba(0, 0, 0, 0.1);
    border: 1px solid #f0f0f0;
`;

const Bubble = forwardRef<BubbleHandle, BubbleProps>((props, ref) => {
    const { editor, bubble } = useAuroraEditor();

    if (!editor || !bubble) return null;

    return (
        <ControlledBubbleMenu editor={editor} open={!editor.view.state.selection.empty}>
            <StyledBubble>
                <Controller />
                <Bold />
                <Italic />
                <Underline />
                <Strike />
                <FontColor />
                <Align />
                <Link />
            </StyledBubble>
        </ControlledBubbleMenu>
    );
});

export default Bubble;
