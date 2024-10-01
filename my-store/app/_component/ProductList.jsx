import React from 'react'
import ProductItem from './ProductItem'

  

function ProductList({productList}) {
  return (
    <div className='mt-10'>
        <h2 className='text-green-600 font-bold text-2xl gap-5'>เมนูแนะนำ</h2>
        <div className='grid grdid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mt-10'>
            {productList.map((product,index)=>index<8&&(
                <ProductItem product={product}/>
            ))}
        </div>
    </div>
    

  )
}

export default ProductList