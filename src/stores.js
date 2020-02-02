import {
  writable
} from 'svelte/store';

export const visibleMarkers = writable([]);


export const currentMarkerLocation = writable([])