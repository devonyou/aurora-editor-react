import { Editor } from '@tiptap/react';

const isActive = (editor: Editor | null, type: string, attributes?: any) => {
    if (!editor) return false;
    if (!attributes) return editor.isActive(type);
    else return editor.isActive(type, attributes);
};

const getAttributes = (editor: Editor | null, type: string, props?: any) => {
    if (!editor) return false;

    if (!props) return editor.getAttributes(type);
    else {
        const object = editor.getAttributes(type);
        return object[props];
    }
};

export { isActive, getAttributes };
