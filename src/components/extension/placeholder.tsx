import { Placeholder as TiptapPlaceholder } from '@tiptap/extension-placeholder';

export const Placeholder = (placeholder: string) =>
    TiptapPlaceholder.extend({
        addOptions() {
            return {
                ...this.parent?.(),
                placeholder,
            };
        },
    });
