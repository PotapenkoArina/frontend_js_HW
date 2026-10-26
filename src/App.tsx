import { useEffect, useState } from "react";
import "./App.css";
import { Header } from "./components/Header";
import { PostList } from "./components/PostList";
import { fetchPosts } from "./api/posts";
import type { Post } from "./types/post";

function App() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    fetchPosts(controller.signal)
      .then(setPosts)
      .catch((cause: unknown) => {
        if (!controller.signal.aborted) {
          setError(
            cause instanceof Error
              ? cause.message
              : "Не вдалося завантажити дописи.",
          );
        }
      })
      .finally(() => {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      });

    return () => controller.abort();
  }, []);

  return (
    <div className="app">
      <Header title="Публікації" />

      <main className="products-section">
        <h2>Останні дописи</h2>
        {isLoading && <p role="status">Завантаження дописів...</p>}
        {error && (
          <div role="alert">
            <p>{error}</p>
          </div>
        )}
        {!isLoading && !error && posts.length === 0 && (
          <p>Дописів поки немає.</p>
        )}
        {!isLoading && !error && posts.length > 0 && <PostList posts={posts} />}
      </main>
    </div>
  );
}

export default App;
