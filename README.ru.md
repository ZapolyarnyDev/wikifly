<h1 align="center">wikifly</h1>

<p align="center">
  <a href="https://github.com/zapolyarnydev/wikifly/actions/workflows/tests.yml">
    <img src="https://img.shields.io/github/actions/workflow/status/zapolyarnydev/wikifly/tests.yml?style=flat&label=Library%20tests" alt="Library test status"/>
  </a>
</p>

## 🌐 Язык

- [English](README.md)
- [Русский](README.ru.md)

## 👀 О библиотеке
Легковесная обёртка на JavaScript & TypeScript для поиска и получения статей из Википедии

## 📦 Установка

Вы можете установить `wikifly` при помощи [npm](https://www.npmjs.com/)

```bash
npm install wikifly
```

## 📚 Пример работы с API

### `wikifly.search(query: string, limit?: number, lang?: string): Promise<string[]>`

Ищет список статей по ключевому слову

#### Parameters:
- `query` – Искомая тематика (Например, `"JavaScript"`).
- `limit` *(необязательно)* – Ограничение на количество результата (по умолчанию `10`).
- `lang` *(необязательно)* – Языковой код для поиска (по умолчанию `"en"`).

#### Возвращает:
Массив строк – заголовки найденных статей.

#### Пример:
```ts
const results = await wikifly.search("TypeScript", 5, "en");
console.log(results);
```

### `wikifly.get(title: string, lang?: string): Promise<WikiArticle>`

Извлекает подробную информацию о конкретной статье в Википедии.

#### Параметры:
- title – Заголовок конкретной статьи.
- lang (необязательно) – Языковой код для поиска (по умолчанию `"en"`).

#### Возвращает:
Объект WikiArticle содержащий большинство метаданных о статьей

#### Пример:
```ts
const article = await wikifly.get("TypeScript", "en");
console.log(article.title);       // Заголовок статьи
console.log(article.intro);       // Вступительный абзац
console.log(article.lastModified); // Дата последнего изменения
console.log(article.articleContent); // Массив из раделов содержания
```

## 💻 Пример кода
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

## Лицензия

&copy; 2025 ZapolyarnyDev

Проект распространяется под лицензией MIT — см. файл [LICENSE](LICENSE) для подробностей.
