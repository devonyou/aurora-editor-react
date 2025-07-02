import { PlayCircleOutlined } from '@ant-design/icons';
import { Node, NodeViewProps } from '@tiptap/core';
import { ReactNodeViewRenderer } from '@tiptap/react';
import { NodeViewWrapper } from '@tiptap/react';
import { Button, Flex, Spin, Typography } from 'antd';
import { useState } from 'react';
import styled from 'styled-components';

const StyledNodeViewWrapper = styled(NodeViewWrapper)`
    // width: 100%;
    // min-width: 300px;
    max-height: 250px;
    border: 1px solid rgb(240, 240, 240);
    margin: 30px 0;
    aspect-ratio: 16/9;
    border-radius: 0.25rem;
    justify-items: center;
`;

const StyledPlayButton = styled(Button)`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 2;
    width: 50px !important;
    height: 50px !important;
`;

const StyledClipImage = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 0.25rem;
`;

const StyledClipWrapper = styled(Flex)<{ selected: boolean }>`
    width: 100%;
    height: 100%;
    position: relative;
    border-radius: 0.25rem;
    border: ${({ selected }) => (selected ? '3px solid #1890ff' : '1px solid #ddd')};
    transition: border 0.2s ease;
`;

const StyledClipTitleWrapper = styled(Flex)`
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    // background-color: rgba(255, 255, 255, 0.9);
    background-color: rgba(0, 0, 0, 0.9);
    border-bottom-left-radius: 0.25rem;
    border-bottom-right-radius: 0.25rem;
    padding: 5px 10px;
`;

const StyledClipTitle = styled(Typography.Text)`
    font-size: 0.8rem;
    color: #fff;
`;

const ClipRenderer = (props: NodeViewProps) => {
    const { node, selected } = props;
    const { loading, thumbnailUrl, clipTime, onPlay, clipTitle } = node.attrs;
    const [hovered, setHovered] = useState(false);

    return (
        <StyledNodeViewWrapper>
            <Flex justify="center" align="center" style={{ width: '100%', height: '100%' }}>
                {loading ? (
                    <Spin />
                ) : (
                    <StyledClipWrapper
                        onMouseEnter={() => setHovered(true)}
                        onMouseLeave={() => setHovered(false)}
                        selected={selected}
                    >
                        <StyledClipImage src={thumbnailUrl} />
                        <StyledClipTitleWrapper justify="space-between" align="center">
                            <StyledClipTitle>{clipTitle}</StyledClipTitle>
                            <StyledClipTitle>{clipTime}</StyledClipTitle>
                        </StyledClipTitleWrapper>
                        {hovered && (
                            <StyledPlayButton
                                type="primary"
                                shape="circle"
                                icon={<PlayCircleOutlined style={{ fontSize: 20 }} />}
                                onClick={onPlay}
                            />
                        )}
                    </StyledClipWrapper>
                )}
            </Flex>
        </StyledNodeViewWrapper>
    );
};

const Clip = Node.create({
    name: 'clip',
    group: 'block',
    atom: true,
    addAttributes() {
        return {
            clipId: { default: null },
            clipUrl: { default: null },
            clipTime: { default: null },
            clipTitle: { default: null },
            thumbnailUrl: { default: null },
            loading: { default: true },
            onPlay: { default: null },
        };
    },
    parseHTML() {
        return [{ tag: 'div.clip-node' }];
    },
    renderHTML({ HTMLAttributes }) {
        return ['div', { ...HTMLAttributes, class: 'clip-node' }];
    },
    addNodeView() {
        return ReactNodeViewRenderer(ClipRenderer);
    },
});

export { Clip };
