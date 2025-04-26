import { Extension } from '@tiptap/core';
import { Plugin, PluginKey } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';
import { NodeSelection } from 'prosemirror-state';

export const DragHandle = Extension.create({
    name: 'dragHandle',

    addProseMirrorPlugins() {
        let dragHandle: HTMLElement | null = null;
        let activeNode: HTMLElement | null = null;

        const createDragHandle = () => {
            const handle = document.createElement('div');
            handle.className = 'aurora-drag-handle';
            handle.draggable = true;
            handle.innerHTML = '⋮';

            handle.style.cssText = `
                position: absolute;
                width: 24px;
                height: 24px;
                background: white;
                border-radius: 3px;
                display: flex;
                align-items: center;
                justify-content: center;
                opacity: 0;
                transition: opacity 0.2s;
                cursor: grab;
                box-shadow: 0 1px 3px rgba(0,0,0,0.1);
                z-index: 100;
                font-size: 16px;
                color: #999;
                user-select: none;
            `;

            return handle;
        };

        return [
            new Plugin({
                key: new PluginKey('dragHandle'),
                view: (editorView: EditorView) => {
                    dragHandle = createDragHandle();
                    document.body.appendChild(dragHandle);

                    const handleMouseMove = (event: MouseEvent) => {
                        if (!dragHandle) return;

                        const target = event.target as HTMLElement;
                        const block = target.closest('p, h1, h2, h3, ul, ol, li') as HTMLElement;

                        if (block && block.closest('.ProseMirror')) {
                            activeNode = block;
                            const rect = block.getBoundingClientRect();
                            dragHandle.style.left = `${rect.left + window.scrollX - 24}px`;
                            dragHandle.style.top = `${rect.top + window.scrollY}px`;
                            dragHandle.style.opacity = '1';
                        } else {
                            dragHandle.style.opacity = '0';
                            activeNode = null;
                        }
                    };

                    const handleDragStart = (event: DragEvent) => {
                        if (!event.dataTransfer || !activeNode) return;

                        const pos = editorView.posAtDOM(activeNode, 0);
                        if (pos === undefined) return;

                        const tr = editorView.state.tr;
                        tr.setSelection(NodeSelection.create(editorView.state.doc, pos));
                        editorView.dispatch(tr);

                        const { state } = editorView;
                        const slice = state.selection.content();

                        const serializedSlice = JSON.stringify({
                            from: state.selection.from,
                            to: state.selection.to,
                            slice: slice.toJSON(),
                        });

                        event.dataTransfer.setData('application/prosemirror-slice', serializedSlice);
                        event.dataTransfer.effectAllowed = 'move';
                    };

                    const handleDragOver = (event: DragEvent) => {
                        if (!event.dataTransfer) return;

                        const hasProseSlice = event.dataTransfer.types.includes('application/prosemirror-slice');

                        if (hasProseSlice) {
                            event.preventDefault();
                            event.dataTransfer.dropEffect = 'move';

                            (dragHandle as HTMLElement).style.opacity = '0';
                            activeNode = null;
                        }
                    };

                    const handleDrop = (event: DragEvent) => {
                        if (!event.dataTransfer) return;
                        event.preventDefault();

                        const serializedData = event.dataTransfer.getData('application/prosemirror-slice');
                        if (!serializedData) return;

                        try {
                            const { from, to, slice: sliceJSON } = JSON.parse(serializedData);

                            const coords = {
                                left: event.clientX,
                                top: event.clientY,
                            };
                            const dropPos = editorView.posAtCoords(coords);
                            if (!dropPos) return;

                            const tr = editorView.state.tr;

                            if (dropPos.pos < from) {
                                tr.delete(from, to).insert(dropPos.pos, editorView.state.doc.slice(from, to).content);
                            } else {
                                tr.insert(dropPos.pos, editorView.state.doc.slice(from, to).content).delete(from, to);
                            }

                            editorView.dispatch(tr);
                        } catch (err) {
                            console.error(err);
                        }
                    };

                    dragHandle.addEventListener('dragstart', handleDragStart);
                    editorView.dom.addEventListener('mousemove', handleMouseMove);
                    editorView.dom.addEventListener('dragover', handleDragOver);
                    editorView.dom.addEventListener('drop', handleDrop);

                    return {
                        destroy: () => {
                            dragHandle?.remove();
                            editorView.dom.removeEventListener('mousemove', handleMouseMove);
                            editorView.dom.removeEventListener('dragover', handleDragOver);
                            editorView.dom.removeEventListener('drop', handleDrop);
                        },
                    };
                },
            }),
        ];
    },
});
