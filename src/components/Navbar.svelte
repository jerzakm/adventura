<div class="navbar-container">
    <div class="navbar">
        <span class="logo">S</span>
        <div>
            <User let:user let:auth>
                {user.displayName? user.displayName : 'Anonymous'}
                <button on:click={() => auth.signOut()}>Sign Out</button>

                <div slot="signed-out">
                    <button on:click={() => auth.signInAnonymously()} class="button">
                        A
                    </button>
                    <button on:click={handleGoogleLogin} class="button">
                        G
                    </button>
                </div>
            </User>
        </div>
    </div>
    <div class="subbar">
        <h3>test</h3>
    </div>
</div>
<style lang="scss">
    .navbar-container {
        width:100%;
        display:flex;
        flex-direction: column;
    }
    .button {
        border: 0;
        border-radius: 0.25rem;
        font-size: 1.2rem;
        text-decoration: none;
        margin: 0.25rem;
        cursor: pointer;
        background: white;
    }
    .navbar {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-items: center;
        justify-content: space-between;
        /* padding: 1em; */
        z-index: 1;
        flex-basis: 1;
        width:100%;
        background-color: #1f1f1ffa;
    }
    .subbar{
        background-color: #1f1f1fe1;
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