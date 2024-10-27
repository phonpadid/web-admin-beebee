export interface IGPaginate<Entity> {
  page?: number;
  limit?: number;
  filter?: Entity;
  page_size?: number;
}

export interface IGPaginated<Entity> {
  props: Entity[];
  total: number;
}
