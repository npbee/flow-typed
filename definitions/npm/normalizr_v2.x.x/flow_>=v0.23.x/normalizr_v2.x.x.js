declare module 'normalizr' {
  declare type SchemaValue = Schema<*, *, *, *, *, *>;
  declare type SchemaMap = {
      [key: string]: SchemaValue
  };
  declare type TObjectLiteral = {
      [key: string]: any
  };

  declare type TOutput = {
      entities: {
          [key: string]: any
      },
      result: Object
  };

  declare type TAssignEntityFn = (
    normalized: { [key: string]: any },
    key: string,
    value: any,
    originalInput: { [key: string]: any },
    schema: SchemaValue
  ) => void;

  declare class Schema<
    TDefaults: {
        [key: string]: any
    },
    TIdAttribute: string | (entity: { [key: string]: any }) => string,
    TKey: string,
    TMeta: {
        [key: string]: any
    },
    TAssignEntity: TAssignEntityFn,
    TOptions: {
        assignEntity?: TAssignEntity,
        idAttribute?: TIdAttribute,
        defaults?: TDefaults,
        meta?: TMeta
    },
  > {
      constructor(key: TKey, options?: TOptions): Schema<TKey, TOptions>;
      define(schemaMap: {
          [key: string]: SchemaValue
      }): void;
      getDefaults(): TDefaults;
      getIdAttribute(): TIdAttribute;
      getKey(): TKey;
  }

  declare class UnionSchema<TItemSchema: SchemaValue> {
      getItemSchema(): TItemSchema;
  }

  declare class IterableSchema<TItemSchema: SchemaValue> {
      getItemSchema(): TItemSchema;
  }

  declare function unionOf<TItemSchema: SchemaValue>(
      schema: TItemSchema,
      options: {
          schemaAttribute: string | (entity: TObjectLiteral) => string
      }
  ): UnionSchema<TItemSchema>;

  declare function arrayOf<TItemSchema: SchemaValue>(
      schema: TItemSchema,
      options?: {
          schemaAttribute?: string | (entity: TObjectLiteral) => string
      }
  ): IterableSchema<TItemSchema>;

  declare function valuesOf<TItemSchema: SchemaValue>(
      schema: TItemSchema,
      options?: {
          schemaAttribute?: string | (entity: TObjectLiteral) => string
      }
  ): IterableSchema<TItemSchema>;


  declare function normalize(
      obj: TObjectLiteral | Array<TObjectLiteral>,
      schema: SchemaValue,
      options?: {
          assignEntity?: TAssignEntityFn,
          mergeIntoEntity?: (
              stored: any,
              normalized: any,
              entityKey: string
          ) => void
      }
  ): TOutput;
}
