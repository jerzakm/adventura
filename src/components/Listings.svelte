<script>
  import { visibleMarkers } from "../stores.js";

  export let listings;

  $: update(listings);

  function update(listings) {
    if (listings) {
      visibleMarkers.set(listings);
    } else {
      visibleMarkers.set([]);
    }
  }
</script>

<style>
  .listing-container {
    display: flex;
    flex-direction: column;
  }

  .listing {
    padding: 0.5em;
    border-style: solid;
    border-width: 1px;
    border-color: white;
  }
</style>

<div class="listing-container">
  {#if !listings.length}No results found.{/if}

  {#each listings as listing}
    <div class="listing">
      <h2>Lorem ipsum dolor sit amet.</h2>
      <p>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ullam vitae
        adipisci voluptate obcaecati consequuntur quo dolor distinctio,
        aspernatur animi ea.
      </p>
      {listing.location}
      <button on:click={() => listing.ref.delete()}>Delete</button>
    </div>
  {/each}
</div>
