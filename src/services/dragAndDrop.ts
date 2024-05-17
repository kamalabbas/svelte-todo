import { todos } from "../Stores/TodoStore";
import { TodoState } from "../entities/enums/todoStatesEnum";

const {updateTodoState} = todos;

interface ItemData {
    todoListID: number;
    todoID: number;
}

export function dragStart(event: DragEvent, todoListID: number, todoID: number): void {
    // The data we want to make available when the element is dropped
    // is the index of the item being dragged and
    // the index of the todolist from which it is leaving.
    
    const data: ItemData = { todoListID, todoID };
    event.dataTransfer!.setData('text/plain', JSON.stringify(data));    
}

export function drop(event: DragEvent, newState: TodoState): void {
    
    event.preventDefault();
    const json: string = event.dataTransfer!.getData("text/plain");
    const data: ItemData = JSON.parse(json);

    const {todoListID, todoID} = data;
    
    // Add the item to the drop target todoList.
    updateTodoState(todoListID, todoID, newState);
    
}

