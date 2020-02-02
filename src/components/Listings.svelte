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
    background-color: black;
  }
</style>

<div class="listing-container">
  {#if !listings.length}No results found.{/if}

  {#each listings as listing}
    <div class="listing">
      {listing.location}
      <button on:click={() => listing.ref.delete()}>Delete</button>
    </div>
  {/each}
</div>
