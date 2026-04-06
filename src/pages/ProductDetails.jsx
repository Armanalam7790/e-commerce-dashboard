
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { axiosInstance } from '../config/axiosinstence'

const ProductDetails = () => {
  const { id } = useParams()
  const [productDetail, setproductDetail] = useState({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  let getsingleProductDetails = async () => {
    try {
      setLoading(true)
      let res = await axiosInstance(`products/${id}`)
      setproductDetail(res.data)
      setError(null)
    } catch (error) {
      console.log(error)
      setError('Failed to load product details')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (id) {
      getsingleProductDetails()
    }
  }, [id])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto mb-4"></div>
          <p className="text-lg text-gray-600">Loading product details...</p>
        </div>
      </div>
    )
  }

  if (error || !productDetail.id) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="text-6xl mb-4">😞</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Product not found</h1>
          <p className="text-gray-600 mb-8">{error || 'Product details unavailable'}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <ol className="flex items-center text-sm text-gray-500">
            <li><a href="/" className="hover:text-green-600">Home</a></li>
            <li className="mx-2">/</li>
            <li className="text-green-600 font-medium">{productDetail.title}</li>
          </ol>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Product Images */}
          <div className="space-y-4">
            <img
              src={productDetail.images?.[0] || productDetail.thumbnail}
              alt={productDetail.title}
              className="w-full h-96 object-cover rounded-lg shadow-xl"
            />
            {productDetail.images && productDetail.images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-2">
                {productDetail.images.slice(1).map((img, idx) => (
                  <img
                    key={idx}
                    src={img}
                    alt={`${productDetail.title} ${idx + 2}`}
                    className="w-20 h-20 object-cover rounded cursor-pointer hover:ring-2 hover:ring-green-500 transition-all"
                  />
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {productDetail.title}
              </h1>
              <div className="flex items-center gap-2 mb-4">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className={`text-lg ${i < Math.floor(productDetail.rating) ? 'fill-current' : ''}`}>
                      ⭐
                    </span>
                  ))}
                </div>
                <span className="text-gray-600">({productDetail.rating?.toFixed(1)})</span>
              </div>
            </div>

            <div className="space-y-3">
              <div className="text-3xl font-bold text-green-600">
                ${productDetail.price}
                {productDetail.discountPercentage && (
                  <span className="text-lg text-gray-500 line-through ml-2">
                    ${(productDetail.price * (1 + productDetail.discountPercentage / 100)).toFixed(2)}
                  </span>
                )}
              </div>
              
              <div className="flex items-center gap-4 text-sm">
                <span className={`px-3 py-1 rounded-full font-medium ${
                  productDetail.availabilityStatus === 'In Stock'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-red-100 text-red-800'
                }`}>
                  {productDetail.availabilityStatus}
                </span>
                <span>{productDetail.stock} in stock</span>
              </div>
            </div>

            <div className="p-6 bg-blue-50 rounded-lg border border-blue-200">
              <h3 className="font-semibold text-gray-900 mb-3">Quick Info</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div><span className="font-medium">Brand:</span> {productDetail.brand}</div>
                <div><span className="font-medium">Category:</span> {productDetail.category}</div>
                <div><span className="font-medium">SKU:</span> {productDetail.sku}</div>
                <div><span className="font-medium">Weight:</span> {productDetail.weight}g</div>
              </div>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-3">Description</h3>
              <p className="text-gray-700 leading-relaxed">{productDetail.description}</p>
            </div>

            {/* Add to Cart Buttons - Same as ProductCart */}
            <div className="flex gap-3 pt-4 border-t">
              <button className="flex-1 bg-green-500 hover:bg-green-600 text-white font-semibold py-4 px-6 rounded-lg shadow-lg hover:shadow-xl transition-all text-lg">
                Add to Cart
              </button>
              <button className="px-6 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-4 rounded-lg shadow-md hover:shadow-lg transition-all">
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetails