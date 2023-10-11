import { Property } from "../types/property.type";
import { SuccessResponse } from "../types/utils.type";
import http from "../utils/http";

const wishlistApi = {
  add: (customerId: number, propertyId: number) =>
    http.post<SuccessResponse<Property>>(
      `/api/wishlist/${propertyId}/${customerId}/`
    ),
  delete: (customerId: number, propertyId: number) =>
    http.delete<SuccessResponse<Property>>(
      `/api/wishlist/${propertyId}/${customerId}/`
    ),

  get: (customerId: number) =>
    http.get<SuccessResponse<Property[]>>(`/api/wishlist/${customerId}/`),
};

export default wishlistApi;
