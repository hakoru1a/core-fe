import { BookingAppointmentRequest } from "../types/appointment";
import { Bill } from "../types/package.type";
import { SuccessResponse } from "../types/utils.type";
import http from "../utils/http";

const paymentApi = {
  createUrlByTurn: (bill: Bill) =>
    http.get<SuccessResponse<string>>(
      `/api/payment/create-url-turn/${bill.customerId}/?packageId=${bill.packageId}&quantity=${bill.quantity}`
    ),
  createUrlBooking: (booking: BookingAppointmentRequest) =>
    http.get<SuccessResponse<string>>(
      `/api/payment/create-url-booking/${booking.customer}/?appointmentDate=${booking.appointmentDate}&propertyId=${booking.property}`
    ),
  createPaymentForByTurn: (bill: Bill) =>
    http.post<SuccessResponse<Bill>>(`/api/payment/buy-turn/`, bill),
  createPaymentForBooking: (booking: BookingAppointmentRequest) =>
    http.post<SuccessResponse<Bill>>(`/api/payment/booking/`, booking),
};
export default paymentApi;
