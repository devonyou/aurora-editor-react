import {
    // CheckSquareOutlined,
    CodeOutlined,
    DownOutlined,
    FontSizeOutlined,
    OrderedListOutlined,
    UnorderedListOutlined,
    VerticalLeftOutlined,
} from '@ant-design/icons';
import { Button, Divider, Flex, Popover, Typography } from 'antd';
import React, { useState } from 'react';
import { useAuroraEditor } from '@/components/aurora';
import { Level } from '@tiptap/extension-heading';

const { Text } = Typography;

const ControllerItem = ({ label, icon, onClick }: { label: string; icon: any; onClick: () => void }) => {
    return (
        <Button
            type={'text'}
            size="small"
            icon={React.cloneElement(icon, { style: { color: '#b9b9b9' } })}
            block
            style={{ justifyContent: 'start' }}
            onClick={onClick}
        >
            <Text>{label}</Text>
        </Button>
    );
};

export default function Controller() {
    const { editor } = useAuroraEditor();
    const [open, setOpen] = useState(false);

    const toggleHeading = (level: Level | null) => {
        if (!editor) return;

        if (level) {
            editor.chain().focus().toggleHeading({ level: level }).run();
        } else {
            const currentLevel = editor.getAttributes('heading').level;
            editor.chain().focus().toggleHeading({ level: currentLevel }).run();
        }

        setOpen(false);
    };

    const toggleOrderedList = () => {
        if (!editor) return;
        editor.chain().focus().toggleOrderedList().run();
        setOpen(false);
    };

    const toggleUnOrderedList = () => {
        if (!editor) return;
        editor.chain().focus().toggleBulletList().run();
        setOpen(false);
    };

    const toggleTaskList = () => {
        if (!editor) return;
        editor.chain().focus().toggleTaskList().run();
        setOpen(false);
    };

    const toggleBlockquote = () => {
        if (!editor) return;
        editor.chain().focus().toggleBlockquote().run();
        setOpen(false);
    };

    const toggleCode = () => {
        if (!editor) return;
        editor.chain().focus().toggleCodeBlock().run();
        setOpen(false);
    };

    const renderController = () => {
        return (
            <Flex vertical gap={'small'} justify="start" align="start">
                <ControllerItem icon={<FontSizeOutlined />} label="기본" onClick={() => toggleHeading(null)} />
                <ControllerItem icon={<FontSizeOutlined />} label="제목1" onClick={() => toggleHeading(1)} />
                <ControllerItem icon={<FontSizeOutlined />} label="제목2" onClick={() => toggleHeading(2)} />
                <ControllerItem icon={<FontSizeOutlined />} label="제목3" onClick={() => toggleHeading(3)} />
                <Divider style={{ margin: '0px' }} />
                <ControllerItem icon={<OrderedListOutlined />} label="순서 있는 목록" onClick={toggleOrderedList} />
                <ControllerItem icon={<UnorderedListOutlined />} label="순서 없는 목록" onClick={toggleUnOrderedList} />
                {/* <ControllerItem icon={<CheckSquareOutlined />} label="할일 목록" onClick={toggleTaskList} /> */}
                <Divider style={{ margin: '0px' }} />
                <ControllerItem icon={<VerticalLeftOutlined />} label="인용구" onClick={toggleBlockquote} />
                <ControllerItem icon={<CodeOutlined />} label="코드" onClick={toggleCode} />
            </Flex>
        );
    };

    return (
        <>
            <Popover
                content={renderController()}
                trigger="click"
                open={open}
                onOpenChange={setOpen}
                style={{ padding: 0 }}
            >
                <Button icon={<DownOutlined />} type="text">
                    텍스트
                </Button>
            </Popover>
        </>
    );
}
