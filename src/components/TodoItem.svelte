<script lang="ts">
  import type { Todo } from "../entities/interfaces/Todo";
  import { todos } from "../Stores/TodoStore";
  import { send, receive } from "../transitions/crossFade";
  import { TodoState } from "../entities/enums/todoStatesEnum";
  import { Button, Dropdown, DropdownItem } from "flowbite-svelte";
  import { DotsVerticalOutline, ChevronRightOutline, } from "flowbite-svelte-icons";
  import { Modal } from "flowbite-svelte";
  import { dragStart } from "../services/dragAndDrop";

  export let todo: Todo;
  export let todoListId: number;
  const todoState = Object.values(TodoState);

  // destruct store methods
  const { updateTodoState, removeTodo, updateTodo } = todos;

  let dropdownOpen: boolean = false;
  let stateDropDown: boolean = false;
  let defaultModal = false;
  let cloneTodo: Todo = { ...todo };

  const handleModalOpen = () => {
    cloneTodo = { ...todo };
    defaultModal = true;
  };
</script>

<div
  class="task-container"
  role="listitem"
  draggable={true}
  on:dragstart={(event) => dragStart(event, todoListId, todo.id)}
  in:receive={{ key: todo.id }}
  out:send={{ key: todo.id }}
>
  <button class="title-wrapper" on:click={handleModalOpen}>
    {todo.title}
  </button>
  <div class="description-wrapper">
    <div>
      <!-- delete button -->
      <button class="icon-button" aria-label="Remove">
        <svg fill="#fff" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Layer_1" x="0px" y="0px" width="16px" height="16px" viewBox="0 0 109.484 122.88" enable-background="new 0 0 109.484 122.88" xml:space="preserve" ><g ><path fill-rule="evenodd" clip-rule="evenodd"
              d="M2.347,9.633h38.297V3.76c0-2.068,1.689-3.76,3.76-3.76h21.144 c2.07,0,3.76,1.691,3.76,3.76v5.874h37.83c1.293,0,2.347,1.057,2.347,2.349v11.514H0V11.982C0,10.69,1.055,9.633,2.347,9.633 L2.347,9.633z M8.69,29.605h92.921c1.937,0,3.696,1.599,3.521,3.524l-7.864,86.229c-0.174,1.926-1.59,3.521-3.523,3.521h-77.3 c-1.934,0-3.352-1.592-3.524-3.521L5.166,33.129C4.994,31.197,6.751,29.605,8.69,29.605L8.69,29.605z M69.077,42.998h9.866v65.314 h-9.866V42.998L69.077,42.998z M30.072,42.998h9.867v65.314h-9.867V42.998L30.072,42.998z M49.572,42.998h9.869v65.314h-9.869 V42.998L49.572,42.998z"
            /></g
          ></svg
        >
      </button>
      <!-- delete confirmation popover -->
      <Dropdown bind:open={dropdownOpen} class="w-64 text-sm font-light p-4 bg-yellow">
        <p>Are you sure you want to Delete?</p>
        <div class="actions mt-2">
          <Button class="mr-2" on:click={() => removeTodo(todoListId, todo.id)}>Confirm</Button>
          <Button on:click={() => (dropdownOpen = false)}>Cancel</Button>
        </div>
      </Dropdown>
    </div>

    <!-- dropdown menu options  -->
    <div>
      <button><DotsVerticalOutline /></button>
      <Dropdown class="w-32">
        <DropdownItem on:click={handleModalOpen}>Edit</DropdownItem>
        <DropdownItem class="flex items-center justify-between">
            Move to  <ChevronRightOutline class="ms-2 dark:text-white" /></DropdownItem>
        <Dropdown bind:open={stateDropDown} class="w-32" placement="right-start">
          {#each todoState as state}
            {#if state != todo.state}
                <DropdownItem on:click={() => { stateDropDown = false; setTimeout(() => { updateTodoState(todoListId, todo.id, state); }, 100);}}>
                    {state}
                </DropdownItem>
            {/if}
          {/each}
        </Dropdown>
      </Dropdown>
    </div>
  </div>
</div>

<!-- Edit popup form -->
<Modal bind:open={defaultModal} outsideclose>
  <form class="flex flex-col gap-4 todo-edit-form">
    <input placeholder="Todo title" class="rounded-xl" bind:value={cloneTodo.title} type="text" />
    <textarea placeholder="Todo Description"
      bind:value={cloneTodo.description}
      class="rounded-xl"
      name="todoDescription"
    ></textarea>
    <div class="flex align-middle gap-4">
      <input placeholder="Start Date" bind:value={cloneTodo.startdate} class="rounded-xl" type="date" />
      <input placeholder="End Date" bind:value={cloneTodo.endDate} class="rounded-xl" type="date" />
    </div>
  </form>

  <svelte:fragment slot="footer">
    <Button on:click={() => updateTodo(todoListId, cloneTodo)}>Save</Button>
    <Button on:click={() => (defaultModal = false)}>Close</Button>
  </svelte:fragment>
</Modal>

<style>
  .task-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-radius: 1rem;
    position: relative;
    margin-bottom: 0.5rem;
    background-color: #6c6c6c;
    box-shadow: 2px 3px 6px rgba(0, 0, 0, 0.1);
    transition: filter 0.2s, opacity 0.2s;
    margin-top: 1rem;
    padding-right: 1rem;
    width: 100%;
  }

  .title-wrapper {
    flex-grow: 1;
    text-align: left;
    padding: 1rem;
  }
  .todo-edit-form {
    margin-top: 2.25rem;
  }
  .todo-edit-form input,
  .todo-edit-form textarea {
    background: none;
    color: white;
    padding: 0.8rem;
  }

  ::-webkit-calendar-picker-indicator {
    filter: invert(1);
  }

  .description-wrapper {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
</style>
