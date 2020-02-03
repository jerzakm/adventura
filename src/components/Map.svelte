<script>
  import { onMount } from "svelte";
  import mapboxgl from "mapbox-gl";
  import Markers from "./Markers.svelte";

  import { currentMarkerLocation } from "../stores.js";

  let map;

  let marker;

  export let markerLoc = [15, 49];
  export let center;

  $: update(markerLoc);

  function update(markerLoc) {
    if (markerLoc) {
      currentMarkerLocation.set(markerLoc);
    } else {
      currentMarkerLocation.set([20, 50]);
    }
  }

  $: setMapCenter(center);

  function setMapCenter(center) {
    if (map && center) {
      map.flyTo({
        center: [center[0], center[1]],
        minZoom: 7,
        zoom: 8,
        speed: 0.39,
        essential: true //this animation is considered essential with respect to prefers-reduced-motion
      });

      marker.setLngLat(center);
    }
  }

  onMount(() => {
    mapboxgl.accessToken =
      "pk.eyJ1IjoiamVyemFrbSIsImEiOiJjangxaHF4MGcwN3ZqNGJubzl2Zzdva3N5In0.DRchXs3ESLUuoH9Kh_N-ow";
    map = new mapboxgl.Map({
      container: "mapbox",
      style: "mapbox://styles/jerzakm/ck65mpipg0v0h1inp3in1rmn9"
    });
    map.setZoom(4);
    map.setCenter([30, 51]);

    marker = new mapboxgl.Marker({
      draggable: true
    })
      .setLngLat(markerLoc)
      .addTo(map);

    function onDragEnd() {
      const lngLat = marker.getLngLat();
      markerLoc[0] = lngLat.lng;
      markerLoc[1] = lngLat.lat;
    }

    marker.on("drag", onDragEnd);

    map.on("styleimagemissing", e => {
      console.log(e);
      map.addImage("", e.style.imageManager.images.ship128.data);
    });
  });
</script>

<style>
  #mapbox {
    height: 100vh;
    width: 100vw;
    position: fixed;
    top: 0;
    left: 0;
  }
</style>

<div id="mapbox" />

<Markers {map} />
