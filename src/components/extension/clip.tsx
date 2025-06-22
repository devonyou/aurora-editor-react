import { PlayCircleOutlined } from '@ant-design/icons';
import { Node, NodeViewProps } from '@tiptap/core';
import { ReactNodeViewRenderer } from '@tiptap/react';
import { NodeViewWrapper } from '@tiptap/react';
import { Button, Flex, Spin, Typography } from 'antd';
import { useState } from 'react';

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
        return ReactNodeViewRenderer(ClipView);
    },
});

const ClipView = (props: NodeViewProps) => {
    const { node, selected } = props;
    const { loading, thumbnailUrl, clipTime, onPlay, clipTitle } = node.attrs;
    const [hovered, setHovered] = useState(false);

    return (
        <NodeViewWrapper
            style={{
                width: '50%',
                minWidth: 300,
                border: loading && '1px solid rgb(240, 240, 240)',
                margin: '30px 0',
                aspectRatio: loading ? '16/9' : '16/9 ',
                borderRadius: 10,
            }}
        >
            <Flex justify="center" align="center" style={{ width: '100%', height: '100%' }}>
                {loading ? (
                    <Spin />
                ) : (
                    <Flex
                        onMouseEnter={() => setHovered(true)}
                        onMouseLeave={() => setHovered(false)}
                        style={{
                            width: '100%',
                            height: '100%',
                            position: 'relative',
                            border: selected ? '3px solid #1890ff' : '1px solid #ddd',
                            borderRadius: selected ? 13 : 10,
                        }}
                    >
                        <img
                            src={thumbnailUrl}
                            style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                                borderRadius: 10,
                            }}
                        />
                        <Flex
                            justify="space-between"
                            align="center"
                            style={{
                                position: 'absolute',
                                bottom: 0,
                                left: 0,
                                right: 0,
                                backgroundColor: 'rgba(255, 255, 255, 0.7)',
                                borderBottomLeftRadius: 10,
                                borderBottomRightRadius: 10,
                                padding: '5px 10px',
                            }}
                        >
                            <Typography.Text style={{ fontSize: '0.7rem' }}>{clipTitle}</Typography.Text>
                            <Typography.Text style={{ fontSize: '0.7rem' }}>{clipTime}</Typography.Text>
                        </Flex>
                        {hovered && (
                            <Button
                                type="primary"
                                shape="circle"
                                icon={<PlayCircleOutlined style={{ fontSize: 20 }} />}
                                className="clip-play-button"
                                onClick={onPlay}
                                style={{
                                    position: 'absolute',
                                    top: '50%',
                                    left: '50%',
                                    transform: 'translate(-50%, -50%)',
                                    zIndex: 2,
                                    width: 50,
                                    height: 50,
                                }}
                            />
                        )}
                    </Flex>
                )}
            </Flex>
        </NodeViewWrapper>
    );
};

export { Clip };
