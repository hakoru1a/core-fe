import { User } from "./user.type";

export interface Property {
  id: number;
  bath?: number;
  bed?: number;
  kitchen?: number;
  area?: number;
  propertyName: string;
  price?: number;
  garage?: number;
  isActive?: boolean;
  description?: string;
  address?: string;
  customer?: User;
  latitude?: string;
  longitude?: string;
  propertyType?: number;
  rentPeriod?: string | undefined;
  purpose?: string;
  slug?: string;
  aminities: {
    id: number;
    name: string;
  }[];
  media: Media[];
}

export interface Media {
  id?: number;
  mediaName?: string;
  mediaType?: string;
  url?: string;
}
export interface Location {
  city: string;
  district: string;
  street: string;
}
