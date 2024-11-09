import { User } from "@/types/entities/Auth.type";

export type PublicUser = Pick<User, "avatar" | "name">;
