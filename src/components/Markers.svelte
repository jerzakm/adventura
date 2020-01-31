<script>
    import { visibleMarkers } from '../stores.js';
    import mapboxgl from 'mapbox-gl'

    export let map;
    let visibleMarkers_value;

	const unsubscribe = visibleMarkers.subscribe(value => {
        visibleMarkers_value = value;
    });

    $: updateMarkers(visibleMarkers_value)

    let currentMarkers = []

    function updateMarkers(visibleMarkers_value) {
        if(map&&visibleMarkers_value){
            console.log(map)
            for(let i = 0; i< currentMarkers.length; i++) {
                currentMarkers[i].remove()
            }

            currentMarkers = []

            for(let i =0; i<visibleMarkers_value.length;i++){
                if(visibleMarkers_value.length>0){
                    let popup = new mapboxgl.Popup().setText(
                        'Test12313123123123123'
                    );
                    // create DOM element for the marker
                    const el = document.createElement('div');
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