<script>
    import {onMount} from 'svelte'
    import mapboxgl from 'mapbox-gl';

    onMount(()=> {
        mapboxgl.accessToken = '';
        const map = new mapboxgl.Map({
            container: 'mapbox',
            style: 'mapbox://styles/mapbox/streets-v9'
        });
    })
</script>

<style>
    #mapbox {
        position:fixed;
    }
</style>

<div id="mapbox"></div>