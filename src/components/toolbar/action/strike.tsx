import { useState } from 'react';
import { AuroraTooltip } from '@/components/tooltip';
import { Button } from 'antd';
import { StrikethroughOutlined } from '@ant-design/icons';
import { useAuroraEditor } from '@/components/aurora';

export default function Strike() {
    const { editor } = useAuroraEditor();
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
                type={editor?.isActive('strike') ? 'link' : 'text'}
                onClick={toggle}
                disabled={!editor}
                size="middle"
            />
        </AuroraTooltip>
    );
}
