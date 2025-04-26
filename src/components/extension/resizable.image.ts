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
            width: {
                default: '100%',
            },
            height: {
                default: 'auto',
            },
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
                        width: dom.getAttribute('width') || '100%',
                        height: dom.getAttribute('height') || 'auto',
                    };
                },
            },
        ];
    },

    renderHTML({ HTMLAttributes }) {
        return ['img', mergeAttributes(HTMLAttributes, { class: 'aurora-resizable-image' })];
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
                            const target = event.target as HTMLElement;
                            const relatedTarget = event.relatedTarget as HTMLElement;

                            if (
                                target.classList.contains('aurora-resizable-image') &&
                                !isDragging &&
                                (!relatedTarget || !relatedTarget.classList.contains('aurora-resize-handle'))
                            ) {
                                setTimeout(() => {
                                    if (!isMouseOverHandles()) {
                                        removeHandles();
                                    }
                                }, 100);
                                return false;
                            }
                            return false;
                        },

                        mousedown: (view, event) => {
                            if ((event.target as HTMLElement).classList.contains('aurora-resizable-image')) {
                                return false;
                            }
                            return false;
                        },
                    },
                },
            }),
        ];
    },
});

function isMouseOverHandles(): boolean {
    const handles = document.querySelectorAll('.aurora-resize-handle');
    const mouseEvent = window.event as MouseEvent;
    const x = mouseEvent?.clientX || 0;
    const y = mouseEvent?.clientY || 0;

    for (const handle of Array.from(handles)) {
        const rect = handle.getBoundingClientRect();

        if (x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom) {
            return true;
        }
    }
    return false;
}

function removeHandles() {
    const handles = document.querySelectorAll('.aurora-resize-handle');
    handles.forEach(handle => handle.remove());
}

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

function updateHandlePositions(handles: HTMLElement[], imageElement: HTMLImageElement) {
    const rect = imageElement.getBoundingClientRect();
    const positions = ['nw', 'ne', 'se', 'sw'];

    handles.forEach((handle, index) => {
        updateHandlePosition(handle, positions[index], rect);
    });
}

function updateHandlePosition(handle: HTMLElement, position: string, rect: DOMRect) {
    const scrollX = window.scrollX;
    const scrollY = window.scrollY;

    switch (position) {
        case 'nw':
            handle.style.left = `${rect.left + scrollX - 5}px`;
            handle.style.top = `${rect.top + scrollY - 5}px`;
            break;
        case 'ne':
            handle.style.left = `${rect.right + scrollX - 5}px`;
            handle.style.top = `${rect.top + scrollY - 5}px`;
            break;
        case 'se':
            handle.style.left = `${rect.right + scrollX - 5}px`;
            handle.style.top = `${rect.bottom + scrollY - 5}px`;
            break;
        case 'sw':
            handle.style.left = `${rect.left + scrollX - 5}px`;
            handle.style.top = `${rect.bottom + scrollY - 5}px`;
            break;
    }
}
