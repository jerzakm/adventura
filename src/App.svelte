<script lang="typescript">
  import { FirebaseApp, User, Doc, Collection } from "sveltefire";

  import firebase from "firebase/app";
  import "firebase/firestore";
  import "firebase/auth";
  import "firebase/performance";
  import "firebase/analytics";

  import {firebaseInit} from './firebase/core'


  firebaseInit()

  const auth = firebase.auth();
  const provider = new firebase.auth.GoogleAuthProvider();

  let user: any;

  const handleGoogleLogin = () => {
      auth.signInWithPopup(provider).then(function(result) {
        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = result.credential.accessToken;
        // The signed-in user info.
        var firebaseuser = result.user;

        if(firebaseuser) {
            console.log(firebaseuser);
        }
        // ...
        console.log(result)
      }).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
      });
    };
</script>

<main>

  <!-- 1. 🔥 Firebase App -->
  <FirebaseApp {firebase}>

    <h1>App</h1>

    <p>
      <strong>PRO Tip:</strong>
      Open the browser console for development logging.
    </p>


    <!-- 2. 😀 Get the current user -->
    <User let:user let:auth>
      Howdy 😀! User
      <em>{user.uid}</em>

      <button on:click={() => auth.signOut()}>Sign Out</button>

      <div slot="signed-out">

        <button on:click={() => auth.signInAnonymously()}>
          Sign In Anonymously
        </button>
        <button on:click={handleGoogleLogin}>
          Google
        </button>
      </div>

      <hr />

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
<style>
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