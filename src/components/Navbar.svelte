<div class="navbar">
    <span class="logo">dFindr.app</span>

    <div>
        <User let:user let:auth>
            {user.displayName? user.displayName : 'Anonymous'}
            <button on:click={() => auth.signOut()}>Sign Out</button>

            <div slot="signed-out">
                <button on:click={() => auth.signInAnonymously()} class="button">
                    Sign In Anonymously
                </button>
                <button on:click={handleGoogleLogin} class="button">
                    Google
                </button>
            </div>
        </User>
    </div>
</div>

<style>
    .button {
        border: 0;
        border-radius: 0.25rem;
        /* background: #1E88E5; */
        font-size: 1.2rem;
        text-decoration: none;
        padding: 0.5rem 0.5rem;
        margin: 0.25rem;
        cursor: pointer;
        border-radius: 10px;
        background: white;
        box-shadow: 4px 4px 9px #b9b9b9,
            -4px -4px 9px #fbfbfb;
    }
    .navbar {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-items: center;
        justify-content: space-between;
        padding: 1em;
        z-index: 1;
    }

    .logo {
        font-size: 2em;
    }
</style>

<script>
    import { User } from "sveltefire";
    import firebase from "firebase/app";

    const auth = firebase.auth()
    const provider = new firebase.auth.GoogleAuthProvider();

    const handleGoogleLogin = () => {
      auth.signInWithPopup(provider).then(function(result) {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const token = result.credential.accessToken;
        const firebaseuser = result.user;
      }).catch(function(error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.email;
        const credential = error.credential;
      });
    };
</script>