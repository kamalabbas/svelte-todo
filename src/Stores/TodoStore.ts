import { writable } from "svelte/store";
import type { Todo } from '../entities/interfaces/Todo';
import type { TodoList } from "../entities/interfaces/TodoList";
import { TodoState } from "../entities/enums/todoStatesEnum";


function todoStore() {
    let uid = 0;
    let todoUid = 0;

    const todoLists: TodoList[] = Object.values(TodoState).map(el => {
        return {
            id: uid++,
            title: el,
            todos: []
        }
    });

    const {update, subscribe} = writable(todoLists);

    return {
        subscribe,
        addTodo: (todoListId: number, description: string) => {
            update($todoLists => {
                const updateTodoLists = $todoLists.map(todolist => {
                    if(todolist.id == todoListId) {
                        const todo: Todo = {
                            id: todoUid++,
                            description,
                            state: TodoState.TODO
                        };
                        return {...todolist, todos: [...todolist.todos, todo]};
                    }
                    return todolist;
                })
                return updateTodoLists;
            })
        },
        updateTodoState: (listId: number, todoId: number, newState: TodoState) => {
            update($todoLists => {
                let movedTodo: any;
                const updatedLists = $todoLists.map(todoList => {
                    if (todoList.id === listId) {
                        // Find and remove the todo from the current list
                        const todos = todoList.todos.filter(todo => {
                            if (todo.id === todoId) {
                                movedTodo = { ...todo, state: newState };
                                return false;
                            }
                            return true;
                        });
                        return { ...todoList, todos };
                    }
                    return todoList;
                });

                if (movedTodo) {
                    // Find the target list based on the new state and add the todo to it
                    return updatedLists.map(todoList => {
                        if (todoList.title === newState) {
                            return { ...todoList, todos: [...todoList.todos, movedTodo] };
                        }
                        return todoList;
                    });
                }

                return updatedLists;
            });
        },
        removeTodo: (listId: number, todoId: number) => {            
            update($todoLists => {
                const updatedLists = $todoLists.map(todoList => {
                    if (todoList.id === listId) {
                        return {
                            ...todoList,
                            todos: todoList.todos.filter(todo => todo.id !== todoId)
                        };
                    }
                    return todoList;
                });
                return updatedLists;
            });
        }
      
    }
}

export const todos = todoStore();