export interface RestaurantEntity {
  id?: string;
  name?: string;
  phone_number?: string;
  created_at?: string;
  updated_at?: string;
  users?: IRestaurantUser[];
  roles?: IRole[]
}

interface IRestaurantUser {
  id?: string;
  name: string
}

interface IRole {
  id?: string;
  name: string
}

export type FilterType = "name" | "phone_number";
