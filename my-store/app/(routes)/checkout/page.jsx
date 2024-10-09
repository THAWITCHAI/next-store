import GlobalApi from "@/app/_utils/GlobalApi";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function page() {
  const user = JSON.parse(sessionStorage.getItem("user"));
  const jwt = sessionStorage.getItem("jwt");
  const router = useRouter();
  const [totalCartItem, setTotalCartItem] = useState(0);
  const [cartItemList, setCartItemList] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [subtotal, setSubTotal] = useState(0);

  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [phone, setPhone] = useState();
  const [zip, setZip] = useState();
  const [address, setAddress] = useState();

  useEffect(() => {
    if (!jwt) {
      return router.push("/sign-in");
    }
    getCartItems();
  }, []);

  useEffect(() => {
    getCartItems();
  }, []);

  const getCartItems = async () => {
    if (jwt) {
      const cartItemList = await GlobalApi.getCartItem(user.id, jwt);
      setTotalCartItem(cartItemList?.length);
      setCartItemList(cartItemList);
    }
  };

  useEffect(() => {
    let total = 0;
    cartItemList.forEach((element) => {
      total = total + element.amount;
    });
    setTotalAmount((total + total * 0.07 + 100).toFixed(2));
    setSubTotal(total.toFixed(2));
  }, [cartItemList]);

  return (
    <div>
      <h2 className="p-3 bg-primary text-xl font-bold text-center text-white">
        ชำระเงิน
      </h2>
      <div className="p-5 px-5 md:px-10 grid grid-cols-1 md:grid-cols-3 py-8">
        <div className="md:col-span-2 mx-20">
          <h2>กรอกข้อมูลการชำระเงิน</h2>
          <div className="grid grid-cols-2 gap-10 mt-3">
            <Input
              onChange={(e) => setUsername(e.target.value)}
              placeholder="ชื่อ"
            />
            <Input
              onChange={(e) => setEmail(e.target.value)}
              placeholder="อีเมล์"
            />
          </div>
          <div className="grid grid-cols-2 gap-10 mt-3">
            <Input
              onChange={(e) => setPhone(e.target.value)}
              placeholder="เบอร์โทรศัพท์"
            />
            <Input
              onChange={(e) => setZip(e.target.value)}
              placeholder="รหัสไปรษณีย์"
            />
          </div>
          <div className=" mt-3">
            <Input
              onChange={(e) => setAddress(e.target.value)}
              placeholder="ที่อยู่"
            />
          </div>
        </div>
        <div className="mx-10 border">
          <h2 className="p-3 bg-gray-200 font-bold text-center">
            จำนวนสินค้าในตะกร้า({totalCartItem})
          </h2>
          <div className="p-4 flex flex-col gap-4">
            <h2 className="font-bold flex justify-between">
              ราคารวม : <span>{subtotal}</span>
            </h2>
            <hr></hr>
            <h2 className="flex justify-between">
              ค่าจัดส่ง : <span>100.00 บาท</span>
            </h2>
            <h2 className="flex justify-between">
              ภาษีมูลค่าเพิ่ม (7%) :{" "}
              <span>{(subtotal * 0.07).toFixed(2)} บาท</span>
            </h2>
            <hr></hr>
            <h2 className="font-bold flex justify-between">
              ราคาสุทธิ : <span>{totalAmount} บาท</span>
            </h2>
            <Button>
              <ArrowBigRight />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
