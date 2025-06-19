import { useTiptap, UseTiptapProps } from './use.tiptap';
import { AuroraEditorContext } from './aurora.editor.context';

export function AuroraEditorProvider({ children, ...editorProps }: React.PropsWithChildren<UseTiptapProps>) {
    const editorState = useTiptap(editorProps);
    return <AuroraEditorContext.Provider value={editorState}>{children}</AuroraEditorContext.Provider>;
}
