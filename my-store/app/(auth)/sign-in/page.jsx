"use client";
import GlobalApi from "@/app/_utils/GlobalApi";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { React, useState,useEffect } from "react";
import { toast } from "sonner";

export default function Singln() {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const router = useRouter()

  useEffect(() => {
    const jwt = sessionStorage.getItem('jwt')
    if (jwt) {
      router.push('/')
      return
    }
  }, [])

  const Singln = () => {
    GlobalApi.SignIn(email, password)
      .then(resp => {
        sessionStorage.setItem('user', JSON.stringify(resp.data.user))
        sessionStorage.setItem('jwt', resp.data.jwt)
        toast('เข้าสู่ระบบเรียบร้อย')
        router.push('/')
      }, (e) => {
        toast('เข้าสู่ระบบเรียบร้อย')
      }
      )
  };

  return (
    <div className="flex items-baseline justify-center my-10">
      <div className="flex flex-col items-center justify-center p-10 bg-slate-100 border border-gray-200">
        <div>
          <Image src={"/logo.png"} width={100} height={100} alt="Logo" />
        </div>
        <h1 className="font-bold text-3xl">เข้าสู่ระบบ</h1>
        <h1 className="text-gray-500">ระบุอีเมล์และรหัสผ่านเพื่อเข้าสู่ระบบ</h1>
        <div className="w-full flex flex-col gap-5 mt-10">
          <Input
            placeholder={"ระบุอีเมล์"}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            type="password"
            placeholder={"ระบุรหัสผ่าน"}
            onChange={(e) => setPassword(e.target.value)}
          />

          <Button onClick={() => Singln()} disabled={!(email || password)}>
            เข้าสู่ระบบ
          </Button>
          <p>
            กรณีไม่เป็นสมาชิก
            <Link href="/create-account" className="text-blue-500">
              คลิ๊กเพื่อเข้าสมัครสามชิก
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
