import { User } from "./author";

export interface Post {
  id: string;
  title: string;
  body: string;
  slug: string;
  author: User;
  comment: Comment[];
  featuredImage: Image;
  category: Category;
  createdAt: Date;
  updatedAt: Date;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
}

export interface Image {
  id: string;
  url: string;
}

export interface PropsPost {
  post: Post;
}
