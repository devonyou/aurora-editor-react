import { Link as TiptapLink } from '@tiptap/extension-link';
import { NodeViewContent, NodeViewWrapper, ReactNodeViewRenderer } from '@tiptap/react';
import styled from 'styled-components';

const StyledLink = styled(NodeViewWrapper)`
    color: #60a5fa !important;
    text-decoration: none;
    transition: opacity 0.2s ease-in-out;
    cursor: pointer;
`;

const LinkRenderer: React.FC = () => {
    return (
        <StyledLink>
            <NodeViewContent as="a" />
        </StyledLink>
    );
};

export const Link = TiptapLink.extend({
    name: 'link',

    addOptions() {
        return {
            ...this.parent?.(),

            openOnClick: true,
            autolink: true,
            defaultProtocol: 'https',
            protocols: ['http', 'https'],
            HTMLAttributes: {
                target: '_blank',
                rel: 'noopener noreferrer nofollow',
            },
        };
    },

    addNodeView() {
        return ReactNodeViewRenderer(LinkRenderer);
    },
});
