 import serviceAccountkey from '../serviceaccountkey.json'
 import admin from 'firebase-admin';


 admin.initializeApp({
    Credential : admin.credential.cert(serviceAccountkey)
})
 
 
export {
    admin
}