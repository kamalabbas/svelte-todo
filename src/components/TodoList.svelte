<script lang="ts">
  import TodoItem from "./TodoItem.svelte";
  import { flip } from "svelte/animate";
  import { dragStart, drop } from "../services/dragAndDrop";
  import { scale } from "svelte/transition";

  export let todoLists;
  let hoveringOverBasket: string | null;
</script>

{#each todoLists as todoList (todoList.id)}
  <div
    class="border list-container"
    role="listitem"
    on:dragenter={(e) => {(hoveringOverBasket = todoList.title)}}
    on:dragleave={() => (hoveringOverBasket = null)}
    on:drop={(event) => {
      drop(event, todoList.title);
      hoveringOverBasket = null
    }}
    on:dragover={(e) => e.preventDefault()}
  >
    <h2 class="title">{todoList.title}</h2>

    {#each todoList.todos as todo (todo.id)}
      <div
        role="listitem"
        draggable={true}
        on:dragstart={(event) => dragStart(event, todoList.id, todo.id)}
        animate:flip={{ duration: 500 }}
      >
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
    background-color: #70af78;
    padding: 1rem;
    border-radius: 0.8rem;
  }
  .ss {
    z-index: -1;
  }
</style>
