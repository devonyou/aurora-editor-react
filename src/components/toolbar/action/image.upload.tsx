// import { useRef } from 'react';
// import { AuroraTooltip } from '@/components/tooltip';
// import { Button } from 'antd';
// import { PictureOutlined } from '@ant-design/icons';
// import { useAuroraEditor } from '@/components/aurora';
// import { TextSelection } from 'prosemirror-state';

// /**
//  * 이미지를 서버에 업로드하고, 업로드된 이미지의 URL을 반환합니다.
//  * @param file 업로드할 이미지 파일
//  * @returns 업로드된 이미지의 URL
//  */
// async function uploadImageToServer(file: File): Promise<string> {
//     const formData = new FormData();
//     formData.append('file', file);

//     // 실제 업로드 API 엔드포인트로 변경하세요.
//     const response = await fetch('/api/upload', {
//         method: 'POST',
//         body: formData,
//     });

//     if (!response.ok) {
//         throw new Error('이미지 업로드 실패');
//     }

//     // 서버에서 { image_url: string } 형태로 반환한다고 가정
//     const data = await response.json();
//     return data.image_url;
// }

// export default function ImageUpload() {
//     const { editor, onUploadImage } = useAuroraEditor();
//     const fileInputRef = useRef<HTMLInputElement>(null);

//     // 파일 업로드 버튼 클릭 시 input[type=file] 트리거
//     const handleUploadButtonClick = () => {
//         if (fileInputRef.current) {
//             fileInputRef.current.value = '';
//             fileInputRef.current.click();
//         }
//     };

//     // 파일 선택 시 이미지 삽입
//     const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
//         const file = e.target.files?.[0];
//         if (!file) return;

//         // 이미지 파일 타입 검증
//         const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
//         if (!allowedTypes.includes(file.type)) {
//             throw new Error('지원하지 않는 이미지 형식입니다. JPG, PNG, GIF, WEBP 형식만 업로드 가능합니다.');
//         }

//         try {
//             const imageUrl = await onUploadImage?.(file);
//             if (imageUrl) insertImage(imageUrl);
//         } catch (err) {
//             //
//         }
//     };

//     const insertImage = (imageUrl: string) => {
//         editor
//             ?.chain()
//             .focus()
//             .command(({ tr, dispatch }) => {
//                 const { $from } = tr.selection;
//                 const currentNode = $from.node();

//                 // 현재 노드가 빈 문단이 아니면 (즉, 내용이 있으면) 새 문단 추가
//                 if (!(currentNode.type.name === 'paragraph' && currentNode.content.size === 0)) {
//                     const paragraph = editor.schema.nodes.paragraph.create();
//                     tr.insert($from.end(), paragraph); // 현재 노드 끝 다음 위치에 새 문단 추가
//                     tr.setSelection(TextSelection.near(tr.doc.resolve($from.end() + 1))); // 커서 새 문단으로 이동
//                 }

//                 dispatch?.(tr);
//                 return true;
//             })
//             .insertContent([
//                 {
//                     type: 'resizableImage',
//                     attrs: {
//                         src: imageUrl,
//                         width: 'auto',
//                         height: '250px',
//                     },
//                 },
//                 { type: 'paragraph' },
//             ])
//             .command(({ tr, dispatch }) => {
//                 const pos = tr.selection.to;
//                 const paragraph = editor.schema.nodes.paragraph.create();
//                 tr.insert(pos, paragraph);

//                 const selection = TextSelection.near(tr.doc.resolve(pos + 1));
//                 tr.setSelection(selection);

//                 dispatch?.(tr);
//                 return true;
//             })
//             .run();
//     };

//     return (
//         <>
//             <AuroraTooltip title="이미지 업로드" placement="bottom">
//                 <Button
//                     icon={<PictureOutlined />}
//                     type="text"
//                     onClick={handleUploadButtonClick}
//                     disabled={!editor}
//                     size="middle"
//                 />
//             </AuroraTooltip>
//             <input
//                 ref={fileInputRef}
//                 type="file"
//                 accept="image/*"
//                 style={{ display: 'none' }}
//                 onChange={handleFileChange}
//             />
//         </>
//     );
// }
