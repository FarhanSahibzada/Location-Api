import paytabs from 'paytabs_pt2';

let profileID = process.env.PAYTAB_PROFILE_ID;
let serverKey = process.env.PAYTAB_SERVER_KEY;
let region = "GLOBAL"; 


paytabs.setConfig(profileID, serverKey, region);

export { paytabs };


