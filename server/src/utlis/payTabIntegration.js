import paytabs from 'paytabs_pt2';

let profileID = process.env.PAYTAB_PROFILE_ID,
  serverKey = process.env.PAYTAB_SERVER_KEY,
  region = "Pakistan";

paytabs.setConfig( profileID, serverKey, region);
      