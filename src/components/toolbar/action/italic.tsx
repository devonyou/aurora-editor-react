import { useState } from 'react';
import AuroraTooltip from '../../tooltip/aurora.tooltip';
import { Button } from 'antd';
import { ItalicOutlined } from '@ant-design/icons';
import { useAuroraContext } from '../../aurora.provider';

export default function Italic() {
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
        editor.chain().focus().toggleItalic().run();
        handleButtonClick('italic');
    };

    return (
        <AuroraTooltip title="기울임" placement="bottom">
            <Button
                icon={<ItalicOutlined />}
                type={editor?.isActive('italic') ? 'primary' : 'text'}
                onClick={toggle}
                disabled={!editor}
            />
        </AuroraTooltip>
    );
}
