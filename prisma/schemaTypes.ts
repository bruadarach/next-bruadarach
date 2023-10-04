export interface Account {
  _id: string;
  userId: string;
  type: string;
  provider: string;
  providerAccountId: string;
  refresh_token?: string | null;
  access_token?: string | null;
  expires_at?: number | null;
  token_type?: string | null;
  scope?: string | null;
  id_token?: string | null;
  session_state?: string | null;
  user: User;
}

export interface Session {
  _id: string;
  sessionToken: string;
  userId: string;
  expires: Date;
  user: User;
}

export interface User {
  _id: string;
  name?: string | null;
  email: string;
  emailVerified?: Date | null;
  image?: string | null;
  accounts: Account[];
  sessions: Session[];
  posts: Post[];
  comments: Comment[];
}

export interface VerificationToken {
  // identifier: string;
  _id: string;
  token: string;
  expires: Date;
}

export interface Category {
  _id: string;
  slug: string;
  title: string;
  img: string | null;
  posts: Post[];
}

export interface Post {
  _id: string;
  createdAt: Date;
  updatedAt: Date;
  slug: string;
  title: string;
  desc: string;
  img?: string;
  views: number;
  catSlug: string;
  cat: Category;
  userEmail: string;
  user: User;
  comments: Comment[];
}

export interface CommentProps {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  desc: string;
  userEmail: string;
  user: User;
  postSlug: string;
  post: Post;
}
