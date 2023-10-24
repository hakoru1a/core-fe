import { SuccessResponse } from "../types/utils.type";
import http from "../utils/http";

const commentApi = {
  addComment: (comment: Comment, id: number) =>
    http.post<SuccessResponse<Comment>>(`/api/comments/${id}/`, comment),
};

export default commentApi;
