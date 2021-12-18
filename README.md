# fb-token-bug

This repository's purpose is to provide a minimal reproduction pwa that demonstrates a firebase id token bug as noted [here](https://github.com/firebase/firebase-js-sdk/issues/5813). To trigger the bug, deploy the app, sign in, wait an hour, place the app offline, and reload the page. Reloading the app offline prior to one hour will keep you signed in. After the hour passes, the user will be force signed out due to an error being thrown in `getIdTokenResult()`.

## Project setup

```sh
yarn install
```

### Create a firebase project and user

1. Create a firebase project for web use.
2. Set up the email/password sign-in method
3. Add a user
4. Assign some custom claims to the user. You can use the [set_program_env_claims](.\firebase\set_program_env_claims.js) script for this purpose, if desired. You will need your firebase service account private key with the script. Two custom claims named 'program' and 'env' will be added to your user's id token.

```sh
node set_program_env_claims <project-id> <email-address> <program-id> <env>
```

### `env.local` file

The firebase project configuration secrets are stored in a file named `env.local`. Create this file at your project root and include these lines, substituting your own firebase config property values for the ones included below:

```sh
VUE_APP_FIREBASE_API_KEY=AIza....jha4
VUE_APP_FIREBASE_AUTH_DOMAIN=fb-token-bug.firebaseapp.com
VUE_APP_FIREBASE_PROJECT_ID=fb-token-bug
VUE_APP_FIREBASE_STORAGE_BUCKET=fb-token-bug.appspot.com
VUE_APP_FIREBASE_MESSAGING_SENDER_ID=89....49
VUE_APP_FIREBASE_APP_ID=1:89....49:web:da8....864
```

### Compiles and hot-reloads for development

```sh
yarn serve
```

### Compiles and minifies for production

```sh
yarn build
```

### Lints and fixes files

```sh
yarn lint
```
