/** Extract the return type of a Promise */
type UnboxPromise<T extends Promise<any>> =
  T extends Promise<infer U> ? U : never;

/** Convert union types to intersection types */
declare type UnionToIntersection<U> = (
  U extends any ? (k: U) => void : never
) extends (k: infer I) => void
  ? I
  : never;

/** eg: type result = StringToUnion<'abc'> Result: 'a'|'b'|'c' */
type StringToUnion<S extends string> = S extends `${infer S1}${infer S2}`
  ? S1 | StringToUnion<S2>
  : never;

/** String replacement, similar to the JavaScript string.replace method */
type Replace<
  Str extends string,
  From extends string,
  To extends string,
> = Str extends `${infer Left}${From}${infer Right}`
  ? `${Left}${To}${Right}`
  : Str;

/** String replacement, similar to the JavaScript string.replaceAll method */
type ReplaceAll<
  Str extends string,
  From extends string,
  To extends string,
> = Str extends `${infer Left}${From}${infer Right}`
  ? Replace<Replace<`${Left}${To}${Right}`, From, To>, From, To>
  : Str;

/** eg: type result = CamelCase<'foo-bar-baz'> Result: fooBarBaz */
type CamelCase<S extends string> = S extends `${infer S1}-${infer S2}`
  ? S2 extends Capitalize<S2>
    ? `${S1}-${CamelCase<S2>}`
    : `${S1}${CamelCase<Capitalize<S2>>}`
  : S;

/** eg: type result = StringToArray<'abc'> Result: ['a', 'b', 'c'] */
type StringToArray<
  S extends string,
  T extends any[] = [],
> = S extends `${infer S1}${infer S2}` ? StringToArray<S2, [...T, S1]> : T;

/** `RequiredKeys` is used to get all required fields, combining them into a union type */
type RequiredKeys<T> = {
  [P in keyof T]: T extends Record<P, T[P]> ? P : never;
}[keyof T];

/** `OptionalKeys` is used to get all optional fields, combining them into a union type */
type OptionalKeys<T> = {
  [P in keyof T]: object extends Pick<T, P> ? P : never;
}[keyof T];

/** `GetRequired` is used to get a new type with all required keys and their types from a type */
type GetRequired<T> = {
  [P in RequiredKeys<T>]-?: T[P];
};

/** `GetOptional` is used to get a new type with all optional keys and their types from a type */
type GetOptional<T> = {
  [P in OptionalKeys<T>]?: T[P];
};

/**  type result1 = Includes<[1, 2, 3, 4], '4'> Result: false; type result2 = Includes<[1, 2, 3, 4], 4> Result: true */
type Includes<T extends any[], K> = K extends T[number] ? true : false;

/** eg: type result = MyConcat<[1, 2], [3, 4]> Result: [1, 2, 3, 4] */
type MyConcat<T extends any[], U extends any[]> = [...T, ...U];
/** eg: type result1 = MyPush<[1, 2, 3], 4> Result: [1, 2, 3, 4] */
type MyPush<T extends any[], K> = [...T, K];
/** eg: type result3 = MyPop<[1, 2, 3]> Result: [1, 2] */
type MyPop<T extends any[]> = T extends [...infer L, infer R] ? L : never; // eslint-disable-line

type PropType<T, Path extends string> = string extends Path
  ? unknown
  : Path extends keyof T
    ? T[Path]
    : Path extends `${infer K}.${infer R}`
      ? K extends keyof T
        ? PropType<T[K], R>
        : unknown
      : unknown;

/**
 * NestedKeyOf
 * Get all the possible paths of an object
 * @example
 * type Keys = NestedKeyOf<{ a: { b: { c: string } }>
 * // 'a' | 'a.b' | 'a.b.c'
 */
type NestedKeyOf<ObjectType extends object> = {
  [Key in keyof ObjectType & (string | number)]: ObjectType[Key] extends object
    ? `${Key}` | `${Key}.${NestedKeyOf<ObjectType[Key]>}`
    : `${Key}`;
}[keyof ObjectType & (string | number)];

type RecordNamePaths<T extends object> = {
  [K in NestedKeyOf<T>]: PropType<T, K>;
};
