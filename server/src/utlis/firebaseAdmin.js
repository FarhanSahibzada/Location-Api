import serviceAccountkey from '../../serviceaccountkey.json' assert {type: 'json'};
import admin from 'firebase-admin';


admin.initializeApp({
    credential: admin.credential.cert(serviceAccountkey)
});


export {
    admin
}