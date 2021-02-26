import { Route, Switch } from "react-router-dom";

import About from "../About";
import Contact from "../Contact";
import CustomersList from "../Customers/CustomersList";
import CustomerCreate from "../Customers/CustomerCreate";
import CustomerUpdate from "../Customers/CustomerUpdate";
import CategoriesList from "../Categories/CategoriesList";
import CategoriesCreate from "../Categories/CategoriesCreate";
import CategoriesUpdate from "../Categories/CategoriesUpdate";
import ProductsList from "../Products/ProductsList";
import ProductsCreate from "../Products/ProductsCreate";
import ProductsUpdate from "../Products/ProductsUpdate";
import BrandsList from "../Brands/BrandsList";
import BrandsCreate from "../Brands/BrandsCreate";
import BrandsUpdate from "../Brands/BrandsUpdate";

const RoutesComponent = () => {
   return (
      <Switch>
         {/* Customer routes */}
         <Route exact path="/">
            <CustomersList />
         </Route>
         <Route exact path="/create">
            <CustomerCreate />
         </Route>
         <Route exact path="/update/:id" component={CustomerUpdate} />

         {/* Categories routes */}
         <Route exact path="/categories/">
            <CategoriesList />
         </Route>
         <Route exact path="/categories/create">
            <CategoriesCreate />
         </Route>
         <Route
            exact
            path="/categories/update/:id"
            component={CategoriesUpdate}
         />

         {/* Products Routes */}
         <Route exact path="/products/">
            <ProductsList />
         </Route>

         <Route exact path="/products/create">
            <ProductsCreate />
         </Route>

         <Route exact path="/products/update/:id" component={ProductsUpdate} />

         {/* Brands Routes */}
         <Route exact path="/brands/">
            <BrandsList />
         </Route>

         <Route exact path="/brands/create">
            <BrandsCreate />
         </Route>
         <Route exact path="/brands/update/:id" component={BrandsUpdate} />

         {/* BASIC ROUTES */}
         <Route exact path="/about">
            <About />
         </Route>

         <Route exact path="/contact">
            <Contact />
         </Route>
      </Switch>
   );
};

export default RoutesComponent;
