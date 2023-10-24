import { Property } from "./property.type";
import { User } from "./user.type";

export interface Comment {
  id?: number;
  customer?: User;
  property?: Property | number;
  comment: string;
  createdAt?: string;
}
