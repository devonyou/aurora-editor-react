import { FocusClasses as TiptapFocus } from '@tiptap/extension-focus';
import type { FocusOptions as TiptapFocusOptions } from '@tiptap/extension-focus';
import { Plugin, PluginKey } from 'prosemirror-state';
import { Decoration, DecorationSet } from 'prosemirror-view';

interface FocusOptions extends TiptapFocusOptions {
    style: string;
}

export const Focus = TiptapFocus.extend<FocusOptions>({
    addOptions(): FocusOptions {
        return {
            ...this.parent?.(),
            mode: 'shallowest' as FocusOptions['mode'],
            // style: 'background-color: rgba(0, 0, 0, 0.01); border-radius: 0.25rem',
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
                        const isEmpty = this.editor.isEmpty;

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
                                    style: this.options.style,
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
