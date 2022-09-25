import React from "react";
import {Admin, Resource} from "react-admin";
import uploadCapableDataProvider from "./dataProvider";
import product_categories from "./components/product-categories";
import products from "./components/products";

function App() {
  return (
    <Admin dataProvider={uploadCapableDataProvider}>
      <Resource name="product-categories" {...product_categories}/>
      <Resource name="products" {...products} />
    </Admin>
  );
}

export default App;
