export interface Package {
  id?: number;
  times?: number;
  price?: number;
  packageName?: string;
}

export interface Bill {
  customerId?: number;
  quantity?: number;
  packageId?: number;
}
