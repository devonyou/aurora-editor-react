import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
import { NodeViewWrapper, NodeViewContent, NodeViewProps, ReactNodeViewRenderer } from '@tiptap/react';
import { Dropdown, type MenuProps } from 'antd';

import { all, createLowlight } from 'lowlight';
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
import styled from 'styled-components';
import { useState } from 'react';
import { CaretDownOutlined } from '@ant-design/icons';

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

const StyledCodeBlockWrapper = styled(NodeViewWrapper)`
    position: relative;
    margin: 1em 0;
    border-radius: 0.25rem;
    background-color: #282c34;
    overflow: hidden;
    font-family: 'JetBrains Mono', 'Fira Code', Consolas, 'Liberation Mono', Menlo, monospace;
`;

const StyledCodeBlock = styled.pre`
    padding: 0.5em 0.75em;
    overflow: hidden;
    color: #abb2bf;
`;

const StyledCodeBlockHeader = styled.div`
    background-color: rgba(0, 0, 0, 0.4);
`;

const StyledCodeBlockLanguage = styled.span`
    font-size: 0.75em;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    // color: rgba(255, 255, 255, 0.7);
    color: #fff;
    text-transform: uppercase;
    font-weight: 500;
    display: flex;
    align-items: center;
    padding: 0.3rem;
    cursor: pointer;
`;

const StyledCodeBlockLanguageArrow = styled.span`
    font-size: 0.6em;
    margin-left: 5px;
    transform: translateY(1px);
`;

export default function CodeBlockRenderer({ node, updateAttributes }: NodeViewProps) {
    const language = node.attrs.language || 'text';
    const [open, setOpen] = useState(false);

    const handleLanguageChange: MenuProps['onClick'] = ({ key }) => {
        updateAttributes({ language: key });
        setOpen(false);
    };

    return (
        <StyledCodeBlockWrapper>
            <Dropdown
                menu={{ items, onClick: handleLanguageChange }}
                trigger={['click']}
                open={open}
                onOpenChange={setOpen}
            >
                <StyledCodeBlockHeader onClick={() => setOpen(true)}>
                    <StyledCodeBlockLanguage>
                        {language}
                        <StyledCodeBlockLanguageArrow>
                            <CaretDownOutlined style={{ fontSize: 15 }} />
                        </StyledCodeBlockLanguageArrow>
                    </StyledCodeBlockLanguage>
                </StyledCodeBlockHeader>
            </Dropdown>
            <StyledCodeBlock>
                <NodeViewContent as={'code'} className={`language-${language}`} />
            </StyledCodeBlock>
        </StyledCodeBlockWrapper>
    );
}

export const CodeBlock = CodeBlockLowlight.extend({
    addOptions() {
        return {
            ...this.parent?.(),
            lowlight,
        };
    },

    addAttributes() {
        return {
            ...this.parent?.(),
        };
    },

    addNodeView() {
        return ReactNodeViewRenderer(CodeBlockRenderer);
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

const items: MenuProps['items'] = [
    {
        type: 'group',
        label: '일반',
        children: [
            { key: 'text', label: 'Text' },
            { key: 'markdown', label: 'Markdown' },
        ],
    },
    {
        type: 'group',
        label: '웹',
        children: [
            { key: 'html', label: 'HTML' },
            { key: 'css', label: 'CSS' },
            { key: 'javascript', label: 'JavaScript' },
            { key: 'typescript', label: 'TypeScript' },
            { key: 'json', label: 'JSON' },
            { key: 'yaml', label: 'YAML' },
        ],
    },
    {
        type: 'group',
        label: '백엔드',
        children: [
            { key: 'python', label: 'Python' },
            { key: 'java', label: 'Java' },
            { key: 'csharp', label: 'C#' },
            { key: 'php', label: 'PHP' },
            { key: 'ruby', label: 'Ruby' },
            { key: 'go', label: 'Go' },
        ],
    },
    {
        type: 'group',
        label: '기타',
        children: [
            { key: 'rust', label: 'Rust' },
            { key: 'swift', label: 'Swift' },
            { key: 'kotlin', label: 'Kotlin' },
            { key: 'bash', label: 'Bash' },
            { key: 'sql', label: 'SQL' },
        ],
    },
];
