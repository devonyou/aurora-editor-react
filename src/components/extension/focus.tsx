import { FocusClasses as TiptapFocus } from '@tiptap/extension-focus';
import type { FocusOptions } from '@tiptap/extension-focus';
import { Plugin, PluginKey } from 'prosemirror-state';
import { Decoration, DecorationSet } from 'prosemirror-view';

export const Focus = TiptapFocus.extend({
    addOptions() {
        return {
            ...this.parent?.(),
            mode: 'deepest' as FocusOptions['mode'],
            className: 'aurora-focus',
        };
    },

    addAttributes() {
        return {
            ...this.parent?.(),
        };
    },

    addProseMirrorPlugins() {
        return [
            new Plugin({
                key: new PluginKey('focus'),
                props: {
                    decorations: ({ doc, selection }) => {
                        const { isEditable, isFocused } = this.editor;
                        const { anchor } = selection;
                        const decorations: Decoration[] = [];

                        const $from = this.editor.state.selection.$from;
                        const $fromName = $from.parent.type.name;

                        if (!isEditable || !isFocused || $fromName === 'doc') {
                            return DecorationSet.create(doc, []);
                        }

                        // Maximum Levels
                        let maxLevels = 0;

                        if (this.options.mode === 'deepest') {
                            doc.descendants((node, pos) => {
                                if (node.isText) {
                                    return;
                                }

                                const isCurrent = anchor >= pos && anchor <= pos + node.nodeSize - 1;

                                if (!isCurrent) {
                                    return false;
                                }

                                maxLevels += 1;
                            });
                        }

                        // Loop through current
                        let currentLevel = 0;

                        doc.descendants((node, pos) => {
                            if (node.isText) {
                                return false;
                            }

                            const isCurrent = anchor >= pos && anchor <= pos + node.nodeSize - 1;

                            if (!isCurrent) {
                                return false;
                            }

                            currentLevel += 1;

                            const outOfScope =
                                (this.options.mode === 'deepest' && maxLevels - currentLevel > 0) ||
                                (this.options.mode === 'shallowest' && currentLevel > 1);

                            if (outOfScope) {
                                return this.options.mode === 'deepest';
                            }

                            decorations.push(
                                Decoration.node(pos, pos + node.nodeSize, {
                                    class: this.options.className,
                                })
                            );
                        });

                        return DecorationSet.create(doc, decorations);
                    },
                },
            }),
        ];
    },
});
