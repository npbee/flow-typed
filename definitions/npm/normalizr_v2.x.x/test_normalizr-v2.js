// @flow
import { Schema } from 'normalizr';

// Test Schema API
// =========================

// Default Schema
const schema = new Schema('articles');

// Test that the returned key value is the key given in the constructor
const someKey: 'articles' = schema.getKey();

const nestedSchema = new Schema('users');

schema.define({
    users: nestedSchema
});


// Test Schema API - w/ options
// =========================
const schemaWithOptions = new Schema('articles', {
    assignEntity(normalized, key, value, originalInput, schema) {
        normalized[key] = value;
        originalInput[key] = value;

        const theKey: 'articles' = schema.getKey();
    },
    defaults: { likes: 0 },
    idAttribute: 'slug',
    meta: { removeProps: ['publisher'] },
});

// Test that the idAttribute is correct
const idAttribute: 'slug' = schemaWithOptions.getIdAttribute();

// Test that the default idAttribute is NOT "id"
// $ExpectError
const notDefaultId: 'id' = schemaWithOptions.getIdAttribute();

// Test the default option
const defaults: { likes: 0 } = schemaWithOptions.getDefaults();

// Test a function version of idAttribute
const schemaWithFunctionIdAttribute = new Schema('articles', {
    idAttribute: entity => entity.idAttribute
})

// $ExpectError - Meta is not an object
const schemaWithBadMeta = new Schema('articles', {
    meta: 'hey'
});

// $ExpectError - assignEntity is not in the correct form
const schemaWithBadAssignEntity = new Schema('articles', {
    assignEntity: 'hey'
});

const schemaWithBadAssignEntityArgs = new Schema('articles', {
    assignEntity(normalized, key, value, originalInput, schema) {

        // $ExpectError - should be the same schema
        const theKey: 'users' = schema.getKey();
    },
});
