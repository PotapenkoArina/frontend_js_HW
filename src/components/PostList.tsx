import type { Post } from "../types/post";
import { PostCard } from "./PostCard";

type PostListProps = {
    posts: Post[] 
}

export function PostList({posts}:PostListProps){
    return(
        <ul className="fruit-list">
            {posts.map((post)=>(
                <PostCard key={post.id} post={post}/>
            ))}
        </ul>
    )
}