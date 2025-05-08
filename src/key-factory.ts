import type { Tuple, KeyEntry } from "./types/common.type";

/**
 * @description prefix를(Root) 붙여주는 래퍼 타입
 * @description 키 인자가 단순 배열이면 함수 형태로 반환 / 함수형태면 그대로
 */
export type Prefixed<Root extends Tuple, E extends KeyEntry> = E extends (
  ...a: infer A
) => infer R
  ? (...a: A) => readonly [...Root, ...(R & Tuple)]
  : () => readonly [...Root, ...(E & Tuple)];

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
export type Keys<Defs extends Record<string, KeyEntry>, Root extends Tuple> = {
  [K in keyof Defs]: Prefixed<Root, Defs[K]>;
};

export function createKeyFactory<const P extends string>(prefix: P) {
  const root = [prefix] as const;
  type Root = typeof root;

  function wrap<E extends KeyEntry>(entry: E): Prefixed<Root, E> {
    return ((...args: any[]) => {
      const tail =
        typeof entry === "function"
          ? (entry as (...a: any[]) => Tuple)(...args)
          : (entry as Tuple);
      return [...root, ...tail] as const;
    }) as Prefixed<Root, E>;
  }

  return function defineKeys<const D extends Record<string, KeyEntry>>(
    defs: D
  ): Keys<D, Root> {
    const out = {} as Keys<D, Root>;

    (Object.keys(defs) as Array<keyof D>).forEach((k) => {
      out[k] = wrap(defs[k]);
    });

    return out;
  };
}
