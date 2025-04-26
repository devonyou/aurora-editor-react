import { Button } from 'antd';
import { CheckSquareOutlined } from '@ant-design/icons';
import AuroraTooltip from '../../tooltip/aurora.tooltip';
import { useAuroraContext } from '../../aurora.provider';

export default function Check() {
    const { editor } = useAuroraContext();

    const toggleTaskList = () => {
        if (!editor) return;
        editor.chain().focus().toggleTaskList().run();
    };

    // useEffect(() => {
    //     const handleLabelClick = (e: MouseEvent) => {
    //         const target = e.target as HTMLElement;

    //         if (!(target.tagName === 'LABEL' || target.closest('label')))
    //             return;

    //         const label = target.closest('label');
    //         const parentItem = label?.closest('li.aurora-task-list-item');
    //         if (!parentItem) return;

    //         setTimeout(() => {
    //             const input = label?.querySelector(
    //                 'input[type="checkbox"]'
    //             ) as HTMLInputElement;
    //             if (!input) return;

    //             const isChecked = input.checked;
    //             parentItem.setAttribute(
    //                 'data-checked',
    //                 isChecked ? 'true' : 'false'
    //             );

    //             const childItems = parentItem.querySelectorAll(
    //                 'li.aurora-task-list-item'
    //             );
    //             childItems.forEach(li => {
    //                 li.setAttribute(
    //                     'data-checked',
    //                     isChecked ? 'true' : 'false'
    //                 );
    //                 const childInput = li.querySelector(
    //                     'input[type="checkbox"]'
    //                 ) as HTMLInputElement;
    //                 if (childInput) {
    //                     childInput.checked = isChecked;
    //                 }
    //             });
    //         }, 0);
    //     };

    //     document.addEventListener('click', handleLabelClick);
    //     return () => {
    //         document.removeEventListener('click', handleLabelClick);
    //     };
    // }, []);

    return (
        <AuroraTooltip title="할일" placement="bottom">
            <Button
                icon={<CheckSquareOutlined />}
                onClick={toggleTaskList}
                type={editor?.isActive('taskList') ? 'primary' : 'text'}
                disabled={!editor}
            />
        </AuroraTooltip>
    );
}
