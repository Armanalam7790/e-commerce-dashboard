import React, { useState } from 'react';
import { useNavigate } from 'react-router';

const ProductCart = ({ products}) => {
    // console.log(products);
    let navigate  = useNavigate()
    
  const [inCart, setInCart] = useState(false);

  const addToCart = () => {
    setInCart(true);
    // Yahan parent ko notify kar sakte hain: onAdd(id)
  };

  const removeFromCart = () => {
    setInCart(false);
    // Yahan parent ko notify kar sakte hain: onRemove(id)
  };

  return (
    <div onClick={()=>{
        navigate(`/dashboard/product/detail/${products.id}`)
    }} className="w-80 p-4 border border-gray-200 rounded-lg shadow-md bg-white hover:shadow-lg transition-shadow">
      <img 
        src={products.images[0]} 
        
        className="w-full h-48 object-cover rounded-md mb-4"
      />
      <h3 className="text-lg font-semibold mb-2 text-gray-900 line-clamp-2">{products.category}</h3>
      <p className="text-sm line-clamp-1 text-gray-500 mb-2">
        Category: {products.title}
      </p>
      <p className="text-xl font-bold text-green-600 mb-4">
        ${products.price}
      </p>
      
      <div className="flex gap-2">
        <button 
          onClick={addToCart}
          disabled={inCart}
          className={`flex-1 py-2.5 px-4 rounded-md font-semibold text-sm transition-all ${
            inCart 
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
              : 'bg-green-500 hover:bg-green-600 text-white shadow-md hover:shadow-lg'
          }`}
        >
          Add to Cart
        </button>
        <button 
          onClick={removeFromCart}
          disabled={!inCart}
          className={`flex-1 py-2.5 px-4 rounded-md font-semibold text-sm transition-all ${
            !inCart 
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
              : 'bg-red-500 hover:bg-red-600 text-white shadow-md hover:shadow-lg'
          }`}
        >
          Remove
        </button>
      </div>
    </div>
  );
};

export default ProductCart;