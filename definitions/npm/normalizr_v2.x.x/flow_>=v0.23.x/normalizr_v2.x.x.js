declare module 'normalizr' {
  declare type SchemaValue = Schema<*, *, *, *, *, *>;

  declare class Schema<
    TDefaults: {
        [key: string]: any
    },
    TIdAttribute: string | (entity: { [key: string]: any }) => string,
    TKey: string,
    TMeta: {
        [key: string]: any
    },
    TAssignEntity: (
        normalized: { [key: string]: any },
        key: string,
        value: any,
        originalInput: { [key: string]: any },
        schema: Schema<TDefaults, TIdAttribute, TKey, TMeta, *, *>
    ) => void,
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
}
