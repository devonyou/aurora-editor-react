import { useState } from 'react';
import AuroraTooltip from '../../tooltip/aurora.tooltip';
import { Button, Dropdown, MenuProps, Space } from 'antd';
import { FontSizeOutlined } from '@ant-design/icons';
import { Typography } from 'antd';
import { Level } from '@tiptap/extension-heading';
import { useAuroraContext } from '../../aurora.provider';

const { Text } = Typography;

export default function Head() {
    const { editor } = useAuroraContext();
    const [tooltipOpen, setTooltipOpen] = useState<Record<string, boolean>>({});

    const handleButtonClick = (buttonId: string) => {
        setTooltipOpen({
            ...tooltipOpen,
            [buttonId]: false,
        });
    };

    const toggle = (level: Level | null) => {
        if (!editor) return;

        if (level) {
            editor.chain().focus().toggleHeading({ level: level }).run();
        } else {
            const currentLevel = editor.getAttributes('heading').level;
            editor.chain().focus().toggleHeading({ level: currentLevel }).run();
        }
        handleButtonClick('heading');
    };

    const getLevel = () => editor?.getAttributes('heading').level;

    const headingItems: MenuProps['items'] = [
        { key: 'h1', label: <Text strong>H1</Text>, onClick: () => toggle(1) },
        { key: 'h2', label: <Text strong>H2</Text>, onClick: () => toggle(2) },
        { key: 'h3', label: <Text strong>H3</Text>, onClick: () => toggle(3) },
        {
            key: 'null',
            label: <Text strong>기본</Text>,
            onClick: () => toggle(null),
        },
    ];

    return (
        <AuroraTooltip title="제목" placement="bottom">
            <Dropdown menu={{ items: headingItems }} trigger={['click']} placement="bottom" disabled={!editor} arrow>
                <Button type={editor?.isActive('heading') ? 'primary' : 'text'} disabled={!editor}>
                    <Space>
                        <FontSizeOutlined />
                    </Space>
                </Button>
            </Dropdown>
        </AuroraTooltip>
    );
}
