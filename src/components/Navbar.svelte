<div class="navbar">
    <span class="logo">dFindr.app</span>

    <div>
        <User let:user let:auth>
            {user.displayName? user.displayName : 'Anonymous'}
            <button on:click={() => auth.signOut()}>Sign Out</button>

            <div slot="signed-out">
                <button on:click={() => auth.signInAnonymously()}>
                    Sign In Anonymously
                </button>
                <button on:click={handleGoogleLogin}>
                    Google
                </button>
            </div>
        </User>
    </div>
</div>

<style>
    .navbar {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-items: center;
        justify-content: space-between;
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