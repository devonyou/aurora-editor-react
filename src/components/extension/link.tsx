import { Link as TiptapLink } from '@tiptap/extension-link';

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
                class: 'aurora-link',
                target: '_blank',
                rel: 'noopener noreferrer nofollow',
            },
        };
    },
});
