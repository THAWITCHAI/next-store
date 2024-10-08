import { Button } from "@/components/ui/button";
import Image from "next/image";
import GlobalApi from "./_utils/GlobalApi";
import Slider from "./_component/Slider";
import ProductList from "./_component/ProductList";



export default async function Home() {

  const sliderList = await GlobalApi.getSliders();

  const productList =await GlobalApi.getAllProducts();

  return (
    
    <div className="p-5 md:p-10 px-16">
      <Slider sliderList ={sliderList}/>

      <ProductList productList={productList} />
    </div>
    
  );
}
