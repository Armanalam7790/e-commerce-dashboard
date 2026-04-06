import axios from "axios";
import React, { useEffect, useState } from "react";
import { getAllProducts } from "../api/productApis";
import { useLoaderData } from "react-router";
import ProductCart from "../components/ProductCart";

const Home = () => {
  console.log('home rendring');
  

 
  let products  = useLoaderData()
console.log(products);

  return (
    // <div className="grid grid-col-5 gap-6">
    <div className="grid min-h-full grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-10">
  {
    products.map((elem)=> {
      return <ProductCart key={elem.id} products={elem} />
    })
  }
</div>
  );
};

export default Home;
