<script>
  import { User, Collection } from "sveltefire";
  import Listings from "./Listings.svelte";
  import { currentMarkerLocation } from "../stores.js";

  let currentMarkerLocation_value;

  const unsubscribe = currentMarkerLocation.subscribe(value => {
    currentMarkerLocation_value = value;
  });

  $: update(currentMarkerLocation_value);

  function update(marker) {
    console.log(marker);
  }
</script>

<Collection
  path={`listings`}
  query={ref => ref.orderBy('createdAt')}
  let:data={listings}
  let:ref={listingsRef}
  log>
  <Listings {listings} />

  <User let:user let:auth>
    <!-- <button
      on:click={() => listingsRef.add({
          location: currentMarkerLoc,
          createdAt: Date.now(),
          owner: user.uid
        })}>
      Add Marker
    </button> -->
  </User>
</Collection>
