import type { Todo } from "./Todo";

export interface TodoList {
  id: number;
  title: string;
  todos: Todo[];
}
