import { useState } from 'react';
import { Button } from 'antd';
import { BoldOutlined } from '@ant-design/icons';
import { useAuroraContext } from '../../aurora.provider';
import AuroraTooltip from '../../tooltip/aurora.tooltip';

export default function bold() {
    const { editor } = useAuroraContext();
    const [tooltipOpen, setTooltipOpen] = useState<Record<string, boolean>>({});

    const handleButtonClick = (buttonId: string) => {
        setTooltipOpen({
            ...tooltipOpen,
            [buttonId]: false,
        });
    };

    const toggle = () => {
        if (!editor) return;
        editor.chain().focus().toggleBold().run();
        handleButtonClick('bold');
    };

    return (
        <AuroraTooltip title="굵게" placement="bottom">
            <Button
                icon={<BoldOutlined />}
                type={editor?.isActive('bold') ? 'primary' : 'text'}
                onClick={toggle}
                disabled={!editor}
                size="middle"
            />
        </AuroraTooltip>
    );
}
