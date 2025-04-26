import { useCallback, useEffect, useRef, useState } from 'react';
import AuroraTooltip from '../../tooltip/aurora.tooltip';
import { Button, ColorPicker, Flex, Popover, Typography } from 'antd';
import { FontColorsOutlined } from '@ant-design/icons';
import { useAuroraContext } from '../../aurora.provider';
import { AggregationColor } from 'antd/es/color-picker/color';

const { Text } = Typography;

const presetColors = [
    '#000000',
    '#bfbfbf',
    '#ffffff',
    '#f5222d',
    '#1677ff',
    '#52c41a',
    '#faad14',
    '#13c2c2',
    '#722ed1',
    '#eb2f96',
];

export default function FontColor() {
    const { editor } = useAuroraContext();
    // const debounceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const [open, setOpen] = useState(false);
    const [fontColor, setFontColor] = useState('#000000');
    const [bgColor, setBgColor] = useState('#ffffff');

    // useEffect(() => {
    //     return () => {
    //         if (debounceTimerRef.current) {
    //             clearTimeout(debounceTimerRef.current);
    //         }
    //     };
    // }, []);

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

    // useDebounce(
    //     () => {
    //         if (!editor) return;
    //         editor.chain().focus().toggleHighlight({ color: bgColor }).run();
    //     },
    //     300,
    //     [bgColor]
    // );

    // const handleFontColorChange =
    // useCallback();
    // (color: AggregationColor) => {
    //     if (debounceTimerRef.current) {
    //         clearTimeout(debounceTimerRef.current);
    //     }

    //     debounceTimerRef.current = setTimeout(() => {
    //         const colorHex = color.toHexString();
    //         setFontColor(colorHex);
    //         editor?.chain().focus().setColor(colorHex).run();
    //         debounceTimerRef.current = null;
    //     }, 100);
    // },
    // [editor]

    const handleFontColorChange = useCallback(
        (color: AggregationColor) => {
            const colorHex = color.toHexString();
            setFontColor(colorHex);
            editor?.chain().focus().setColor(colorHex).run();
        },
        [editor]
    );

    const handleBgColorChange = useCallback(
        (color: AggregationColor) => {
            const colorHex = color.toHexString();
            setBgColor(colorHex);
            editor?.chain().focus().toggleHighlight({ color: colorHex }).run();
        },
        [editor]
    );

    const renderColorPickers = () => (
        <Flex vertical gap={'small'}>
            <Text style={{ fontSize: '0.7rem' }}>글꼴색</Text>
            <ColorPicker
                value={fontColor}
                onChange={handleFontColorChange}
                presets={[{ label: '글꼴색', colors: presetColors }]}
                panelRender={(_, { components: { Presets } }) => <Presets />}
            />
            <Text style={{ fontSize: '0.7rem' }}>배경색</Text>
            <ColorPicker
                value={bgColor}
                onChange={handleBgColorChange}
                presets={[{ label: '배경색', colors: presetColors }]}
                panelRender={(_, { components: { Presets } }) => <Presets />}
            />
        </Flex>
    );

    return (
        <AuroraTooltip title="글자색" placement="bottom">
            <Popover content={renderColorPickers()} trigger="click" open={open} onOpenChange={setOpen}>
                {/* <Button icon={<FontColorsOutlined style={{ color: fontColor }} />} type="text"></Button> */}
                <Button icon={<FontColorsOutlined />} type="text"></Button>
            </Popover>
        </AuroraTooltip>
    );
}
