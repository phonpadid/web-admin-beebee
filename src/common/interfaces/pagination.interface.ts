export interface IGPaginate<Entity> {
  page?: number;
  limit?: number;
  filter?: Entity;
}

export interface IGPaginated<Entity> {
  props: Entity[];
  total: number;
}
