import "./App.css";
import { Header } from "./components/Header";
import { PostList } from "./components/PostList";
import { posts } from "./data/posts";

function App() {
  return (
    <div className="app">
      <Header title="Фрукти" />

      <main className="products-section">
        <h2>Асортимент</h2>
        <PostList posts={posts} />
      </main>
    </div>
  );
}


export default App;
