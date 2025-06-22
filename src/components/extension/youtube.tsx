import { Youtube as TiptapYoutube } from '@tiptap/extension-youtube';

export const Youtube = TiptapYoutube.extend({
    addOptions() {
        return {
            ...this.parent?.(),

            controls: false,
            nocookie: true,
            inline: false,
            width: 480,
            height: 270,
            modestBranding: true,
            autoplay: false,
            HTMLAttributes: { class: 'aurora-youtube' },
        };
    },
});
