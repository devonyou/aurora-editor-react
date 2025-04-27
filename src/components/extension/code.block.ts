import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
import CodeBlockView from './code.block.view';
import { all, createLowlight } from 'lowlight';
import { ReactNodeViewRenderer } from '@tiptap/react';
import css from 'highlight.js/lib/languages/css';
import js from 'highlight.js/lib/languages/javascript';
import ts from 'highlight.js/lib/languages/typescript';
import html from 'highlight.js/lib/languages/xml';
import python from 'highlight.js/lib/languages/python';
import java from 'highlight.js/lib/languages/java';
import csharp from 'highlight.js/lib/languages/csharp';
import php from 'highlight.js/lib/languages/php';
import ruby from 'highlight.js/lib/languages/ruby';
import go from 'highlight.js/lib/languages/go';
import rust from 'highlight.js/lib/languages/rust';
import swift from 'highlight.js/lib/languages/swift';
import kotlin from 'highlight.js/lib/languages/kotlin';
import json from 'highlight.js/lib/languages/json';
import yaml from 'highlight.js/lib/languages/yaml';
import markdown from 'highlight.js/lib/languages/markdown';
import bash from 'highlight.js/lib/languages/bash';
import sql from 'highlight.js/lib/languages/sql';
import 'highlight.js/styles/atom-one-dark.css';

const lowlight = createLowlight(all);
lowlight.register('html', html);
lowlight.register('css', css);
lowlight.register('js', js);
lowlight.register('javascript', js);
lowlight.register('ts', ts);
lowlight.register('typescript', ts);
lowlight.register('python', python);
lowlight.register('java', java);
lowlight.register('csharp', csharp);
lowlight.register('cs', csharp);
lowlight.register('php', php);
lowlight.register('ruby', ruby);
lowlight.register('go', go);
lowlight.register('rust', rust);
lowlight.register('swift', swift);
lowlight.register('kotlin', kotlin);
lowlight.register('json', json);
lowlight.register('yaml', yaml);
lowlight.register('yml', yaml);
lowlight.register('markdown', markdown);
lowlight.register('md', markdown);
lowlight.register('bash', bash);
lowlight.register('shell', bash);
lowlight.register('sql', sql);

export const CustomCodeBlock = CodeBlockLowlight.extend({
    addNodeView() {
        return ReactNodeViewRenderer(CodeBlockView);
    },
    addCommands() {
        return {
            ...this.parent?.(),
            toggleCodeBlock:
                attributes =>
                ({ commands, state, editor }) => {
                    const { selection } = state;
                    const { $from, $to } = selection;

                    const isActive = editor.isActive(this.name);

                    const isMultipleLines = $from.pos !== $to.pos && $from.parent.type.name !== 'codeBlock';

                    if (isActive) {
                        return commands.toggleNode(this.name, 'paragraph', attributes);
                    }

                    if (isMultipleLines) {
                        const content = state.doc.textBetween($from.pos, $to.pos, '\n');

                        commands.deleteRange({ from: $from.pos, to: $to.pos });

                        return commands.insertContent({
                            type: this.name,
                            attrs: attributes,
                            content: [{ type: 'text', text: content }],
                        });
                    }

                    return commands.toggleNode(this.name, 'paragraph', attributes);
                },
        };
    },
});

export const CodeBlock = CustomCodeBlock.configure({
    lowlight,
});
