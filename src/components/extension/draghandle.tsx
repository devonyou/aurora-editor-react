import { DragOutlined, HolderOutlined } from '@ant-design/icons';
import { DragHandle as DragHandleTiptap } from '@tiptap/extension-drag-handle';
import { Button } from 'antd';
import { createRoot } from 'react-dom/client';

const DragHandleRenderer = () => {
    const div = document.createElement('div');

    const DragHandleButton = () => (
        <Button size="small" type="text">
            <HolderOutlined style={{ fontSize: 18 }} />
            {/* <DragOutlined style={{ fontSize: 18 }} /> */}
        </Button>
    );

    setTimeout(() => {
        const root = createRoot(div);
        root.render(<DragHandleButton />);
        (div as any)._unmount = () => root.unmount();
    });

    return div;
};

export const DragHandle = DragHandleTiptap.extend({
    name: 'drag-handle',
    addOptions() {
        return {
            ...this?.parent?.(),
            render: DragHandleRenderer,
            tippyOptions: {
                placement: 'left' as any,
                offset: [0, 10] as any,
                delay: [0, 0] as any,
                duration: 0,
                interactive: true,
                interactiveBorder: 20,
                hideOnClick: true,
                trigger: 'mouseenter focus',
                appendTo: () => document.body,
                onDestroy(instance) {
                    const unmount = (instance.popper.firstChild as any)?._unmount;
                    if (unmount) unmount();
                },
            },
        };
    },
    addGlobalAttributes() {
        return [
            {
                types: ['paragraph'],
                attributes: {
                    draggable: {
                        default: true,
                        parseHTML: () => true,
                        renderHTML: () => ({ draggable: 'true' }),
                    },
                },
            },
        ];
    },
});
