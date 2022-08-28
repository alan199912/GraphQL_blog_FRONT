import { Author } from "./author";
import { Post } from "./post";

export interface Comment {
  id: string;
  comment: string;
  user: Author;
  post: Post[];
  createdAt: string;
  updatedAt: string;
}
