import { useState } from 'react';
import { AuroraTooltip } from '@/components/tooltip';
import { Button } from 'antd';
import { ItalicOutlined } from '@ant-design/icons';
import { useAuroraEditor } from '@/components/aurora';

export default function Italic() {
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
                size="middle"
            />
        </AuroraTooltip>
    );
}
