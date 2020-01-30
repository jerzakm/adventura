<script>
    import { visibleMarkers } from '../stores.js';
    import mapboxgl from 'mapbox-gl'

    export let map;
    let visibleMarkers_value;

	const unsubscribe = visibleMarkers.subscribe(value => {
        visibleMarkers_value = value;
    });

    $: updateMarkers(map, visibleMarkers_value)

    const currentMarkers = []

    function updateMarkers() {
        if(map&&visibleMarkers_value){
            console.log(map)
            for(let i = 0; i< currentMarkers.length; i++) {
                currentMarkers[i].remove()
                currentMarkers.shift()
            }

            for(let i =0; i<visibleMarkers_value.length;i++){
                let popup = new mapboxgl.Popup({ offset: 25 }).setText(
                    'Test12313123123123123'
                );
                if(visibleMarkers_value.length>0){
                    // create DOM element for the marker
                    var el = document.createElement('div');
                    el.className = 'marker';

                    // create the marker
                    const m = new mapboxgl.Marker(el)
                        .setLngLat(visibleMarkers_value[i].location)
                        .setPopup(popup) // sets a popup on this marker
                        .addTo(map);
                    currentMarkers.push(m)
                }
            }
        }
    }
</script>

<style>

</style>