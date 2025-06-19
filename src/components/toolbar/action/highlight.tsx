import { useState } from 'react';
import { AuroraTooltip } from '@/components/tooltip';
import { ColorPicker } from 'antd';
import { useDebounce } from 'react-use';
import { useAuroraEditor } from '@/components/aurora';
import { Editor } from '@tiptap/react';

const presetColors = [
    '#ffffff',
    '#ffff00',
    '#ffc107',
    '#ff9800',
    '#ff5722',
    '#f44336',
    '#e91e63',
    '#9c27b0',
    '#673ab7',
    '#3f51b5',
    '#2196f3',
    '#03a9f4',
    '#00bcd4',
    '#009688',
    '#4caf50',
    '#8bc34a',
];

export default function Highlight() {
    const { editor } = useAuroraEditor();
    const [tooltipOpen, setTooltipOpen] = useState<Record<string, boolean>>({});
    const [color, setColor] = useState<string>('#ffffff');

    const handleButtonClick = (buttonId: string) => {
        setTooltipOpen(prev => ({
            ...prev,
            [buttonId]: false,
        }));
    };

    useDebounce(
        () => {
            if (!editor) return;
            editor.chain().focus().toggleHighlight({ color: color }).run();
            handleButtonClick('highlight');
        },
        300,
        [color]
    );

    const isSingleLine = (editor: Editor | null): boolean => {
        if (!editor) return false;

        const { from, to } = editor.state.selection;
        const fromPos = editor.state.doc.resolve(from);
        const toPos = editor.state.doc.resolve(to);
        return (
            fromPos.depth === toPos.depth &&
            fromPos.index(0) === toPos.index(0) &&
            fromPos.parent.type.name === toPos.parent.type.name
        );
    };

    // useEffect(() => {
    //     const updateColor = () => {
    //         if (editor) {
    //             const selectedColor = editor.getAttributes('highlight')?.color;
    //             if (selectedColor) setColor(selectedColor);
    //         }
    //     };

    //     editor?.on('selectionUpdate', updateColor);

    //     return () => {
    //         editor?.off('selectionUpdate', updateColor);
    //     };
    // }, [editor]);

    return (
        <AuroraTooltip title="배경색" placement="bottom">
            <ColorPicker
                presets={[{ label: '', colors: presetColors }]}
                showText={false}
                value={color}
                style={{ border: 'none' }}
                onChange={(_, hex) => setColor(hex)}
            />
        </AuroraTooltip>
    );
}
