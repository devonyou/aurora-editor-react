import { Extension } from '@tiptap/core';

export const Indent = Extension.create({
    name: 'tabIndent',

    addKeyboardShortcuts() {
        return {
            Tab: () => {
                const { state, dispatch } = this.editor.view;
                const { $from } = state.selection;

                for (let d = $from.depth; d > 0; d--) {
                    if ($from.node(d).type.name === 'listItem') {
                        return false;
                    }
                }

                dispatch(state.tr.insertText('    '));
                return true;
            },

            'Shift-Tab': () => {
                const { state, dispatch } = this.editor.view;
                const { from } = state.selection;
                const $start = state.doc.resolve(from);

                for (let d = $start.depth; d > 0; d--) {
                    if ($start.node(d).type.name === 'listItem') {
                        return false;
                    }
                }

                const before = state.doc.textBetween(from - 4, from, '\0', '\0');
                if (before === '    ') {
                    dispatch(state.tr.delete(from - 4, from));
                }

                return true;
            },
        };
    },
});
