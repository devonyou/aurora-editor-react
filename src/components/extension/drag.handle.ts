import GlobalDragHandlePackage from 'tiptap-extension-global-drag-handle';

export const DragHandle = GlobalDragHandlePackage.configure({
    dragHandleWidth: 24,
    scrollTreshold: 100,
    dragHandleSelector: 'aurora-drag-handle',
    excludedTags: [],
    customNodes: [],
});

export default DragHandle;
