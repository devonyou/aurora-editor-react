import { Extension } from '@tiptap/core';
import { TextSelection } from '@tiptap/pm/state';
import { Editor } from '@tiptap/core';

export const Indent = Extension.create({
    name: 'tabIndent',

    addKeyboardShortcuts() {
        return {
            Tab: ({ editor }) => {
                if (isSpecialNode(editor)) {
                    return false;
                }

                const { state, dispatch } = editor.view;
                const { from, to } = state.selection;

                const selectedText = state.doc.textBetween(from, to, '\n', '\n');

                const lines = selectedText.split('\n');

                const indented = lines.map(line => '    ' + line).join('\n');

                const tr = state.tr.insertText(indented, from, to);

                dispatch(tr.setSelection(TextSelection.create(tr.doc, from, from + indented.length)));
                return true;
            },

            'Shift-Tab': ({ editor }) => {
                if (isSpecialNode(editor)) {
                    return false;
                }

                const { state, dispatch } = editor.view;
                const { from, to } = state.selection;

                const selectedText = state.doc.textBetween(from, to, '\n', '\n');

                const lines = selectedText.split('\n');

                const outdented = lines.map(line => (line.startsWith('    ') ? line.slice(4) : line)).join('\n');

                const tr = state.tr.insertText(outdented, from, to);

                dispatch(tr.setSelection(TextSelection.create(tr.doc, from, from + outdented.length)));
                return true;
            },
        };
    },
});

const isSpecialNode = (editor: Editor): boolean => {
    // return editor.isActive('bulletList') || editor.isActive('orderedList') || editor.isActive('listItem');

    const { state } = editor.view;
    const { $from } = state.selection;
    for (let d = $from.depth; d > 0; d--) {
        const node = $from.node(d);
        if (
            node.type.name === 'listItem' ||
            node.type.name === 'taskItem' ||
            node.type.name === 'bulletList' ||
            node.type.name === 'orderedList'
            // node.type.name === 'image' ||
            // node.type.name === 'resizableImage' ||
            // node.type.name === 'youtube'
        ) {
            return true;
        }
    }
    return false;
};
