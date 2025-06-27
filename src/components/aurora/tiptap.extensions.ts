import { Starter } from '../extension/starter';
import { Document } from '../extension/document';
import { Paragraph } from '../extension/paragraph';
import { Text } from '../extension/text';
import { Link } from '../extension/link';
import { Horizon } from '../extension/horizon';
import { Underline } from '../extension/underline';
import { Blockquote } from '../extension/blockquote';
import { TextStyle } from '../extension/textstyle';
import { Placeholder } from '../extension/placeholder';
import { TextAlign } from '../extension/textalign';
import { Color } from '../extension/color';
import { Highlight } from '../extension/highlight';
// import { TaskItem } from '../extension/taskitem';
// import { TaskList } from '../extension/tasklist';
import { Youtube } from '../extension/youtube';
import { Focus } from '../extension/focus';
import { Clip } from '../extension/clip';
import { Dropcursor } from '../extension/dropcursor';
import { CharacterCount } from '../extension/count';
import { CodeBlock } from '../extension/codeblock';
import { Indent } from '../extension/indent';
import { DragHandle } from '../extension/draghandle';

interface ExtensionsProps {
    placeholder: string;
    limit: number;
}

export const getExtensions = (props: ExtensionsProps) => {
    const { placeholder, limit } = props;

    const extensions = [
        Starter,
        Document,
        Paragraph,
        Text,
        Link,
        Horizon,
        Blockquote,
        Underline,
        TextStyle,
        CharacterCount(limit),
        Placeholder(placeholder),
        TextAlign,
        Color,
        Highlight,
        // TaskList,
        // TaskItem,
        Youtube,
        Focus,
        Clip,
        Dropcursor,
        Indent,
        CodeBlock,
        DragHandle,
    ];

    return extensions;
};
