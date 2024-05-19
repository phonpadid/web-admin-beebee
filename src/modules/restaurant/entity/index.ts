export interface RestaurantEntity {
  id?: string;
  name?: string;
  phone_number?: string;
  created_at?: string;
  updated_at?: string;
}

export type FilterType = "name" | "phone_number";
