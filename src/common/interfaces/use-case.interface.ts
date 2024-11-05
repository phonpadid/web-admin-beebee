export interface IUseCase {
  execute(input: any): Promise<any>;
}

export interface IGUseCase<Output, Input = undefined, Id = undefined> {
  execute(input?: Input, Id?: Id): Promise<Output | void>;
}
