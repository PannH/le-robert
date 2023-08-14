# 📕 Le Robert
This library gives you access to French words data by scraping them from the dictionary Le Robert, one of the most famous French dictionaries.

# 📥 Installation
### NPM
```bash
npm install le-robert
```
### Yarn
```bash
yarn add le-robert
```
### PNPM
```bash
pnpm add le-robert
```

# 🔧 Functions
Each function can be imported from the library as below 👇
```js
// Require syntax
const { getDefinitionGroups, getPronunciation, ... } = require('le-robert');

// Import syntax
import { getDefinitionGroups, getPronunciation, ... } from 'le-robert';
```

---

### `getDefinitionGroups(wordQuery: string): Promise<DefinitionGroup[]>`
#### Example
```js
await getDefinitionGroups('programmation'); // => https://sourceb.in/4rSVNnS0rQ
```

---

### `getPronunciation(wordQuery: string): Promise<Pronunciation>`
#### Example
```js
await getPronunciation('programmation'); // => https://sourceb.in/5rHNNIWFZD
```

---

### `getUsageExamples(wordQuery: string): Promise<UsageExample[]>`
#### Example
```js
await getUsageExamples('programmation'); // => https://sourceb.in/IekuY8L8Jp
```

### `getConjugationGroups(verbQuery: string): Promise<ConjugationGroup[]>`
#### Example
```js
await getConjugationGroups('programmer'); // => https://sourceb.in/HZccVYUGzJ
```

---

# ⚙️ Types
Since some of the returned objects from the previous functions may be huge, here is the types to help you understand better how to use the data.

Also, you can use the intellisense of your editor to explore the data.

---

### `DefinitionGroup`
```ts
interface DefinitionGroup {
   category: string;
   definitions: Definition[];
}
```

---

### `Definition`
```ts
interface Definition {
   value: string;
   examples: string[];
   context?: string;
}
```

---

### `Pronunciation`
```ts
interface Pronunciation {
   audioURL: string;
}
```

---

### `UsageExample`
```ts
interface UsageExample {
   value: string;
   source: UsageExampleSource;
}
```

---

### `UsageExampleSource`
```ts
interface UsageExampleSource {
   value: string;
   url: string;
}
```

---

### `ConjugationGroup`
```ts
interface ConjugationGroup {
   name: string;
   subgroups: ConjugationSubgroup[];
}
```

---

### `ConjugationSubgroup`
```ts
interface ConjugationSubgroup {
   name: string;
   tenses: ConjugationTense[];
}
```

---

### `ConjugationTense`
```ts
interface ConjugationTense {
   name: string;
   conjugations: string[];
}
```