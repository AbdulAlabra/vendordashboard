import * as Realm from 'realm-web';

const appId = process.env.REACT_APP_REALM;
const config = {
  id: appId
};

const app = new Realm.App(config);

export default app;
