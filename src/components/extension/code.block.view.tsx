import { useState } from 'react';
import { NodeViewWrapper, NodeViewContent, NodeViewProps } from '@tiptap/react';
import { Dropdown } from 'antd';
import type { MenuProps } from 'antd';

type CodeBlockViewProps = NodeViewProps & {
    node: {
        attrs: {
            language: string;
        };
    };
    updateAttributes: (attrs: Record<string, any>) => void;
};

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

export default function CodeBlockView({ node, updateAttributes }: NodeViewProps) {
    const language = node.attrs.language || 'text';
    const [open, setOpen] = useState(false);

    const handleLanguageChange: MenuProps['onClick'] = ({ key }) => {
        updateAttributes({ language: key });
        setOpen(false);
    };

    return (
        <NodeViewWrapper className="aurora-code-block">
            <Dropdown
                menu={{ items, onClick: handleLanguageChange }}
                trigger={['click']}
                open={open}
                onOpenChange={setOpen}
            >
                <div className="code-block-header" onClick={() => setOpen(true)}>
                    <span className="code-block-language">
                        {language || 'text'}
                        <span className="language-indicator-arrow">▼</span>
                    </span>
                </div>
            </Dropdown>
            <pre>
                <NodeViewContent as="code" className={`language-${language}`} />
            </pre>
        </NodeViewWrapper>
    );
}
