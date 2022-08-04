export interface IGetAll {
  name: string;
  size: string;
  page: string;
  sort: string;
}

export interface ICreate {
  name: string;
}

export interface IUpdate {
  id: number;
  name: string;
}
