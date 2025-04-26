import { useState } from 'react';
import AuroraTooltip from '../../tooltip/aurora.tooltip';
import { Button, Dropdown, MenuProps, Space } from 'antd';
import { AlignCenterOutlined, AlignLeftOutlined, AlignRightOutlined } from '@ant-design/icons';
import { Typography } from 'antd';
import { useAuroraContext } from '../../aurora.provider';

const { Text } = Typography;

export default function Align() {
    const { editor } = useAuroraContext();
    const [tooltipOpen, setTooltipOpen] = useState<Record<string, boolean>>({});

    const handleButtonClick = (buttonId: string) => {
        setTooltipOpen({
            ...tooltipOpen,
            [buttonId]: false,
        });
    };

    const toggle = (align: string) => {
        if (!editor) return;
        editor.chain().focus().setTextAlign(align).run();
        handleButtonClick('align');
    };

    const getCurrentAlignment = () => {
        if (!editor) return 'left';
        if (editor.isActive({ textAlign: 'center' })) return 'center';
        if (editor.isActive({ textAlign: 'right' })) return 'right';
        return 'left';
    };

    const alignItems: MenuProps['items'] = [
        {
            key: 'left',
            label: <Text strong>왼쪽</Text>,
            onClick: () => toggle('left'),
            className: getCurrentAlignment() === 'left' ? 'active' : '',
        },
        {
            key: 'center',
            label: <Text strong>가운데</Text>,
            onClick: () => toggle('center'),
            className: getCurrentAlignment() === 'center' ? 'active' : '',
        },
        {
            key: 'right',
            label: <Text strong>오른쪽</Text>,
            onClick: () => toggle('right'),
            className: getCurrentAlignment() === 'right' ? 'active' : '',
        },
    ];

    const AlignIcon = () => {
        const alignment = getCurrentAlignment();

        switch (alignment) {
            case 'center':
                return <AlignCenterOutlined />;
            case 'right':
                return <AlignRightOutlined />;
            default:
                return <AlignLeftOutlined />;
        }
    };

    return (
        <AuroraTooltip title="정렬" placement="bottom">
            <Dropdown menu={{ items: alignItems }} trigger={['click']} placement="bottom" disabled={!editor} arrow>
                <Button type={'text'} disabled={!editor}>
                    <Space>
                        <AlignIcon />
                    </Space>
                </Button>
            </Dropdown>
        </AuroraTooltip>
    );
}
