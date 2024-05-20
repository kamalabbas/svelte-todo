import type { TodoState } from "../enums/todoStatesEnum";

export interface Todo {
  id: number;
  title: string;
  description?: string;
  state: TodoState;
  startdate?: Date;
  endDate?: Date 
}
