<script>
  import { FirebaseApp, User, Doc, Collection } from "sveltefire";

  import Navbar from './components/Navbar.svelte'
  import Map from './components/Map.svelte'
  import Listings from './components/Listings.svelte'

  import firebase from "firebase/app";
  import "firebase/firestore";
  import "firebase/auth";
  import "firebase/performance";
  import "firebase/analytics";

  import {firebaseInit} from './firebase/core'

  firebaseInit()

  const auth = firebase.auth();

  let user;

  let location;
  let center;

  let currentMarkerLoc;

</script>

<main>
  <!-- 1. 🔥 Firebase App -->
  <FirebaseApp {firebase}>

    <!-- 2. 😀 Get the current user -->
  <div class="container">
    <div class="header"><Navbar user/></div>
    <div class="main">
      <div class="sidebar">
        <!-- {#if currentMarkerLoc}
          <h3>Marker location is {currentMarkerLoc[0].toFixed(4)} {currentMarkerLoc[1].toFixed(4)}</h3>
        {/if}
        <button
          on:click={() => {
            navigator.geolocation.getCurrentPosition((loc)=> {
              location = loc.coords
              center = [location.longitude, location.latitude]
              currentMarkerLoc = center
            });
          }}>
          Go to current location
        </button> -->
        <Collection
          path={`listings`}
          query={ref => ref.orderBy('createdAt')}
          let:data={listings}
          let:ref={listingsRef}
          log>
          <Listings listings={listings}/>

          <User let:user let:auth>
            <button
              on:click={() => listingsRef.add({
                  location: currentMarkerLoc,
                  createdAt: Date.now(),
                  owner: user.uid
                })}>
              Add Marker
            </button>
          </User>
        </Collection>
      </div>
      <div class="map">
        <Map center={center} bind:markerLoc={currentMarkerLoc}/>
      </div>
    </div>
  </div>

  </FirebaseApp>

</main>


<!-- Styles -->
<style lang="scss">
  main {

  }

  .container{
    display: flex;
    flex-direction: column;
    height: 100vh;

    .header{
      z-index: 5;
      display:flex;
    }
    .main {
      display:flex;
      flex-direction: row;

      .sidebar {
        z-index:10;
        // flex-grow: 1;
        flex-basis: 400px;
        margin: 1em;
        padding: 1em;
        background-color: #1f1f1fe1;
      }

      .map {
        flex-grow: 3;
      }
    }
  }
</style>