import { useState } from 'react';
import { AuroraTooltip } from '@/components/tooltip';
import { Button, Input, Modal } from 'antd';
import { YoutubeFilled } from '@ant-design/icons';
import { TextSelection } from 'prosemirror-state';
import { useAuroraEditor } from '@/components/aurora';

export default function Youtube() {
    const { editor } = useAuroraEditor();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [youtubeUrl, setYoutubeUrl] = useState('');

    const handleButtonClick = () => {
        if (!editor) return;
        setYoutubeUrl('');
        setIsModalOpen(true);
    };

    const handleOk = () => {
        if (youtubeUrl) {
            editor
                ?.chain()
                .focus()
                .command(({ tr, dispatch }) => {
                    const { $from } = tr.selection;
                    const currentNode = $from.node();

                    // 현재 노드가 빈 문단이 아니면 (즉, 내용이 있으면) 새 문단 추가
                    if (!(currentNode.type.name === 'paragraph' && currentNode.content.size === 0)) {
                        const paragraph = editor.schema.nodes.paragraph.create();
                        tr.insert($from.end(), paragraph); // 현재 노드 끝 다음 위치에 새 문단 추가
                        tr.setSelection(TextSelection.near(tr.doc.resolve($from.end() + 1))); // 커서 새 문단으로 이동
                    }

                    dispatch?.(tr);
                    return true;
                })
                .insertContent([
                    {
                        type: 'youtube',
                        attrs: {
                            src: youtubeUrl,
                            width: 480,
                            height: 270,
                        },
                    },
                    { type: 'paragraph' }, // 하단 빈 줄
                ])
                .command(({ tr, dispatch }) => {
                    const pos = tr.selection.to;
                    const paragraph = editor.schema.nodes.paragraph.create();
                    tr.insert(pos, paragraph);

                    const selection = TextSelection.near(tr.doc.resolve(pos + 1));
                    tr.setSelection(selection);

                    dispatch?.(tr);
                    return true;
                })
                .run();
        }
        setIsModalOpen(false);
        setYoutubeUrl('');
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        setYoutubeUrl('');
    };

    const handleYoutubeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setYoutubeUrl(e.target.value);
    };

    return (
        <>
            <AuroraTooltip title="유튜브" placement="bottom">
                <Button
                    icon={<YoutubeFilled />}
                    type="text"
                    onClick={handleButtonClick}
                    disabled={!editor}
                    size="middle"
                />
            </AuroraTooltip>
            <Modal
                title="유튜브 링크 입력"
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                okText="확인"
                cancelText="취소"
            >
                <Input
                    placeholder="예: https://www.youtube.com/watch?v=VIDEO_ID"
                    value={youtubeUrl}
                    onChange={handleYoutubeChange}
                    onPressEnter={handleOk}
                    autoFocus
                />
            </Modal>
        </>
    );
}
