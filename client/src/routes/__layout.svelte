<script>
  import '../tailwind.css';
  import '../app.css';
  import Nav from '../components/Nav.svelte'
</script>

<Nav />

<main>
  <div class="px-6">
    <slot></slot>
  </div>


</main>

<style>
</style>
