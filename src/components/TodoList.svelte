<script lang="ts">
  import TodoItem from "./TodoItem.svelte";
  import { flip } from "svelte/animate";
  import { drop } from "../services/dragAndDrop";

  export let todoLists;
  let hoveringOverBasket: string | null;
</script>

{#each todoLists as todoList (todoList.id)}
  <div class="border list-container"
      role="listitem"
      on:dragenter={(e) => {(hoveringOverBasket = todoList.title)}}
      on:dragleave={() => (hoveringOverBasket = null)}
      on:drop={(event) => {
      drop(event, todoList.title);
      hoveringOverBasket = null
    }}
    on:dragover={(e) => e.preventDefault()}
  >
    <h2 class="title {todoList.title}">{todoList.title}</h2>

    {#each todoList.todos as todo (todo.id)}
      <div animate:flip={{ duration: 500 }}>
        <TodoItem {todo} todoListId={todoList.id} />
      </div>
    {/each}
  </div>
{/each}

<style>
  .list-container {
    transition: all 0.5s ease;
  }
  .border {
    border-radius: 1.5rem;
    padding: 1rem;
    background-color: #5f5f5f;
  }
  .title {
    pointer-events: none;
    /* background-color: #70af78; */
    padding: 1rem;
    border-radius: 0.8rem;
  }

  .title.Todo { background-color: #5a85b3; }
  .title.Pending { background-color: #e5b55e; }
  .title.Completed { background-color: #70af78; }
</style>
