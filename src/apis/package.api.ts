import { Package } from "../types/package.type";
import { PageReponse, SuccessResponse } from "../types/utils.type";
import http from "../utils/http";

const packageApi = {
  getPackages: () =>
    http.get<SuccessResponse<PageReponse<Package>>>("/api/packages/"),
};
export default packageApi;
