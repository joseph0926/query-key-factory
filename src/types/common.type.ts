export type Tuple = readonly unknown[];
export type KeyFn<T extends Tuple = Tuple, A extends readonly any[] = any[]> = (
  ...a: A
) => T;
/**
 * @description Key에 허용되는 타입: Tuple | Tuple을 반환하는 함수
 * - TODO: 이러면 최소한 빈배열은 있어야 키로 등록됨 -> 좀 더 직관적인 default 키 지정 방법 고려 필요,,
 * - 2025.05.08 joseph0926
 */
export type KeyEntry<T extends Tuple = Tuple> = T | KeyFn<T>;
