export interface Comment {
  id: string;
  content: string;
  anilibriaSlug: string;
  createdAt: Date;
  user: {
    avatar: string;
    name: string;
  };
}
