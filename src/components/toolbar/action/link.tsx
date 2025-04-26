import { useState, useRef, useEffect } from 'react';
import AuroraTooltip from '../../tooltip/aurora.tooltip';
import { Button, Input } from 'antd';
import { LinkOutlined } from '@ant-design/icons';
import { useAuroraContext } from '../../aurora.provider';

export default function Link() {
    const { editor } = useAuroraContext();
    const [tooltipOpen, setTooltipOpen] = useState<Record<string, boolean>>({});
    const [showLinkInput, setShowLinkInput] = useState(false);
    const [linkUrl, setLinkUrl] = useState('');
    const [popupPosition, setPopupPosition] = useState({ top: 0, left: 0 });
    const linkInputRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (linkInputRef.current && !linkInputRef.current.contains(event.target as Node)) {
                setShowLinkInput(false);
            }
        };

        if (showLinkInput) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [showLinkInput]);

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

    const toggleLink = () => {
        if (!editor) return;

        if (editor.isActive('link')) {
            editor.chain().focus().unsetLink().run();
            setShowLinkInput(false);
            return;
        }

        const { from, to, empty } = editor.state.selection;

        if (!empty || from !== to) {
            let selectedText = '';
            try {
                selectedText = editor.state.doc.textBetween(from, to, ' ');
            } catch (e) {
                console.error('텍스트 추출 중 오류:', e);
            }

            setLinkUrl('https://');

            if (selectedText) {
                const urlRegex = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/;
                const isUrl = urlRegex.test(selectedText);

                if (isUrl) {
                    let url = selectedText.trim();
                    if (!url.startsWith('http://') && !url.startsWith('https://')) {
                        url = 'https://' + url;
                    }
                    setLinkUrl(url);
                }
            }

            const position = getSelectionPosition();
            setPopupPosition(position);
            setShowLinkInput(true);
        }

        handleButtonClick('link');
    };

    const handleLinkSubmit = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && linkUrl) {
            editor?.chain().focus().setLink({ href: linkUrl }).run();
            setShowLinkInput(false);
            setLinkUrl('');
        } else if (e.key === 'Escape') {
            setShowLinkInput(false);
            setLinkUrl('');
        }
    };

    const handleLinkChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLinkUrl(e.target.value);
    };

    return (
        <>
            <AuroraTooltip title="링크" placement="bottom">
                <Button
                    icon={<LinkOutlined />}
                    type={editor?.isActive('link') ? 'primary' : 'text'}
                    onClick={toggleLink}
                    disabled={!editor}
                />
            </AuroraTooltip>

            {showLinkInput && (
                <div
                    ref={linkInputRef}
                    style={{
                        position: 'fixed',
                        top: `${popupPosition.top}px`,
                        left: `${popupPosition.left}px`,
                        zIndex: 1000,
                        width: '250px',
                        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
                        borderRadius: '4px',
                        backgroundColor: 'white',
                    }}
                >
                    <Input
                        placeholder="URL 입력"
                        value={linkUrl}
                        onChange={handleLinkChange}
                        onKeyDown={handleLinkSubmit}
                        autoFocus
                    />
                </div>
            )}
        </>
    );
}
