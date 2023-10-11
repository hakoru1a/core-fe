import { Property } from "./property.type";

export interface BookingAppointment {
  property?: Property;
  appointmentDate: number;
  customer?: number;
  user?: {
    id: number;
  };
}
export interface BookingAppointmentRequest {
  property?: number;
  appointmentDate?: number;
  customer?: number;
  user?: {
    id: number;
  };
}
