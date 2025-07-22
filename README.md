<h1 align="center">wikifly</h1>

<p align="center">
  <a href="https://github.com/zapolyarnydev/wikifly/actions/workflows/tests.yml">
    <img src="https://img.shields.io/github/actions/workflow/status/zapolyarnydev/wikifly/tests.yml?style=flat&label=Library%20tests" alt="Library test status"/>
  </a>
</p>

## 👀 About library
A lightweight JavaScript & TypeScript wrapper for searching and fetching Wikipedia articles

## 📦 Installation

You can install `wikifly` using [npm](https://www.npmjs.com/)

```bash
npm install wikifly
```

## 📚 API Reference

### `wikifly.search(query: string, limit?: number, lang?: string): Promise<string[]>`

Searches Wikipedia articles by keyword.

#### Parameters:
- `query` – Search string (e.g., `"JavaScript"`).
- `limit` *(optional)* – Maximum number of results (default is `10`).
- `lang` *(optional)* – Language code for Wikipedia (default is `"en"`).

#### Returns:
An array of strings – the titles of the found articles.

#### Example:
```ts
const results = await wikifly.search("TypeScript", 5, "en");
console.log(results);
```

### `wikifly.get(title: string, lang?: string): Promise<WikiArticle>`

Fetches detailed information about a specific Wikipedia article.

#### Parameters:
- title – The exact title of the Wikipedia article.
- lang (optional) – Language code for Wikipedia (default is "en").

#### Returns:
A WikiArticle object containing metadata and structured content.

#### Example:
```ts
const article = await wikifly.get("TypeScript", "en");
console.log(article.title);       // Article title
console.log(article.intro);       // Introductory paragraph
console.log(article.lastModified); // Last modified date
console.log(article.articleContent); // Array of content sections
```

## 💻 Code example
```ts
import { wikifly } from "wikifly";

const foo = async () => {
  const results = await wikifly.search("JavaScript", 5, "en");
  console.log("Search results:", results);

  const article = await wikifly.get("JavaScript", "en");
  console.log("Article title:", article.title);
  console.log("Intro:", article.intro);
};

foo();
```

## 📃 License

Copyright (c) 2025 ZapolyarnyDev

This project is licensed under the MIT License – see the LICENSE file for details.
