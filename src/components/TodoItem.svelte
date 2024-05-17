<script lang="ts">
    import type { Todo } from '../entities/interfaces/Todo';
    import { todos } from "../Stores/TodoStore";
    import { send, receive } from '../transitions/crossFade';
    import { TodoState } from '../entities/enums/todoStatesEnum';

    export let todo: Todo;
    export let todoListId: number;
    const todoState = Object.values(TodoState);

    // desctruct store methods
    const {updateTodoState, removeTodo} = todos;
    // asign selected state to every todo item
    let selected: TodoState = todo.state;

</script>

<div class="task-container" in:receive={{key: todo.id}} out:send={{key: todo.id}}>
    <p>{todo.description}</p>
    <div class="description-wrapper">
        <!-- state list -->
        <select bind:value={selected} on:change={() => updateTodoState(todoListId, todo.id, selected)}>
            {#each todoState as state }
                <option value={state}>{state}</option>
            {/each}
        </select>
        
        <!-- delete button -->
        <button class="icon-button" on:click={() => removeTodo(todoListId, todo.id)} aria-label="Remove">
            <svg fill="#fff" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Layer_1" x="0px" y="0px" width="16px" height="16px" viewBox="0 0 109.484 122.88" enable-background="new 0 0 109.484 122.88" xml:space="preserve"><g><path fill-rule="evenodd" clip-rule="evenodd" d="M2.347,9.633h38.297V3.76c0-2.068,1.689-3.76,3.76-3.76h21.144 c2.07,0,3.76,1.691,3.76,3.76v5.874h37.83c1.293,0,2.347,1.057,2.347,2.349v11.514H0V11.982C0,10.69,1.055,9.633,2.347,9.633 L2.347,9.633z M8.69,29.605h92.921c1.937,0,3.696,1.599,3.521,3.524l-7.864,86.229c-0.174,1.926-1.59,3.521-3.523,3.521h-77.3 c-1.934,0-3.352-1.592-3.524-3.521L5.166,33.129C4.994,31.197,6.751,29.605,8.69,29.605L8.69,29.605z M69.077,42.998h9.866v65.314 h-9.866V42.998L69.077,42.998z M30.072,42.998h9.867v65.314h-9.867V42.998L30.072,42.998z M49.572,42.998h9.869v65.314h-9.869 V42.998L49.572,42.998z"/></g></svg>
        </button>
    </div>
</div>

<style>
    .task-container {
        display: flex; align-items: center; justify-content: space-between;
        border-radius: 0.5rem;
        position: relative;
        margin-bottom: 0.5rem;
        background-color: #6c6c6c;
        box-shadow: 2px 3px 6px rgba(0, 0, 0, 0.1);
        transition: filter 0.2s, opacity 0.2s;
        margin-top: 1rem;
        padding:  0.6rem;
    }

    .description-wrapper { display: flex; align-items: center; gap: 0.5rem; }

    select {
        padding: 0.5rem;
        border-radius: 0.5rem;
        background-color: #605e5e;
        color: #fff;
    }
</style>