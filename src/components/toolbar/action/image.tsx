import { useState, useRef, useEffect } from 'react';
import AuroraTooltip from '../../tooltip/aurora.tooltip';
import { Button, Input } from 'antd';
import { PictureOutlined } from '@ant-design/icons';
import { useAuroraContext } from '../../aurora.provider';

export default function Image() {
    const { editor } = useAuroraContext();
    const [tooltipOpen, setTooltipOpen] = useState<Record<string, boolean>>({});
    const [showImageInput, setShowImageInput] = useState(false);
    const [imageUrl, setImageUrl] = useState('');
    const [popupPosition, setPopupPosition] = useState({ top: 0, left: 0 });
    const imageInputRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (imageInputRef.current && !imageInputRef.current.contains(event.target as Node)) {
                setShowImageInput(false);
            }
        };

        if (showImageInput) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [showImageInput]);

    const handleButtonClick = (buttonId: string) => {
        setTooltipOpen({
            ...tooltipOpen,
            [buttonId]: false,
        });
    };

    const getSelectionPosition = () => {
        if (!editor) return { top: 0, left: 0 };

        const { view } = editor;
        const { from, to } = view.state.selection;

        const start = view.coordsAtPos(from);
        const end = view.coordsAtPos(to);

        return {
            top: end.bottom + window.scrollY,
            left: (start.left + end.left) / 2,
        };
    };

    const toggleImage = () => {
        if (!editor) return;

        const position = getSelectionPosition();
        setPopupPosition(position);
        setShowImageInput(true);
        setImageUrl('');

        handleButtonClick('image');
    };

    const handleImageSubmit = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && imageUrl) {
            editor
                ?.chain()
                .focus()
                .insertContent({
                    type: 'resizableImage',
                    attrs: {
                        src: imageUrl,
                        width: '480px',
                        height: 'auto',
                    },
                })
                .run();

            setShowImageInput(false);
            setImageUrl('');
        } else if (e.key === 'Escape') {
            setShowImageInput(false);
            setImageUrl('');
        }
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setImageUrl(e.target.value);
    };

    return (
        <>
            <AuroraTooltip title="이미지" placement="bottom">
                <Button icon={<PictureOutlined />} type="text" onClick={toggleImage} disabled={!editor} size="middle" />
            </AuroraTooltip>

            {showImageInput && (
                <div
                    ref={imageInputRef}
                    style={{
                        position: 'fixed',
                        top: `${popupPosition.top}px`,
                        left: `${popupPosition.left}px`,
                        zIndex: 1000,
                        width: '350px',
                        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
                        borderRadius: '4px',
                        backgroundColor: 'white',
                    }}
                >
                    <Input
                        placeholder="이미지 URL 입력"
                        value={imageUrl}
                        onChange={handleImageChange}
                        onKeyDown={handleImageSubmit}
                        autoFocus
                    />
                </div>
            )}
        </>
    );
}
