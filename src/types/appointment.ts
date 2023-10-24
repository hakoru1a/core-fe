import { Property } from "./property.type";
import { User } from "./user.type";

export interface BookingAppointment {
  property?: Property;
  appointmentDate: number;
  customer?: number;
}
export interface BookingAppointmentRequest {
  property?: number;
  appointmentDate?: number;
  customer?: number;
  user?: {
    id: number;
  };
}

export interface Apointment {
  customer: User;
  appointmentDate: number;
  property: Property;
}
