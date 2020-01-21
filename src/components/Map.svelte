<script>
    import {onMount} from 'svelte'
    import mapboxgl from 'mapbox-gl';

    onMount(()=> {
        mapboxgl.accessToken = 'pk.eyJ1IjoiamVyemFrbSIsImEiOiJjangxaHF4MGcwN3ZqNGJubzl2Zzdva3N5In0.DRchXs3ESLUuoH9Kh_N-ow';
        const map = new mapboxgl.Map({
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
        opacity: 0.3;
    }
</style>

<div id="mapbox"></div>