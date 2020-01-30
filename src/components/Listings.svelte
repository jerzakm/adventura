<script>
    import { visibleMarkers } from '../stores.js';

    export let listings;

    $: update(listings)

    function update(listings) {
        if(listings){
            visibleMarkers.set(listings);
        } else {
            visibleMarkers.set([]);
        }
	}
</script>

{#if !listings.length}
    No listings yet..
{/if}

{#each listings as listing}
    <p>
        {listing.location}
        <button on:click={() => listing.ref.delete()}>Delete</button>
    </p>
{/each}