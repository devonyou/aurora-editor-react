import { useState } from 'react';
import AuroraTooltip from '../../tooltip/aurora.tooltip';
import { Button } from 'antd';
import { VerticalLeftOutlined } from '@ant-design/icons';
import { useAuroraContext } from '../../aurora.provider';

export default function Blockquote() {
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
        editor.chain().focus().toggleBlockquote().run();
        handleButtonClick('blockquote');
    };

    return (
        <AuroraTooltip title="인용구" placement="bottom">
            <Button
                icon={<VerticalLeftOutlined />}
                type={editor?.isActive('blockquote') ? 'primary' : 'text'}
                onClick={toggle}
                disabled={!editor}
            />
        </AuroraTooltip>
    );
}
