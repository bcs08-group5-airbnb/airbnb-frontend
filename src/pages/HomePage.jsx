import { useEffect, useState } from "react";
import Footer from "../components/Footer";
import FooterFixed from "../components/FooterFixed";
import Header from "../components/Header";
import { httpsNoLoading } from "../api/config";
import { Card } from "antd";
import Meta from "antd/es/card/Meta";

const anywherePlaces = [
  {
    name: "Toàn bộ nhà",
    url: "https://rawn-airbnb.vercel.app/_next/image?url=https%3A%2F%2Fres.cloudinary.com%2Frawn%2Fimage%2Fupload%2Ff_webp%2Fq_auto%3Abest%2Fv1628329222%2Fmjwqhra4wbzlvoo2pe27.jpg&w=1920&q=75",
  },
  {
    name: "Chỗ ở độc đáo",
    url: "https://rawn-airbnb.vercel.app/_next/image?url=https%3A%2F%2Fres.cloudinary.com%2Frawn%2Fimage%2Fupload%2Ff_webp%2Fq_auto%3Abest%2Fv1628329186%2Ffmoml05qcd0yk2stvl9r.jpg&w=1920&q=75",
  },
  {
    name: "Trang trại và thiên nhiên",
    url: "https://rawn-airbnb.vercel.app/_next/image?url=https%3A%2F%2Fres.cloudinary.com%2Frawn%2Fimage%2Fupload%2Ff_webp%2Fq_auto%3Abest%2Fv1628329121%2Fguagj5r2bkccgr1paez3.jpg&w=1920&q=75",
  },
  {
    name: "Cho phép mang theo thú cưng",
    url: "https://rawn-airbnb.vercel.app/_next/image?url=https%3A%2F%2Fres.cloudinary.com%2Frawn%2Fimage%2Fupload%2Ff_webp%2Fq_auto%3Abest%2Fv1628329252%2Fgqhtg9ua6jdrffhbrfv1.jpg&w=1920&q=75",
  },
];

export default function HomePage() {
  const [cities, setCities] = useState(null);
  useEffect(() => {
    httpsNoLoading
      .get("vi-tri/phan-trang-tim-kiem?pageIndex=1&pageSize=8")
      .then(res => {
        setCities([...res.data.content.data]);
      })
      .catch(err => {
        console.error(err);
      });
  }, []);
  return (
    <>
      <Header />
      <div className='bg-black px-24 pt-16'>
        <img alt='' src='https://airbnb-app.vercel.app/Images/banner_airbnb.webp' />
        <p className='text-center text-white font-bold text-3xl py-12'>Nhờ có Host, mọi điều đều có thể</p>
      </div>
      <div className='w-[95%] mx-auto py-6 space-y-12'>
        {cities !== null ? (
          <div>
            <h1 className='font-bold text-3xl mb-3'>Khám phá điểm đến gần đây</h1>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
              {cities.map((item, index) => {
                return (
                  <Card
                    key={index}
                    hoverable
                    className='w-full flex items-center cursor-pointer hover:bg-gray-100 hover:scale-105 transition duration-300 ease-in-out'
                  >
                    <div className='flex items-center gap-3'>
                      <img className='w-12 h-12 rounded-lg' src={item.hinhAnh} alt='' />
                      <div>
                        <h2 className='font-bold'>{item.tinhThanh}</h2>
                        <p className='text-gray-700 text-sm'>15 phút lái xe</p>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>
        ) : (
          <></>
        )}
        <div className='space-y-3'>
          <h1 className='font-bold text-3xl'>Ở bất cứ đâu</h1>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-9'>
            {anywherePlaces.map((item, index) => {
              return (
                <Card key={index} hoverable className='w-full' cover={<img alt='' src={item.url} />}>
                  <Meta title={item.name} />
                </Card>
              );
            })}
          </div>
        </div>
      </div>
      <FooterFixed />
      <Footer />
    </>
  );
}
