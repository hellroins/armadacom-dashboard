import * as React from 'react';
import firebase from "firebase/compat/app";
import { Admin, Resource } from 'react-admin';
import {
  FirebaseDataProvider,
  FirebaseAuthProvider,
} from 'react-admin-firebase';

/* Firebase Config */
import { firebaseConfig } from './FIREBASE_CONFIG';

/* Login Page */
import LoginPage from './LoginPage';

/* Layout */
import MyLayout from './layout';

/* Language Control */
import { i18nProvider } from './i18nProvider';

/* Menu List CRUD */
import product_categories from "./components/categories";
import products from "./components/products";
// import { UserList, UserShow, UserCreate, UserEdit } from './users';

/* Monitor UPLOAD */
import EventMonitor from './EventMonitor';

/* Firebase Init */
const firebaseApp = firebase.initializeApp(firebaseConfig);

/* Authentification From Firebase (Login Control) */
const authProvider = FirebaseAuthProvider(firebaseConfig);

/* Provider Firebase */
const dataProvider = FirebaseDataProvider(firebaseConfig, {
  // logging: true,
  // rootRef: 'rootrefcollection/QQG2McwjR2Bohi9OwQzP',
  app: firebaseApp,
  // watch: ['posts'];
  // dontwatch: ['comments'];
  persistence: 'local',
  // disableMeta: true
  // dontAddIdFieldToDoc: true,
  lazyLoading: {
    enabled: false,
  },
  firestoreCostsLogger: {
    enabled: false,
  },
});

function App() {
  return (
    <>
      <Admin
        layout={MyLayout}
        loginPage={LoginPage}
        i18nProvider={i18nProvider}
        dataProvider={dataProvider}
        authProvider={authProvider}
      >
        {/* <Resource
          name="users"
          list={UserList}
          show={UserShow}
          create={UserCreate}
          edit={UserEdit}
        /> */}
        <Resource name="categories" {...product_categories} />
        <Resource name="products" {...products} />
      </Admin>
      <EventMonitor />
    </>
  );
}

export default App;
