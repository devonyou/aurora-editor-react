import { Level } from '@tiptap/extension-heading';
import { Editor } from '@tiptap/react';
import '@tiptap/starter-kit';

const toggleBold = (editor: Editor | null, setId: (id: string) => void) => {
    if (!editor) return;
    console.log(editor);
    editor.chain().focus().toggleBold().run();
    setId('bold');
};

const toggleItalic = (editor: Editor | null, setId: (id: string) => void) => {
    if (!editor) return;
    editor.chain().focus().toggleItalic().run();
    setId('italic');
};

const toggleStrike = (editor: Editor | null, setId: (id: string) => void) => {
    if (!editor) return;
    editor.chain().focus().toggleStrike().run();
    setId('strike');
};

const toggleHeading = (
    editor: Editor | null,
    setId: (id: string) => void,
    level: Level
) => {
    if (!editor) return;
    editor.chain().focus().toggleHeading({ level: level }).run();
    setId('heading');
};

export { toggleBold, toggleItalic, toggleStrike, toggleHeading };
