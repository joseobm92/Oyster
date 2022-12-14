const { Schema, model } = require('mongoose');


const collectionSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        address: {
            type: String,
            required: true,
        },
    }
);

const Collection = model('Collection', collectionSchema);

module.exports = Collection;
