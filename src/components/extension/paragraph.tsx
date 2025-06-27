import { Paragraph as TiptapParagraph } from '@tiptap/extension-paragraph';
import { NodeViewContent, NodeViewWrapper, ReactNodeViewProps, ReactNodeViewRenderer } from '@tiptap/react';
import { ComponentType } from 'react';
import styled from 'styled-components';

const StyledParagraph = styled(NodeViewWrapper)`
    position: relative;
    margin: 5px 0;
    color: #14171a;
    font-size: 16px;
    padding: 5px 0;
`;

const ParagraphRenderer: ComponentType<ReactNodeViewProps> = props => {
    const value = props.node.textContent;

    return (
        <StyledParagraph>
            <NodeViewContent as="div" />
        </StyledParagraph>
    );
};

export const Paragraph = TiptapParagraph.extend({
    addOptions() {
        return {
            ...this.parent?.(),
            HTMLAttributes: {
                style: `
                    position: relative;
                    margin: 5px 0;
                    color: #14171a;
                    font-size: 16px;
                    padding: 5px 0;
                `,
            },
        };
    },
    addAttributes() {
        return {
            ...this.parent?.(),
        };
    },
    // addNodeView() {
    //     return ReactNodeViewRenderer(ParagraphRenderer);
    // },
    group: 'block',
    content: 'inline*',
    draggable: false,
});
