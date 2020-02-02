<script>
  import { FirebaseApp, User, Doc, Collection } from "sveltefire";

  import Navbar from "./components/Navbar.svelte";
  import Map from "./components/Map.svelte";
  import Listings from "./components/Listings.svelte";
  import Mainbar from "./components/Mainbar.svelte";

  import firebase from "firebase/app";
  import "firebase/firestore";
  import "firebase/auth";
  import "firebase/performance";
  import "firebase/analytics";

  import { firebaseInit } from "./firebase/core";

  firebaseInit();

  const auth = firebase.auth();

  let user;

  let location;
  let center;
</script>

<style lang="scss">
  .container {
    display: flex;
    flex-direction: column;
    height: 100vh;

    .header {
      z-index: 5;
      display: flex;
    }
    .main {
      display: flex;
      flex-direction: row;

      .map {
        flex-grow: 3;
      }
    }
  }
</style>

<main>
  <!-- 1. 🔥 Firebase App -->
  <FirebaseApp {firebase}>

    <!-- 2. 😀 Get the current user -->
    <div class="container">
      <div class="header">
        <Navbar user />
      </div>
      <div class="main">
        <Mainbar />
        <div class="map">
          <Map {center} />
        </div>
      </div>
    </div>

  </FirebaseApp>

</main>

<!-- Styles -->
