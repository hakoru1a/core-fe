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
  getDetailPropery: (id: number) => http.get(`/api/properties/${id}/`),
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
  uploadMedia: (media: File, propertyId: number) =>
    http.post(
      `/api/properties/upload-media/${propertyId}/`,
      { media },
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    ),
  uploadDocument: (document: File, propertyId: number) =>
    http.post(
      `/api/properties/upload-document/${propertyId}/`,
      { media: document },
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    ),
  deleteMedia: (id: number) =>
    http.delete<SuccessResponse<any>>(`/api/properties/delete-media/${id}/`),
  deleteDocument: (id: number) =>
    http.delete<SuccessResponse<any>>(`/api/properties/delete-document/${id}/`),
  deleteProperty: (id: number) =>
    http.delete<SuccessResponse<Property>>(
      `/api/properties/delete-document/${id}/`
    ),
};
export default propertyApi;
