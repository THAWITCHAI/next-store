"use client"
import { Button } from '@/components/ui/button'
import { CircleUserRoundIcon, LayoutGrid, Search, ShoppingBag } from 'lucide-react'
import Image from 'next/image'
import React, { useEffect, useState, useContext } from 'react'

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"


import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import GlobalApi from '../_utils/GlobalApi'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { UpdateCartContext } from '../_context/UpdateCartContext'
import CartItemList from './CartItemList'


function Header() {

  const [categorylist, setCategoryList] = useState([]);
  const isLogin = sessionStorage.getItem('jwt') ? true : false;

  const router = useRouter()
  const [totalCartItem, setTotalCartItem] = useState(0);
  const user = JSON.parse(sessionStorage.getItem('user'));
  const jwt = sessionStorage.getItem('jwt')
  const { updateCart, setUpdateCart } = useContext(UpdateCartContext)
  const [cartItemList, setCartItemList] = useState([])
  const [subtotal, setSubtotal] = useState(0)

  const onDeleteItem = (id) => {
    GlobalApi.deleteCartItem(id, jwt).then(resp => {
      toast('ลบสินค้าออกจากตระกล้าแล้ว')
      getCartItem()
    })
  }
  useEffect(() => {
    let total = 0
    cartItemList.forEach(element => {
      total = total + element.amount
    })
    setSubtotal(total.toFixed(2))
  }, [cartItemList])

  useEffect(() => {
    getCategoryList();
  }, [])

  useEffect(() => {
    getCartItem();
  }, [updateCart])

  const getCategoryList = () => {
    GlobalApi.getCategory().then(resp => {
      setCategoryList(resp.data.data)
    })
  }

  const onSignOut = () => {
    sessionStorage.clear()
    router.push('/sign-in')
    return
  }

  const getCartItem = async () => {
    if (jwt) {
      const cartItemList = await GlobalApi.getCartItem(user.id, jwt);
      setTotalCartItem(cartItemList?.length)
      setCartItemList(cartItemList)
    }
  }
  useEffect(() => {
    getCartItem()
  }, [])

  return (
    <div className='p-5 shadow-sm flex justify-between'>
      <div className='flex items-center gap-2' >
        <Image src='/logo.png' alt='logo' width={50} height={50} />

        <DropdownMenu>
          <DropdownMenuTrigger asChild>

            <h2 className='hidden md:flex gap-2 items-center border rounded-full p-2 px-10 bg-slate-200'><LayoutGrid className='h-5 w-5' />ประเภทสินค้า</h2>

          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>เลือกประเภทอาหาร</DropdownMenuLabel>
            <DropdownMenuSeparator />

            {categorylist.map((category, index) => (
              <DropdownMenuItem className='flex gap-4 items-center cursor-pointer hover:scale-110 transition-all ease-in-out'>
                <Image src={
                  process.env.NEXT_PUBLIC_BACKEND_BASE_URL +
                  category?.attributes?.icon?.data[0]?.attributes?.url}
                  unoptimized={true}
                  alt='icon'
                  width={30}
                  height={30} />
                <h2 className='text-lg'>{category?.attributes?.Name}</h2>
              </DropdownMenuItem>
            ))}

          </DropdownMenuContent>
        </DropdownMenu>

      </div>
      <div className='flex gap-5 items-center'>


        <Sheet>
          <SheetTrigger>
            <h2 className='flex gap-2 items-center text-lg'>
              <ShoppingBag className='h-7 w-7' />
              <span className='bg-primary text-white px-2 rounded-full'>
                {totalCartItems}
              </span>
            </h2>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>ตระกล้าสินค้า</SheetTitle>
              <SheetDescription>
                <CartItemList cartitemList={cartItemList} />
              </SheetDescription>
            </SheetHeader>
            <SheetClose>

              <div className='absolute w-[90%] bottom-6 flex flex-col'>
                <h2 className="text-lg font-bold flex justify-between">ราคารวม
                  <span>{subtotal} บาท</span>
                </h2>
                <Button disabled={() => router.push(jwt ? '/checkout' : '/sign-in')}>ชำระเงิน</Button>
              </div>
            </SheetClose>
          </SheetContent>
        </Sheet>


        {!isLogin ? <Link href="/sign-in">
          <Button>Login</Button>
        </Link> :
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <CircleUserRoundIcon className='h-12 w-12 p-2 rounded-full bg-green-100 text-primary' />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>บัญชีของฉัน</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>ข้อมูลผู้ใช้</DropdownMenuItem>
              <DropdownMenuItem>รายการสั่งของ</DropdownMenuItem>
              <DropdownMenuItem onClick={() => onSignOut()}>ออกจากระบบ</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

        }
      </div>
    </div>
  )
}

export default Header
