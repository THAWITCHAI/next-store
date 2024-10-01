"use client"
import { Button } from '@/components/ui/button'
import { LayoutGrid, Search, ShoppingBag } from 'lucide-react'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import GlobalApi from '../_utils/GlobalApi'


function Header() {

  const[categorylist,setCategoryList]=useState([]);

  useEffect(()=>{
    getCategoryList();
  },[])

  const getCategoryList=()=>{
    GlobalApi.getCategory().then(resp=>{
      setCategoryList(resp.data.data)
    })
  }

  return (
    <div className='p-5 shadow-sm flex justify-between'>
      <div className='flex items-center gap-2' >
        <Image src='/logo.png' alt='logo' width={50} height ={50}/>
       
        <DropdownMenu>
        <DropdownMenuTrigger  asChild>

            <h2 className='hidden md:flex gap-2 items-center border rounded-full p-2 px-10 bg-slate-200'><LayoutGrid className='h-5 w-5'/>ประเภทสินค้า</h2>
       
        </DropdownMenuTrigger>
          <DropdownMenuContent>
              <DropdownMenuLabel>เลือกประเภทอาหาร</DropdownMenuLabel>
              <DropdownMenuSeparator />

              {categorylist.map((category,index)=>(
                  <DropdownMenuItem className='flex gap-4 items-center cursor-pointer hover:scale-110 transition-all ease-in-out'>
                       <Image src={
                                        process.env.NEXT_PUBLIC_BACKEND_BASE_URL+
                                        category?.attributes?.icon?.data[0]?.attributes?.url} 
                                        unoptimized={true} 
                                        alt='icon' 
                                        width={30} 
                                        height={30}/>
                        <h2 className='text-lg'>{category?.attributes?.Name}</h2>
                  </DropdownMenuItem>
              ))}

          </DropdownMenuContent>
        </DropdownMenu>

      </div>
      <div className='flex gap-5 items-center'>
        <h2 className='flex gap-2 items-center text-lg'><ShoppingBag/>0</h2>
        <Button>Login</Button>
      </div>
    </div>
  )
}

export default Header
