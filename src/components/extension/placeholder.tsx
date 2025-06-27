import { Placeholder as TiptapPlaceholder } from '@tiptap/extension-placeholder';

export const Placeholder = (placeholder: string) => {
    return TiptapPlaceholder.extend({
        addOptions() {
            return {
                ...this.parent?.(),
                placeholder,
                showOnlyWhenEditable: true,
                showOnlyCurrent: true,
                includeChildren: true,
            };
        },
    });
};
