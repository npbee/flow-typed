// @flow
import { Schema, arrayOf, unionOf, valuesOf, normalize } from 'normalizr';

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

        // ExpectError - should be the same schema
        const theKey: 'users' = schema.getKey();
    },
});


// unionOf
// =========================

// The schemaAttribute is requried
// $ExpectError
const noSchemaAttribute = unionOf(schema);

const unionSchema = unionOf(schema, { schemaAttribute: 'type' });

const itemSchemaKey: 'articles' = unionSchema.getItemSchema().getKey();

const unionSchemaWithFnAttribute = unionOf(schema, {
    schemaAttribute: () => 'type'
});


// arrayOf
// =========================
const arraySchema = arrayOf(schema);
const arraySchemaItemKey: 'articles' = arraySchema.getItemSchema().getKey();

const arraySchemaWithOptions = arrayOf(schema, {
    schemaAttribute: 'type'
});

const arraySchemaWithOptionsAndFnAttribute = arrayOf(schema, {
    schemaAttribute: () => 'type'
});


// valuesOf
// =========================
const valuesSchema = valuesOf(schema);
const valuesSchemaItemKey: 'articles' = arraySchema.getItemSchema().getKey();

const valuesSchemaWithOptions = valuesOf(schema, {
    schemaAttribute: 'type'
});

const valuesSchemaWithOptionsAndFnAttribute = arrayOf(schema, {
    schemaAttribute: () => 'type'
});


// normalize
// =========================
const obj = { my: 'stuff' };

// $ExpectError
const notAnObject = normalize('nope');

// $ExpectError
const notASchema = normalize(obj, 'nope');

const normalized = normalize(obj, schema);

const entities = normalized.entities;
const result = normalized.result;

const normalizedAssignEntity = normalize(obj, schema, {
    assignEntity(normalized, key, value, originalInput, schema) {
        normalized[key] = value;
        originalInput[key] = value;

        const theKey = schema.getKey();
    },
});

const normalizedMergeIntoEntity = normalize(obj, schema, {
    mergeIntoEntity(stored, normalized, entityKey) {
    },
});
