import { useState } from 'react';
import AuroraTooltip from '../../tooltip/aurora.tooltip';
import { Button } from 'antd';
import { UnderlineOutlined } from '@ant-design/icons';
import { useAuroraContext } from '../../aurora.provider';

export default function Underline() {
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
        editor.chain().focus().toggleUnderline().run();
        handleButtonClick('underline');
    };

    return (
        <AuroraTooltip title="밑줄" placement="bottom">
            <Button
                icon={<UnderlineOutlined />}
                type={editor?.isActive('underline') ? 'primary' : 'text'}
                onClick={toggle}
                disabled={!editor}
                size="large"
            />
        </AuroraTooltip>
    );
}
