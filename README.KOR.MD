# query-key-factory

> 프리픽스 기반, 완전 타입 안전 쿼리 키 팩토리

---

## 🇰🇷 한국어 안내

### 특징

- **단 한 줄로 키 정의** – `createKeyFactory("todo", { … })`
- 커링(curry) 지원 – 프리픽스를 재사용할 때 편리
- **Readonly 튜플** 반환으로 TanStack Query v5 `queryKey` 와 100 % 호환
- 매개변수 개수·타입을 그대로 보존 → 실수 방지

### 설치

```bash
pnpm add query-key-factory
```

### 사용 예시

```ts
import { createKeyFactory } from "@/lib/query-key-factory";

// ① 원-스텝(one-shot)
export const todoKey = createKeyFactory("todo", {
  LIST: [],
  DETAIL: (id: string) => ["detail", id],
});

// ② 커리(curry) 방식
const todoKeyFactory = createKeyFactory("todo");
export const todoKey2 = todoKeyFactory({
  LIST: [],
});

// 타입 추론 결과
const k1 = todoKey.LIST(); // readonly ["todo"]
const k2 = todoKey.DETAIL("123"); // readonly ["todo","detail","123"]
```

### API 레퍼런스

| 함수                              | 설명                                                                                              |
| --------------------------------- | ------------------------------------------------------------------------------------------------- |
| `createKeyFactory(prefix, defs?)` | 프리픽스와 키 정의 객체를 받아 타입 세이프한 키 객체를 반환. `defs` 생략 시 커리 형태로 사용 가능 |

#### Key Definition 규칙

```ts
{
  CONSTANT: [],                       // 고정 키 (배열)
  PARAM   : (id: string) => [id],     // 매개변수 키 (함수)
}
```

- 배열 또는 튜플 반환 함수만 허용. 리터럴 튜플은 `as const` 필요 ❌ – 제네릭으로 자동 보존.

### 라이선스

MIT

**Author**

- **김영훈 (joseph0926)**

  - GitHub : [https://github.com/joseph0926](https://github.com/joseph0926)
  - Email : [joseph0926.dev@gmail.com](mailto:joseph0926.dev@gmail.com)

- Repository : [https://github.com/joseph0926/query-key-factory](https://github.com/joseph0926/query-key-factory)
