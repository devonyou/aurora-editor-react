import YoutubeExtension from '@tiptap/extension-youtube';
import { TextSelection } from 'prosemirror-state';

export default YoutubeExtension.extend({
    name: 'youtube',

    addAttributes() {
        return {
            ...this.parent?.(),
            ...this.options,
        };
    },

    addCommands() {
        return {
            setYoutubeVideo:
                (options: { src: string; width?: number; height?: number }) =>
                ({ chain, editor }) => {
                    return chain()
                        .command(({ tr, dispatch }) => {
                            const { $from } = tr.selection;
                            const currentNode = $from.node();

                            if (!(currentNode.type.name === 'paragraph' && currentNode.content.size === 0)) {
                                const paragraph = editor.schema.nodes.paragraph.create();
                                tr.insert($from.end(), paragraph);
                                tr.setSelection(TextSelection.near(tr.doc.resolve($from.end() + 1)));
                            }

                            dispatch?.(tr);
                            return true;
                        })
                        .insertContent([
                            {
                                type: this.name,
                                attrs: {
                                    src: options.src,
                                    width: options.width || 480,
                                    height: options.height || 270,
                                },
                            },
                            { type: 'paragraph' },
                        ])
                        .command(({ tr, dispatch }) => {
                            const pos = tr.selection.to;
                            const paragraph = editor.schema.nodes.paragraph.create();
                            tr.insert(pos, paragraph);

                            const selection = TextSelection.near(tr.doc.resolve(pos + 1));
                            tr.setSelection(selection);

                            dispatch?.(tr);
                            return true;
                        })
                        .run();
                },
        };
    },

    addKeyboardShortcuts() {
        return {
            Backspace: ({ editor }) => {
                const { state } = editor;
                const { $from } = state.selection;

                const node = $from.nodeAfter;
                if (node?.type.name === this.name) {
                    // 유튜브 노드일 경우 삭제 막음
                    return true;
                }

                return false;
            },
            Delete: ({ editor }) => {
                const { state } = editor;
                const { $from } = state.selection;

                const node = $from.nodeAfter;
                if (node?.type.name === this.name) {
                    // 유튜브 노드일 경우 삭제 막음
                    return true;
                }

                return false;
            },
        };
    },
});
