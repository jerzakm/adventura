<script>
    import {onMount} from 'svelte'
    import mapboxgl from 'mapbox-gl';

    let map;

    export let center

    $: setMapCenter(center)

    function setMapCenter(center){
        console.log('map update')
        if(map&&center){
        //   const goal = center? center : [0,0]
        //   const partial = [current[0]+(current[0]-goal[0])/100, goal[1]]
        //   current = partial
        //   console.log(`partial 0 ${partial}`)
        //   map.setCenter(partial);

          map.flyTo({
            center: [
                center[0] + (Math.random() - 0.5) * 4,
                center[1] + (Math.random() - 0.5) * 4
            ],
            minZoom:7,
            zoom: 8,
            speed:0.39,
            essential: true // this animation is considered essential with respect to prefers-reduced-motion
          });
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