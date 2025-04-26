import { Button } from 'antd';
import { UnorderedListOutlined } from '@ant-design/icons';
import AuroraTooltip from '../../tooltip/aurora.tooltip';
import { useAuroraContext } from '../../aurora.provider';

export default function Unorder() {
    const { editor } = useAuroraContext();

    const toggleBulletList = () => {
        if (!editor) return;
        editor.chain().focus().toggleBulletList().run();
    };

    return (
        <AuroraTooltip title="목록" placement="bottom">
            <Button
                icon={<UnorderedListOutlined />}
                onClick={toggleBulletList}
                type={editor?.isActive('bulletList') ? 'primary' : 'text'}
                disabled={!editor}
            />
        </AuroraTooltip>
    );
}
