import { useState } from 'react';
import AuroraTooltip from '../../tooltip/aurora.tooltip';
import { Button } from 'antd';
import { LineOutlined } from '@ant-design/icons';
import { useAuroraContext } from '../../aurora.provider';

export default function HorizontalRule() {
    const { editor } = useAuroraContext();
    const [tooltipOpen, setTooltipOpen] = useState<Record<string, boolean>>({});

    const handleButtonClick = (buttonId: string) => {
        setTooltipOpen({
            ...tooltipOpen,
            [buttonId]: false,
        });
    };

    const insertHorizontalRule = () => {
        if (!editor) return;
        editor.chain().focus().setHorizontalRule().run();
        handleButtonClick('horizontalRule');
    };

    return (
        <AuroraTooltip title="구분선" placement="bottom">
            <Button
                icon={<LineOutlined />}
                type="text"
                onClick={insertHorizontalRule}
                disabled={!editor}
                size="large"
            />
        </AuroraTooltip>
    );
}
