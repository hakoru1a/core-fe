import { Property } from "../types/property.type";
import { PageReponse, SuccessResponse } from "../types/utils.type";
import http from "../utils/http";

const propertyApi = {
  registerProperty: (property: Property) =>
    http.post<SuccessResponse<Property>>("/api/properties/", property, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }),
  getProperies: (params: any) => {
    const stringParam = new URLSearchParams(params).toString();
    return http.get<SuccessResponse<PageReponse<Property>>>(
      `/api/properties/?${stringParam}`
    );
  },

  getMyProperies: (id: string) =>
    http.get<SuccessResponse<Property[]>>(`/api/properties/my-property/${id}/`),
  getPropertyById: (id: any) => {
    console.log("inapi", id);
    return http.get<SuccessResponse<Property>>(`/api/properties/${id}/`);
  },
  updateProperty: (property: Property) =>
    http.put<SuccessResponse<Property>>(
      `/api/properties/${property.id}/`,
      property
    ),
};
export default propertyApi;
