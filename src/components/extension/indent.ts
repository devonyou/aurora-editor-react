import { Extension } from '@tiptap/core';
import { TextSelection } from '@tiptap/pm/state';
import { Editor } from '@tiptap/core';

const INDENT_ATTRIBUTE = 'data-indent-level';

const indentSelection = (
    editor: Editor,
    dir: number,
    options: { types: string[]; minIndentLevel: number; maxIndentLevel: number }
) => {
    const { state, dispatch } = editor.view;
    const { selection } = state;
    const { from, to } = selection;

    let changed = false;
    const tr = state.tr;

    state.doc.nodesBetween(from, to, (node, pos) => {
        if (options.types.includes(node.type.name)) {
            const indent = (node.attrs.indent || 0) + dir;

            if (indent >= options.minIndentLevel && indent <= options.maxIndentLevel) {
                tr.setNodeMarkup(pos, undefined, {
                    ...node.attrs,
                    indent,
                });
                changed = true;
            }
        }
    });

    if (changed) {
        dispatch(tr);
        return true;
    }

    return false;
};

const isCursorAtLineStart = (editor: Editor): boolean => {
    const { state } = editor.view;
    const { selection } = state;

    if (!selection.empty) return false;

    const { $cursor } = selection as TextSelection;
    if (!$cursor) return false;

    return $cursor.parentOffset === 0;
};

export const Indent = Extension.create({
    name: 'indent',

    addOptions() {
        return {
            types: ['paragraph', 'heading'],
            maxIndentLevel: 5,
            minIndentLevel: 0,
        };
    },

    addGlobalAttributes() {
        return [
            {
                types: this.options.types,
                attributes: {
                    indent: {
                        default: 0,
                        parseHTML: element => {
                            return parseInt(element.getAttribute(INDENT_ATTRIBUTE) || '0', 10);
                        },
                        renderHTML: attributes => {
                            if (!attributes.indent) {
                                return {};
                            }

                            return {
                                [INDENT_ATTRIBUTE]: attributes.indent,
                                style: `padding-left: ${attributes.indent * 2}em`,
                            };
                        },
                    },
                },
            },
        ];
    },

    addKeyboardShortcuts() {
        return {
            Tab: ({ editor }) => {
                if (isSpecialNode(editor)) {
                    return false;
                }

                const { state, dispatch } = editor.view;
                const { selection } = state;

                // 선택 영역이 있으면 들여쓰기 적용
                if (!selection.empty) {
                    return indentSelection(editor, 1, this.options);
                }

                // 커서가 줄 시작 위치에 있으면 들여쓰기 적용
                if (isCursorAtLineStart(editor)) {
                    return indentSelection(editor, 1, this.options);
                }

                // 그 외 경우에는 공백 4칸 삽입
                dispatch(state.tr.insertText('    '));
                return true;
            },

            'Shift-Tab': ({ editor }) => {
                if (isSpecialNode(editor)) {
                    return false;
                }

                return indentSelection(editor, -1, this.options);
            },

            Backspace: ({ editor }) => {
                if (isSpecialNode(editor) || !isCursorAtLineStart(editor)) {
                    return false;
                }

                const { state } = editor.view;
                const { $from } = state.selection;
                const node = $from.parent;

                if (node.attrs.indent && node.attrs.indent > 0) {
                    return indentSelection(editor, -1, this.options);
                }

                return false;
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
