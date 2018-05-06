import Save from './save';

const Block = {
    title: 'Notes',
    icon: 'edit',
    category: 'common',
    attributes: {
        notes: {
            type: 'array',
            default: [{ title: "My First Item" }],
        },
    },
    save: Save
};