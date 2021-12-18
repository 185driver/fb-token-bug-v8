// Usage:
// node set_program_env_claims <project-id> <email-address> <program-id> <env>

// TODO: Resolve this bug:
// https://stackoverflow.com/a/69959606/2580754
// https://github.com/firebase/firebase-admin-node/issues/1488
/* eslint-disable import/no-unresolved, import/extensions */
const { initializeApp, cert } = require('firebase-admin/app');
const { getAuth } = require('firebase-admin/auth');
/* eslint-enable import/no-unresolved, import/extensions */

const [,, keyFilename, emailAddress, programId, env] = process.argv;

if (process.argv.length < 6) {
  console.log('Error: Missing arguments.');

  console.log('Usage: node set_program_env_claims '
    + '<project-id> <email-address> <program-id> <env>');

  return;
}

// eslint-disable-next-line import/no-dynamic-require
const serviceAccount = require(`./service_account_keys/${keyFilename}.json`);
const projectId = serviceAccount.project_id;
const validEnvs = ['dev', 'prod', 'null'];
const validPrograms = ['kal', 'pap', 'null'];

initializeApp({
  credential: cert(serviceAccount),
  databaseURL: `https://${projectId}.firebaseio.com`,
});

function setProgramEnvCustomClaims(email) {
  return getAuth().getUserByEmail(email)
    .then((user) => {
      if (!validPrograms.includes(programId) || !validEnvs.includes(env)) {
        return `Invalid custom claim(s) used ('${programId}', '${env}').`;
      }

      if (user.customClaims?.program && user.customClaims?.env) {
        if (user.customClaims.program === programId
          && user.customClaims.env === env
        ) {
          return `Both custom claims for '${email}' already `
            + `set to '${programId}' and '${env}'.`;
        }

        if (programId === 'null' || env === 'null') {
          return getAuth()
            .setCustomUserClaims(user.uid, { program: null, env: null })
            .then(() => `Both custom claims for '${email}' `
              + 'successfully removed.')
            .catch((err) => `Error removing custom claims: ${err}`);
        }

        if (user.customClaims.program !== programId
          && user.customClaims.env === env
        ) {
          return getAuth()
            .setCustomUserClaims(user.uid, { program: programId, env })
            .then(() => `Program custom claim for '${email}' successfully `
              + `changed from '${user.customClaims.program}' `
              + `to '${programId}'.`)
            .catch((err) => `Error changing program custom claim: ${err}`);
        }

        if (user.customClaims.program === programId
          && user.customClaims.env !== env
        ) {
          return getAuth()
            .setCustomUserClaims(user.uid, { program: programId, env })
            .then(() => `Environment custom claim for '${email}' successfully `
              + `changed from '${user.customClaims.env}' `
              + `to '${env}'.`)
            .catch((err) => `Error changing environment custom claim: ${err}`);
        }
      }

      return getAuth()
        .setCustomUserClaims(user.uid, { program: programId, env })
        .then(() => `Both custom claims for '${email}' successfully set `
          + `to '${programId}' and '${env}'.`)
        .catch((err) => `Error setting custom claims: ${err}`);
    })
    .catch((err) => `Error fetching email address: ${err}`);
}

setProgramEnvCustomClaims(emailAddress)
  .then((result) => console.log(result))
  .finally(() => process.exit());
