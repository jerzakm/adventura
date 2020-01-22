<script>
    import {onMount} from 'svelte'
    import mapboxgl from 'mapbox-gl';

    let map;

    export let center;

    $: setMapCenter(center)

    function setMapCenter(){
        if(map&&center){
          console.log(map.getCenter())
          map.setCenter([center.longitude, center.latitude]);
          map.setZoom(12)
          console.log(map.getCenter())
        }
    }

    onMount(()=> {
        mapboxgl.accessToken = 'pk.eyJ1IjoiamVyemFrbSIsImEiOiJjangxaHF4MGcwN3ZqNGJubzl2Zzdva3N5In0.DRchXs3ESLUuoH9Kh_N-ow';
        map = new mapboxgl.Map({
            container: 'mapbox',
            style: 'mapbox://styles/mapbox/light-v10'
        })


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