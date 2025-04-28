import { useState } from 'react';
import AuroraTooltip from '../../tooltip/aurora.tooltip';
import { Button } from 'antd';
import { StrikethroughOutlined } from '@ant-design/icons';
import { useAuroraContext } from '../../aurora.provider';

export default function Strike() {
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
        editor.chain().focus().toggleStrike().run();
        handleButtonClick('strike');
    };

    return (
        <AuroraTooltip title="취소선" placement="bottom">
            <Button
                icon={<StrikethroughOutlined />}
                type={editor?.isActive('strike') ? 'primary' : 'text'}
                onClick={toggle}
                disabled={!editor}
                size="middle"
            />
        </AuroraTooltip>
    );
}
