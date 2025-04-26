import { Button } from 'antd';
import { CodeOutlined } from '@ant-design/icons';
import AuroraTooltip from '../../tooltip/aurora.tooltip';
import { useAuroraContext } from '../../aurora.provider';

export default function CodeBlock() {
    const { editor } = useAuroraContext();

    const toggleCodeBlock = () => {
        if (!editor) return;
        editor.chain().focus().toggleCodeBlock().run();
    };

    return (
        <AuroraTooltip title="코드 블럭" placement="bottom">
            <Button
                icon={<CodeOutlined />}
                type={editor?.isActive('codeBlock') ? 'primary' : 'text'}
                onClick={toggleCodeBlock}
                disabled={!editor}
            />
        </AuroraTooltip>
    );
}
