import { useState, useRef, useEffect } from 'react';
import AuroraTooltip from '../../tooltip/aurora.tooltip';
import { Button, Input } from 'antd';
import { YoutubeFilled } from '@ant-design/icons';
import { useAuroraContext } from '../../aurora.provider';

export default function Youtube() {
    const { editor } = useAuroraContext();
    const [tooltipOpen, setTooltipOpen] = useState<Record<string, boolean>>({});
    const [showYoutubeInput, setShowYoutubeInput] = useState(false);
    const [youtubeUrl, setYoutubeUrl] = useState('');
    const [popupPosition, setPopupPosition] = useState({ top: 0, left: 0 });
    const youtubeInputRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (youtubeInputRef.current && !youtubeInputRef.current.contains(event.target as Node)) {
                setShowYoutubeInput(false);
            }
        };

        if (showYoutubeInput) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [showYoutubeInput]);

    const handleButtonClick = (buttonId: string) => {
        setTooltipOpen({
            ...tooltipOpen,
            [buttonId]: false,
        });
    };

    const getSelectionPosition = () => {
        if (!editor) return { top: 0, left: 0 };

        const { view } = editor;
        const { from } = view.state.selection;

        const start = view.coordsAtPos(from);

        return {
            top: start.top - 40,
            left: start.left,
        };
    };

    const toggleYoutube = () => {
        if (!editor) return;

        const position = getSelectionPosition();
        setPopupPosition(position);
        setShowYoutubeInput(true);
        setYoutubeUrl('');

        handleButtonClick('youtube');
    };

    const handleYoutubeSubmit = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && youtubeUrl) {
            let youtubeId = youtubeUrl;

            const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
            const match = youtubeUrl.match(youtubeRegex);

            if (match && match[4]) {
                youtubeId = match[4];
            }

            // if (youtubeId && youtubeId.length === 11) {
            //     editor?.commands.setYoutubeVideo({
            //         src: youtubeId,
            //         width: 640,
            //         height: 480,
            //     });
            //     setShowYoutubeInput(false);
            //     setYoutubeUrl('');
            // }

            editor?.commands.setYoutubeVideo({
                src: youtubeUrl,
                width: 480,
                height: 270,
            });
            setShowYoutubeInput(false);
            setYoutubeUrl('');
        } else if (e.key === 'Escape') {
            setShowYoutubeInput(false);
            setYoutubeUrl('');
        }
    };

    const handleYoutubeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setYoutubeUrl(e.target.value);
    };

    return (
        <>
            <AuroraTooltip title="유튜브" placement="bottom">
                <Button icon={<YoutubeFilled />} type="text" onClick={toggleYoutube} disabled={!editor} />
            </AuroraTooltip>

            {showYoutubeInput && (
                <div
                    ref={youtubeInputRef}
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
                        placeholder="예: https://www.youtube.com/watch?v=VIDEO_ID"
                        value={youtubeUrl}
                        onChange={handleYoutubeChange}
                        onKeyDown={handleYoutubeSubmit}
                        autoFocus
                    />
                </div>
            )}
        </>
    );
}
