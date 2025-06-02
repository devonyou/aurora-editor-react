import { Node, mergeAttributes } from '@tiptap/core';
import { Plugin, PluginKey } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';

export const ResizableImage = Node.create({
    name: 'resizableImage',
    group: 'block',
    inline: false,
    draggable: true,
    selectable: true,

    addAttributes() {
        return {
            src: {
                default: null,
            },
            alt: {
                default: null,
            },
            width: { default: '480px' },
            height: { default: 'auto' },
        };
    },

    parseHTML() {
        return [
            {
                tag: 'img[src]',
                getAttrs: dom => {
                    if (!(dom instanceof HTMLElement)) {
                        return {};
                    }

                    return {
                        src: dom.getAttribute('src'),
                        alt: dom.getAttribute('alt'),
                        width: '480px',
                        height: 'auto',
                    };
                },
            },
        ];
    },

    renderHTML({ HTMLAttributes }) {
        return [
            'div',
            {
                class: 'aurora-image-wrapper',
                contenteditable: 'false',
                style: 'position: relative; display: inline-block;',
            },
            [
                'img',
                mergeAttributes(HTMLAttributes, {
                    class: 'aurora-resizable-image',
                    style: `width: ${HTMLAttributes.width}; height: ${HTMLAttributes.height};`,
                }),
            ],
            [
                'button',
                {
                    class: 'delete-icon',
                    'aria-label': '삭제',
                    contenteditable: false,
                    tabindex: '-1',
                    type: 'button',
                    style: `
                        position: absolute;
                        top: 4px;
                        right: 4px;
                        background-color: #1890ff;
                        color: white;
                        border: none;
                        border-radius: 4px;
                        padding: 2px 8px;
                        font-size: 12px;
                        font-weight: 600;
                        cursor: pointer;
                        pointer-events: none;
                        transition: opacity 0.2s ease;
                        user-select: none;
                        box-shadow: 0 2px 4px rgba(0,0,0,0.15);
                        opacity: 0;
                    `,
                },
                '삭제',
            ],
        ];
    },

    addProseMirrorPlugins() {
        let activeHandles: HTMLElement[] = [];
        let isDragging = false;
        let resizingImage: HTMLImageElement | null = null;

        const findImageForHandle = (handle: HTMLElement): HTMLImageElement | null => {
            const handlePosition = Array.from(handle.classList)
                .find(cls => cls.startsWith('aurora-resize-handle-'))
                ?.replace('aurora-resize-handle-', '');

            if (!handlePosition) return null;

            const images = document.querySelectorAll('.aurora-resizable-image');
            for (const img of Array.from(images)) {
                const imgRect = img.getBoundingClientRect();
                const handleRect = handle.getBoundingClientRect();

                if (
                    (handlePosition === 'nw' &&
                        Math.abs(imgRect.left - handleRect.left - 5) < 10 &&
                        Math.abs(imgRect.top - handleRect.top - 5) < 10) ||
                    (handlePosition === 'ne' &&
                        Math.abs(imgRect.right - handleRect.left - 5) < 10 &&
                        Math.abs(imgRect.top - handleRect.top - 5) < 10) ||
                    (handlePosition === 'se' &&
                        Math.abs(imgRect.right - handleRect.left - 5) < 10 &&
                        Math.abs(imgRect.bottom - handleRect.top - 5) < 10) ||
                    (handlePosition === 'sw' &&
                        Math.abs(imgRect.left - handleRect.left - 5) < 10 &&
                        Math.abs(imgRect.bottom - handleRect.top - 5) < 10)
                ) {
                    return img as HTMLImageElement;
                }
            }
            return null;
        };

        const setupGlobalHandlers = (view: EditorView) => {
            const handleGlobalMouseDown = (e: MouseEvent) => {
                const target = e.target as HTMLElement;

                if (target.classList.contains('aurora-resize-handle')) {
                    e.preventDefault();

                    resizingImage = findImageForHandle(target);
                    if (!resizingImage) return;

                    const handleType =
                        Array.from(target.classList)
                            .find(cls => cls.startsWith('aurora-resize-handle-'))
                            ?.replace('aurora-resize-handle-', '') || '';

                    const startWidth = resizingImage.offsetWidth;
                    const startHeight = resizingImage.offsetHeight;
                    const startX = e.pageX;
                    const startY = e.pageY;

                    isDragging = true;

                    const onMouseMove = (e: MouseEvent) => {
                        if (!resizingImage) return;

                        const deltaX = e.pageX - startX;
                        const deltaY = e.pageY - startY;

                        const aspectRatio = startWidth / startHeight;
                        let newWidth = startWidth;

                        const MIN_SIZE = 50;

                        if (handleType === 'se') {
                            newWidth = Math.max(MIN_SIZE, startWidth + deltaX);
                        } else if (handleType === 'sw') {
                            newWidth = Math.max(MIN_SIZE, startWidth - deltaX);
                        } else if (handleType === 'ne') {
                            newWidth = Math.max(MIN_SIZE, startWidth + deltaX);
                        } else if (handleType === 'nw') {
                            newWidth = Math.max(MIN_SIZE, startWidth - deltaX);
                        }

                        const newHeight = newWidth / aspectRatio;

                        resizingImage.style.width = `${newWidth}px`;
                        resizingImage.style.height = `${newHeight}px`;

                        updateHandlePositions(activeHandles, resizingImage);
                    };

                    const onMouseUp = () => {
                        if (!resizingImage) return;

                        isDragging = false;
                        document.removeEventListener('mousemove', onMouseMove);
                        document.removeEventListener('mouseup', onMouseUp);

                        const pos = view.posAtDOM(resizingImage, 0);

                        if (pos !== undefined) {
                            const { state, dispatch } = view;
                            dispatch(
                                state.tr.setNodeMarkup(pos, undefined, {
                                    src: resizingImage.getAttribute('src'),
                                    alt: resizingImage.getAttribute('alt'),
                                    width: resizingImage.style.width,
                                    height: resizingImage.style.height,
                                })
                            );
                        }

                        resizingImage = null;
                    };

                    document.addEventListener('mousemove', onMouseMove);
                    document.addEventListener('mouseup', onMouseUp);
                }
            };

            document.addEventListener('mousedown', handleGlobalMouseDown);

            return () => {
                document.removeEventListener('mousedown', handleGlobalMouseDown);
            };
        };

        const removeHandles = () => {
            activeHandles.forEach(handle => {
                handle.remove();
            });
            activeHandles = [];
        };

        return [
            new Plugin({
                key: new PluginKey('resizableImage'),
                view: view => {
                    const cleanup = setupGlobalHandlers(view);

                    return {
                        destroy() {
                            cleanup();
                            removeHandles();
                        },
                    };
                },
                props: {
                    handleDOMEvents: {
                        mouseover: (view, event) => {
                            const target = event.target as HTMLElement;

                            if (target.classList.contains('aurora-resizable-image') && !isDragging) {
                                removeHandles();
                                const imageElement = target as HTMLImageElement;
                                activeHandles = createResizeHandles(imageElement);
                                document.body.append(...activeHandles);
                                return false;
                            }
                            return false;
                        },
                        mouseout: (view, event) => {
                            const relatedTarget = event.relatedTarget as HTMLElement;
                            if (
                                !relatedTarget ||
                                (!relatedTarget.classList.contains('aurora-resizable-image') &&
                                    !relatedTarget.classList.contains('aurora-resize-handle'))
                            ) {
                                if (!isDragging) {
                                    removeHandles();
                                }
                            }
                            return false;
                        },
                        click: (view, event) => {
                            const target = event.target as HTMLElement;

                            if (target.classList.contains('delete-icon')) {
                                event.preventDefault();
                                event.stopPropagation();

                                // 이미지 wrapper div
                                const wrapper = target.closest('.aurora-image-wrapper');
                                if (!wrapper) return false;

                                // 이미지 DOM 요소
                                const img = wrapper.querySelector('img.aurora-resizable-image');
                                if (!img) return false;

                                // 이미지가 위치한 프로스미러 문서 위치 찾기
                                const pos = view.posAtDOM(img, 0);
                                if (pos === null) return false;

                                const tr = view.state.tr;
                                // 노드 삭제 (pos 위치의 노드 1개 삭제)
                                tr.delete(pos, pos + 1);

                                view.dispatch(tr);
                                return true;
                            }
                            return false;
                        },
                    },

                    // 이미지 삭제 막기
                    handleKeyDown: (view, event) => {
                        const { state } = view;
                        const { selection } = state;
                        const { $from, empty } = selection;

                        // 커서가 이미지 앞/뒤에 있고 Backspace/Delete 막기
                        if (
                            empty &&
                            (event.key === 'Backspace' || event.key === 'Delete') &&
                            (state.doc.nodeAt(selection.$from.pos - 1)?.type.name === 'resizableImage' ||
                                state.doc.nodeAt(selection.$from.pos)?.type.name === 'resizableImage')
                        ) {
                            event.preventDefault();
                            return true;
                        }

                        // 선택 영역 내 이미지 있으면 Backspace, Delete, Enter 막기
                        if (!empty) {
                            const fromPos = selection.from;
                            const toPos = selection.to;

                            let hasImageNode = false;
                            state.doc.nodesBetween(fromPos, toPos, node => {
                                if (node.type.name === 'resizableImage') {
                                    hasImageNode = true;
                                    return false;
                                }
                            });

                            if (
                                hasImageNode &&
                                (event.key === 'Backspace' || event.key === 'Delete' || event.key === 'Enter')
                            ) {
                                event.preventDefault();
                                return true;
                            }
                        }

                        return false;
                    },
                },
            }),
        ];
    },
});

function createResizeHandles(imageElement: HTMLImageElement): HTMLElement[] {
    const positions = ['nw', 'ne', 'se', 'sw'];
    const rect = imageElement.getBoundingClientRect();

    return positions.map(position => {
        const handle = document.createElement('div');
        handle.className = `aurora-resize-handle aurora-resize-handle-${position}`;

        handle.style.cssText = `
			position: absolute;
			width: 10px;
			height: 10px;
			background-color: #1677ff;
			border-radius: 50%;
			z-index: 1000;
			cursor: ${position}-resize;
			pointer-events: all;
		`;

        updateHandlePosition(handle, position, rect);

        return handle;
    });
}

function updateHandlePosition(handle: HTMLElement, position: string, rect: DOMRect) {
    if (position === 'nw') {
        handle.style.left = `${rect.left - 5 + window.scrollX}px`;
        handle.style.top = `${rect.top - 5 + window.scrollY}px`;
    } else if (position === 'ne') {
        handle.style.left = `${rect.right - 5 + window.scrollX}px`;
        handle.style.top = `${rect.top - 5 + window.scrollY}px`;
    } else if (position === 'se') {
        handle.style.left = `${rect.right - 5 + window.scrollX}px`;
        handle.style.top = `${rect.bottom - 5 + window.scrollY}px`;
    } else if (position === 'sw') {
        handle.style.left = `${rect.left - 5 + window.scrollX}px`;
        handle.style.top = `${rect.bottom - 5 + window.scrollY}px`;
    }
}

function updateHandlePositions(handles: HTMLElement[], imageElement: HTMLImageElement) {
    const rect = imageElement.getBoundingClientRect();
    const positions = ['nw', 'ne', 'se', 'sw'];

    handles.forEach((handle, index) => {
        updateHandlePosition(handle, positions[index], rect);
    });
}
