import type { Tuple, KeyEntry, KeyFn } from "./types/common.type";

/**
 * @description prefix를(Root) 붙여주는 래퍼 타입
 * @description 키 인자가 단순 배열이면 함수 형태로 반환 / 함수형태면 그대로
 */
type Prefixed<Root extends Tuple, E extends KeyEntry> = E extends KeyFn<
  infer Tail,
  infer A
>
  ? Tail extends Tuple
    ? (...a: A) => readonly [...Root, ...Tail]
    : never
  : E extends Tuple
  ? () => readonly [...Root, ...E]
  : never;

/**
 * @description prefix에 대한 사용자가 넘긴 객체를 키 객체 형태로 반환
 * @example```
 * const todoKeys = createKeyFactory('todo')({
  DEFAULT: [],
  ITEM   : (id: string) => ['item', id]
});

todoKeys.DEFAULT(); // => ['todo']
todoKeys.ITEM('42'); // => ['todo','item','42']
 * ```
 */
type Keys<Defs extends Record<string, KeyEntry>, Root extends Tuple> = {
  [K in keyof Defs]: Prefixed<Root, Defs[K]>;
};

export function createKeyFactory<const P extends string>(
  prefix: P
): <const D extends Record<string, KeyEntry>>(defs: D) => Keys<D, readonly [P]>;

export function createKeyFactory<
  const P extends string,
  const D extends Record<string, KeyEntry>
>(prefix: P, defs: D): Keys<D, readonly [P]>;

export function createKeyFactory(
  prefix: string,
  defs?: Record<string, KeyEntry>
) {
  const root = [prefix] as const;

  const wrap =
    (entry: KeyEntry) =>
    (...args: any) => {
      const tail = typeof entry === "function" ? entry(...args) : entry;
      return [...root, ...tail] as const;
    };

  const define = <D extends Record<string, KeyEntry>>(
    d: D
  ): Keys<D, typeof root> => {
    const out = {} as Keys<D, typeof root>;
    (Object.keys(d) as Array<keyof D>).forEach((k) => {
      out[k] = wrap(d[k]) as any;
    });
    return out;
  };

  return defs ? define(defs) : define;
}
