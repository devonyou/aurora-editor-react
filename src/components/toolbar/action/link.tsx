import { useState, useRef } from 'react';
import { AuroraTooltip } from '@/components/tooltip';
import { Button, Input, InputRef, Modal } from 'antd';
import { LinkOutlined } from '@ant-design/icons';
import { useAuroraEditor } from '@/components/aurora';

export default function Link() {
    const { editor } = useAuroraEditor();
    const linkInputRef = useRef<InputRef>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [linkUrl, setLinkUrl] = useState('');

    const handleButtonClick = () => {
        if (editor?.isActive('link')) {
            editor.chain().focus().unsetLink().run();
            return;
        }

        setLinkUrl('');
        setIsModalOpen(true);
    };

    const handleOk = () => {
        if (linkUrl) {
            let url = linkUrl;
            if (!linkUrl.startsWith('http://') && !linkUrl.startsWith('https://')) {
                url = `https://${linkUrl}`;
            }

            editor?.chain().focus().setLink({ href: url }).run();
        }

        setIsModalOpen(false);
        setLinkUrl('');
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        setLinkUrl('');
    };

    return (
        <>
            <AuroraTooltip title="링크" placement="bottom">
                <Button
                    icon={<LinkOutlined />}
                    type={editor?.isActive('link') ? 'primary' : 'text'}
                    onClick={handleButtonClick}
                    disabled={!editor}
                    size="middle"
                />
            </AuroraTooltip>

            <Modal
                title="링크 입력"
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                okText="확인"
                cancelText="취소"
                afterOpenChange={() => {
                    linkInputRef.current?.focus();
                }}
            >
                <Input
                    ref={linkInputRef}
                    placeholder="링크 입력"
                    value={linkUrl}
                    onChange={e => setLinkUrl(e.target.value)}
                    onPressEnter={handleOk}
                    autoFocus
                />
            </Modal>
        </>
    );
}
