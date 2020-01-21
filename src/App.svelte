<script>
  import { FirebaseApp, User, Doc, Collection } from "sveltefire";

  import Navbar from './components/Navbar.svelte'
  import Map from './components/Map.svelte'

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

</script>

<main>

  <!-- 1. 🔥 Firebase App -->
  <FirebaseApp {firebase}>

    <!-- 2. 😀 Get the current user -->
    <Map/>
    <Navbar user/>
    <User let:user let:auth>
      Hello <em>{user.uid}</em>

      <hr />
      <h2>Location</h2>
      {#if location}
        <span>{location.latitude} {location.longitude}</span>
      {/if}
      <button
          on:click={() => {
            navigator.geolocation.getCurrentPosition((loc)=> {
              location = loc.coords
            });
          }}>
          Current location
      </button>

      <!-- 3. 📜 Get a Firestore document owned by a user -->
      <Doc path={`posts/${user.uid}`} let:data={post} let:ref={postRef} log>

        <h2>{post.title}</h2>

        <p>
          Document
          created at <em>{new Date(post.createdAt).toLocaleString()}</em>
        </p>

        <span slot="loading">Loading post...</span>
        <span slot="fallback">
          <button
            on:click={() => postRef.set({
                title: '📜 I like Svelte',
                createdAt: Date.now()
              })}>
            Create Document
          </button>
        </span>

        <!-- 4. 💬 Get all the comments in its subcollection -->

        <h3>Comments</h3>
        <Collection
          path={postRef.collection('comments')}
          query={ref => ref.orderBy('createdAt')}
          let:data={comments}
          let:ref={commentsRef}
          log>

          {#if !comments.length}
              No comments yet...
          {/if}

          {#each comments as comment}
            <p>
              <!-- ID: <em>{comment.ref.id}</em> -->
            </p>
            <p>
              {comment.text}
              <button on:click={() => comment.ref.delete()}>Delete</button>
            </p>
          {/each}


          <button
            on:click={() => commentsRef.add({
                text: '💬 Me too!',
                createdAt: Date.now()
              })}>
            Add Comment
          </button>

          <span slot="loading">Loading comments...</span>

        </Collection>
      </Doc>
    </User>
  </FirebaseApp>

</main>


<!-- Styles -->
<style lang="scss">
  main {
    text-align: center;
    padding: 1em;
    max-width: 240px;
    margin: 0 auto;
  }

  h1,
  em {
    color: #ff3e00;
  }

  hr {
    height: 1px;
    border: none;
    background: rgb(195, 195, 195);
  }

  @media (min-width: 640px) {
    main {
      max-width: none;
    }
  }
</style>