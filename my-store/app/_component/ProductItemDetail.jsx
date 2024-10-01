"use client"
import { Button } from '@/components/ui/button'
import { ShoppingBag, ShoppingBasket } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { useState, useContext } from 'react'
import GlobalApi from '../_utils/GlobalApi'
import { toast } from 'sonner'
import { UpdateCartContext } from '../_context/UpdateCartContext'

function ProductItemDetail({ product }) {

    const jwt = sessionStorage.getItem('jwt')
    const router = useRouter()
    const user = JSON.parse(sessionStorage.getItem('user'))
    const { updateCart, setUpdateCart } = useContext(UpdateCartContext)

    const [productTotalPrice, setproductTotalPrice] = useState(
        product.attributes.sellingPrice ?
            product.attributes.sellingPrice :
            product.attributes.mrp
    )

    const [quantity, setQuantity] = useState(1);

    const addToCart = () => {
        if (jwt) {
            router.push('/sign-in')
            return
        }
        const data = {
            data: {
                quantity: quantity,
                amount: (quantity * productTotalPrice).toFixed(2),
                product: product.id,
                users_parmissions_users: user.id,
                userId: user.id,
            }
        }

        GlobalApi.addToCart(data, jwt).then(resp => { }, (e) => {
            toast('เพิ่มตระกล้าสินค้าสำเร็จ')
            setUpdateCart(!updateCart)
        }, (e) => {
            toast('ไม่สามารถเพิ่มสินค้าลงตระกล้า')
        })
    }

    return (
        <div className='grid grid-cols-1 md:grid-cols-2 p-7 bg-white text-black'>
            <Image src={process.env.NEXT_PUBLIC_BACKEND_BASE_URL + product.attributes.images.data[0].attributes.url}
                width={300}
                height={300}
                alt='image'
                className='p-5 h-[320px] w-[300px] object-contain rounded-lg'
            />
            <div className='flex flex-col gap-3'>
                <h2 className='text-2xl font-bold'>{product.attributes.name}</h2>
                <h2 className='text-sm  text-gray-500'>{product.attributes.description}</h2>

                <div className='flex gap-3'>
                    {product.attributes.sellingPrice && <h2 className='font-bold text-3xl'>{product.attributes.sellingPrice} บาท</h2>}
                    <h2 className={`font-bold text-3xl ${product.attributes.sellingPrice && ' line-through text-gray-500'}`}>
                        {product.attributes.mrp} บาท
                    </h2>
                </div>

                <h2 className='font-medium text-lg mt-6'>ปริมาณ ({product.attributes.itemQuqntityType}) </h2>

                <div className='flex flex-col items-baseline gap-3'>
                    <div className='p-2 border flex gap-10 items-center px-5'>
                        <button disabled={quantity == 1} onClick={() => setQuantity(quantity - 1)}>-</button>
                        <h2>{quantity}</h2>
                        <button onClick={() => setQuantity(quantity + 1)}>+</button>
                    </div>

                    <h2 className='text-5xl font-bold'> {(quantity * productTotalPrice).toFixed(2)} บาท </h2>

                    <Button className="flex gap-7" onClick={() => addToCart()}>
                        <ShoppingBag />
                        เพิ่มสินค้า
                    </Button>

                </div>


            </div>



        </div>
    )
}

export default ProductItemDetail