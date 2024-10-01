import ProductList from '@/app/_component/ProductList'
import GlobalApi from '@/app/_utils/GlobalApi'
import React from 'react'

 async function ProdutCatgory ({params}){

    const prodctList = await GlobalApi.getProductByCategory(params?.categoryName)
    // const id = params.categoryName

    return (
    
        <div className='p-5 md:p-10'>
            <ProdutCatgory productList= {prodctList}/>
        </div> 
    ) 
}

export default ProdutCatgory