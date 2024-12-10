import { authApi } from "@/services/api/main/Auth.api";
import { userApi } from "@/services/api/main/User.api";
import { listsApi } from "@/services/api/main/Lists.api";
import { commentsApi } from "@/services/api/main/Comments.api";

export const mainApi = {
  authApi,
  listsApi,
  userApi,
  commentsApi,
};
