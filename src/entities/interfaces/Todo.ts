import type { TodoState } from "../enums/todoStatesEnum";

export interface Todo {
  id: number;
  description: string;
  state: TodoState;
}
