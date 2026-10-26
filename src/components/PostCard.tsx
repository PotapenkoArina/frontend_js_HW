import type { Post } from "../types/post";

type PostCardProps = {
    post: Post;
}

export function PostCard({ post }: PostCardProps) {
    return (
        <li className="fruit-item">
            <span className="fruit-name">{post.name}</span>
            <p className="post-content">{post.content}</p>
            <span className="fruit-price">
                {post.category?.name || "Без категорії"}
            </span>
        </li>
    );
}