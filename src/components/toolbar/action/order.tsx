import { Button } from 'antd';
import { OrderedListOutlined } from '@ant-design/icons';
import AuroraTooltip from '../../tooltip/aurora.tooltip';
import { useAuroraContext } from '../../aurora.provider';

export default function Order() {
    const { editor } = useAuroraContext();

    const toggleOrderedList = () => {
        if (!editor) return;
        editor.chain().focus().toggleOrderedList().run();
    };

    return (
        <AuroraTooltip title="순서 있는 목록" placement="bottom">
            <Button
                icon={<OrderedListOutlined />}
                onClick={toggleOrderedList}
                type={editor?.isActive('orderedList') ? 'primary' : 'text'}
                disabled={!editor}
            />
        </AuroraTooltip>
    );
}
