import { useRef } from 'react';
import AuroraTooltip from '../../tooltip/aurora.tooltip';
import { Button } from 'antd';
import { PictureOutlined } from '@ant-design/icons';
import { useAuroraContext } from '../../aurora.provider';

/**
 * 이미지를 서버에 업로드하고, 업로드된 이미지의 URL을 반환합니다.
 * @param file 업로드할 이미지 파일
 * @returns 업로드된 이미지의 URL
 */
async function uploadImageToServer(file: File): Promise<string> {
    const formData = new FormData();
    formData.append('file', file);

    // 실제 업로드 API 엔드포인트로 변경하세요.
    const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
    });

    if (!response.ok) {
        throw new Error('이미지 업로드 실패');
    }

    // 서버에서 { image_url: string } 형태로 반환한다고 가정
    const data = await response.json();
    return data.image_url;
}

export default function ImageUpload() {
    const { editor, onUploadImage } = useAuroraContext();
    const fileInputRef = useRef<HTMLInputElement>(null);

    // 파일 업로드 버튼 클릭 시 input[type=file] 트리거
    const handleUploadButtonClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
            fileInputRef.current.click();
        }
    };

    // 파일 선택 시 이미지 삽입
    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        try {
            const imageUrl = await onUploadImage?.(file);
            if (imageUrl) {
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
            }
        } catch (err) {
            // 에러 핸들링 (예: 알림 표시)
            // message.error('이미지 업로드에 실패했습니다.');
        }
    };

    return (
        <>
            <AuroraTooltip title="이미지 업로드" placement="bottom">
                <Button
                    icon={<PictureOutlined />}
                    type="text"
                    onClick={handleUploadButtonClick}
                    disabled={!editor}
                    size="middle"
                />
            </AuroraTooltip>
            <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                style={{ display: 'none' }}
                onChange={handleFileChange}
            />
        </>
    );
}
