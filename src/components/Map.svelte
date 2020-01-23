<script>
    import {onMount} from 'svelte'
    import mapboxgl from 'mapbox-gl';

    let map;
    let marker;

    export let center

    $: setMapCenter(center)

    function setMapCenter(center){
        console.log('map update')
        if(map&&center){
          map.flyTo({
            center: [
                center[0],
                center[1]
            ],
            minZoom:7,
            zoom: 8,
            speed:0.39,
            essential: true // this animation is considered essential with respect to prefers-reduced-motion
          });

          marker.setLngLat(center)
        }
    }

    onMount(()=> {
        mapboxgl.accessToken = 'pk.eyJ1IjoiamVyemFrbSIsImEiOiJjangxaHF4MGcwN3ZqNGJubzl2Zzdva3N5In0.DRchXs3ESLUuoH9Kh_N-ow';
        map = new mapboxgl.Map({
            container: 'mapbox',
            style: 'mapbox://styles/mapbox/light-v10'
        })
        map.setZoom(4)
        map.setCenter([30,51])

        marker = new mapboxgl.Marker({
            draggable: true
        })
        .setLngLat([0, 0])
        .addTo(map);

    })
</script>

<style>
    #mapbox {
        position:fixed;
        height: 100vh;
        width: 100vw;
        top:0;
        left:0;
        z-index: -1;
    }
</style>

<div id="mapbox"></div>