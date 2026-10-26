import type { Category, Post } from "../types/post";

function isCategory(value: unknown): value is Category {
  return (
    typeof value === "object" &&
    value !== null &&
    "id" in value &&
    typeof value.id === "number" &&
    "name" in value &&
    typeof value.name === "string"
  );
}

function isPost(value: unknown): value is Post {
  return (
    typeof value === "object" &&
    value !== null &&
    "id" in value &&
    typeof value.id === "number" &&
    "name" in value &&
    typeof value.name === "string" &&
    "content" in value &&
    typeof value.content === "string" &&
    (!("category" in value) || value.category === null || isCategory(value.category))
  );
}

export async function fetchPosts(signal: AbortSignal): Promise<Post[]> {
  const baseUrl = import.meta.env.VITE_API_BASE_URL?.trim();

  if (!baseUrl) {
    throw new Error(
      "Адресу бекенду не налаштовано. Додайте VITE_API_BASE_URL у файл .env.local і перезапустіть застосунок.",
    );
  }

  let apiUrl: URL;
  try {
    apiUrl = new URL(`${baseUrl.replace(/\/+$/, "")}/posts`);
  } catch {
    throw new Error("VITE_API_BASE_URL має містити коректну адресу бекенду.");
  }

  const response = await fetch(apiUrl, { signal });
  if (!response.ok) {
    throw new Error(`Помилка сервера: ${response.status} ${response.statusText}`);
  }

  const data: unknown = await response.json();
  if (!Array.isArray(data)) {
    throw new Error("Бекенд повернув дописи у неочікуваному форматі.");
  }

  const posts: unknown[] = data;
  if (!posts.every(isPost)) {
    throw new Error("Бекенд повернув дописи у неочікуваному форматі.");
  }

  return posts;
}
