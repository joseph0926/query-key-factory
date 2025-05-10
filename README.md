# query-key-factory

> **Type-safe key generator for TanStack Query**

### Features

- **One-line key definition** – `createKeyFactory("todo", { … })`
- Curry support for prefix reuse
- Returns **readonly tuples** fully compatible with TanStack Query v5 `queryKey`
- Keeps parameter arity & types intact → prevents misuse

### Installation

```bash
pnpm add query-key-factory
```

### Quick Start

```ts
import { createKeyFactory } from "@/lib/query-key-factory";

// 1. One-shot
export const todoKey = createKeyFactory("todo", {
  LIST: [],
  DETAIL: (id: string) => ["detail", id],
});

// 2. Curried
const todoKeyFactory = createKeyFactory("todo");
export const todoKey2 = todoKeyFactory({
  LIST: [],
});

// Inferred types
const k1 = todoKey.LIST(); // readonly ["todo"]
const k2 = todoKey.DETAIL("123"); // readonly ["todo","detail","123"]
```

### API Reference

| Function                          | Description                                                                       |
| --------------------------------- | --------------------------------------------------------------------------------- |
| `createKeyFactory(prefix, defs?)` | Returns a type-safe key object for TanStack Query. Omit `defs` for curried usage. |

#### Key Definition Rules

```ts
{
  CONSTANT: [],                   // constant key (tuple)
  PARAM   : (id: string) => [id], // parameterised key (function)
}
```

### License

MIT

---

**Author**

- **김영훈 (joseph0926)**

  - GitHub : [https://github.com/joseph0926](https://github.com/joseph0926)
  - Email : [joseph0926.dev@gmail.com](mailto:joseph0926.dev@gmail.com)

- Repository : [https://github.com/joseph0926/query-key-factory](https://github.com/joseph0926/query-key-factory)
