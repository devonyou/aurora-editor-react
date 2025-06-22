import DragHandle from 'tiptap-extension-global-drag-handle';
import AutoJoiner from 'tiptap-extension-auto-joiner';

const DragHandleExtension = DragHandle.configure({
    dragHandleWidth: 27,
    scrollTreshold: 100,
    dragHandleSelector: 'aurora-drag-handle',
    excludedTags: [],
    customNodes: [],
});

const AutoJoinerExtension = AutoJoiner.configure({});

export { DragHandleExtension as DragHandle, AutoJoinerExtension as AutoJoiner };
