import { BookingAppointment } from "../types/appointment";
import { SuccessResponse } from "../types/utils.type";
import http from "../utils/http";

const appointmentApi = {
  getMyAppointment: (id: string) =>
    http.get<SuccessResponse<BookingAppointment[]>>(`/api/appointments/${id}/`),
};

export default appointmentApi;
