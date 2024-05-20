<script>
  import "../app.css";
  import Header from "../components/Header.svelte";
  import "../assets/css/style.css";
</script>

<div>
  <Header></Header>

  <main class="container">
    <slot />
  </main>

  <!-- <footer> this is a footer</footer> -->
</div>
