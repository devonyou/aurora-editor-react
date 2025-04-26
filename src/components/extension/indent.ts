import { Extension } from '@tiptap/core';
import { TextSelection } from '@tiptap/pm/state';

export const Indent = Extension.create({
    name: 'tabIndent',

    addKeyboardShortcuts() {
        return {
            Tab: ({ editor }) => {
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
