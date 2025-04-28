import { useCallback, useEffect, useState } from 'react';
import AuroraTooltip from '../../tooltip/aurora.tooltip';
import { Button, Flex, Popover, Typography } from 'antd';
import { CheckOutlined, FontColorsOutlined } from '@ant-design/icons';
import { useAuroraContext } from '../../aurora.provider';

const { Text } = Typography;

const fontColorPresets = [
    '#14171a',
    '#F43F5E',
    '#F87171',
    '#F59E0B',
    '#EAB308',
    '#FB923C',
    '#64748B',
    '#2563EB',
    '#22D3EE',
    '#60A5FA',
    '#A78BFA',
    '#34D399',
];
const bgColorPresets = ['#FFF7ED', '#FEF9C3', '#ECFCCB', '#CFFAFE', '#EDE9FE', '#FFE4E6'];
const bgColoVisiblePresets = ['#FF6F20', '#F2D400', '#27AE60', '#00BFFF', '#9B4DFF', '#FF4B5C'];

export default function FontColor() {
    const { editor } = useAuroraContext();
    // const debounceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const [open, setOpen] = useState(false);
    const [fontColor, setFontColor] = useState('#14171a');
    const [bgColor, setBgColor] = useState('#ffffff');

    useEffect(() => {
        const handleSelectionUpdate = () => {
            const fontColor = editor?.getAttributes('textStyle')?.color;
            setFontColor(fontColor);
            const bgColor = editor?.getAttributes('highlight')?.color;
            setBgColor(bgColor);
        };
        editor?.on('selectionUpdate', handleSelectionUpdate);
        return () => {
            editor?.off('selectionUpdate', handleSelectionUpdate);
        };
    }, [editor]);

    const handleFontColorChange = useCallback(
        (color: string) => {
            setFontColor(color);
            editor?.chain().focus().setColor(color).run();
        },
        [editor]
    );

    const handleBgColorChange = useCallback(
        (color: string) => {
            setBgColor(color);
            editor?.chain().focus().toggleHighlight({ color: color }).run();
        },
        [editor]
    );

    const renderColorPickers = () => (
        <Flex vertical gap={'small'} style={{ width: 220 }}>
            <Text style={{ fontSize: '0.7rem' }}>글꼴색</Text>
            <Flex gap={'small'} wrap="wrap">
                {Array.from({ length: Math.ceil(fontColorPresets.length / 6) }).map((_, rowIndex) => (
                    <Flex key={rowIndex} gap="small" style={{ width: '100%' }}>
                        {fontColorPresets.slice(rowIndex * 6, rowIndex * 6 + 6).map(color => (
                            <Button
                                key={color}
                                type={'text'}
                                size="small"
                                style={{
                                    backgroundColor: color,
                                    height: 30,
                                    width: 30,
                                }}
                                onClick={() => handleFontColorChange(color)}
                                icon={fontColor === color ? <CheckOutlined style={{ color: '#FFF' }} /> : null}
                            />
                        ))}
                    </Flex>
                ))}
            </Flex>
            <Text style={{ fontSize: '0.7rem' }}>배경색</Text>
            <Flex gap={'small'}>
                {bgColorPresets.map((color, i) => (
                    <Button
                        key={color}
                        type={'text'}
                        size="small"
                        style={{ backgroundColor: bgColoVisiblePresets[i], height: 30, width: 30 }}
                        onClick={() => handleBgColorChange(color)}
                        icon={bgColor === color ? <CheckOutlined style={{ color: '#FFF' }} /> : null}
                    />
                ))}
            </Flex>
        </Flex>
    );

    return (
        <AuroraTooltip title="글자색" placement="bottom">
            <Popover content={renderColorPickers()} trigger="click" open={open} onOpenChange={setOpen}>
                <Button icon={<FontColorsOutlined />} type="text" size="large"></Button>
            </Popover>
        </AuroraTooltip>
    );
}
