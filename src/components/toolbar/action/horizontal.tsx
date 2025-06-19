import { useState } from 'react';
import { AuroraTooltip } from '@/components/tooltip';
import { Button } from 'antd';
import { LineOutlined } from '@ant-design/icons';
import { useAuroraEditor } from '@/components/aurora';

export default function HorizontalRule() {
    const { editor } = useAuroraEditor();
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
                size="middle"
            />
        </AuroraTooltip>
    );
}
