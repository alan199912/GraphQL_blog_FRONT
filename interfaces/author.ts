export interface User {
  id: string;
  username: string;
  email: string;
  bio: string;
  avatar: Avatar;
  displayName: string;
  createdAt: string;
  updatedAt: string;
}

export interface Avatar {
  id: string;
  url: string;
}
