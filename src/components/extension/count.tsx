import { CharacterCount as TiptapCharacterCount } from '@tiptap/extension-character-count';

export const CharacterCount = (limit: number) => {
    return TiptapCharacterCount.extend({
        addOptions() {
            return {
                ...this.parent?.(),
                limit,
            };
        },
    });
};
