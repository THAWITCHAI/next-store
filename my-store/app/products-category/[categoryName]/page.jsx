import ProductList from '@/app/_component/ProductList'
import GlobalApi from '@/app/_utils/GlobalApi'
import React from 'react'

 async function ProdutCatgory ({params}){

    const productList = await GlobalApi.getProductByCategory(params?.categoryName)
    // const id = params.categoryName
    return (
    
        <div className='p-5 md:p-10'>
            <ProductList productList= {productList}/>
        </div> 
    ) 
}

export default ProdutCatgory