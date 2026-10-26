export type Category = {
    id: number;
    name: string;
};

export type Post = {
    id: number;
    name: string;
    content: string;
    authorId?: number;
    categoryId?: number;
    category?: Category | null;
};