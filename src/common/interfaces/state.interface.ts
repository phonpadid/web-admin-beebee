export interface IGState<Entity> {
  data: Entity;
  isLoading: boolean;
  btnLoading: boolean;
  error: any;
}
