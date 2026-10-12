import type { Post } from "../types/post";

type PostCardProps = {
    post: Post;
}

export function PostCard({ post }: PostCardProps) {
    return (
        <li className="fruit-item">
            <span className="fruit-name">{post.name}</span>
            <span className="fruit-price">{post.price} ₴ <small>/ кг</small></span>
        </li>
    );
}