import { useEffect, useState } from "react";
import Footer from "../components/Footer";
import FooterFixed from "../components/FooterFixed";
import Header from "../components/Header";
import { httpsNoLoading } from "../api/config";

export default function HomePage() {
  const [cities, setCities] = useState(null);
  useEffect(() => {
    httpsNoLoading
      .get("vi-tri/phan-trang-tim-kiem?pageIndex=1&pageSize=8")
      .then(res => {
        console.log([...res.data.content.data]);
        setCities([...res.data.content.data]);
      })
      .catch(err => {
        console.error(err);
      });
  }, []);
  return (
    <>
      <Header />
      <div className='w-[95%] mx-auto py-6'>
        {cities !== null ? (
          <div>
            <h1 className='font-bold text-3xl mb-3'>Khám phá những điểm đến gần đây</h1>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
              {cities.map((item, index) => {
                return (
                  <div key={index} className='flex items-center gap-3'>
                    <img className='w-12 h-12 rounded-lg' src={item.hinhAnh} alt='' />
                    <div>
                      <h2 className='font-bold'>{item.tinhThanh}</h2>
                      <p>15 phút lái xe</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <></>
        )}
        <div className='mt-3'>
          <h1 className='font-bold text-3xl'>Ở bất cứ đâu</h1>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4'></div>
        </div>
      </div>
      <FooterFixed />
      <Footer />
    </>
  );
}
