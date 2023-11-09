import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { httpsNoLoading } from "../api/config";
import Header from "../components/Header";
import Footer from "../components/Footer";
import FooterFixed from "../components/FooterFixed";
import convertToSlug from "../utils/convertToSlug";

export default function CityPage() {
  const [cityId, setCityId] = useState(null);
  const [phongThue, setPhongThue] = useState(null);
  const { cityName } = useParams();
  const [cityNoSlug, setCityNoSlug] = useState(null);
  useEffect(() => {
    httpsNoLoading
      .get("/vi-tri")
      .then(res => {
        const tempData = [...res.data.content];
        const data = tempData.filter(item => convertToSlug(item.tinhThanh) === cityName);
        setCityId(data[0].id);
        setCityNoSlug(data[0].tinhThanh);
      })
      .catch(err => {
        console.error(err);
      });
  }, [cityName]);
  useEffect(() => {
    if (cityId !== null) {
      httpsNoLoading
        .get(`/phong-thue/lay-phong-theo-vi-tri?maViTri=${cityId}`)
        .then(res => {
          setPhongThue([...res.data.content]);
        })
        .catch(err => {
          console.error(err);
        });
    }
  }, [cityId]);
  if (phongThue === null)
    return (
      <div className='flex w-screen h-screen justify-center items-center'>
        <img src='https://demo4.cybersoft.edu.vn/static/media/loading.385774bd589cf582d0f4.gif' alt='loading gif' />
      </div>
    );
  const filter = ["Loại nơi ở", "Giá", "Đặt ngay", "Phòng và phòng ngủ", "Bộ lọc khác"];
  return (
    <>
      <Header />
      <div className='mx-auto w-[95%] grid grid-cols-1 lg:flex flex-row gap-3'>
        <div className='py-12 space-y-3 h-auto lg:h-[600px] overscroll-y-auto overflow-y-auto px-3 basis-8/12'>
          <p>Có {phongThue.length ?? 0} chỗ ở • 16 thg 4 - 14 thg 5 </p>
          <h1 className='font-bold text-3xl text-black'>Chỗ ở tại khu vực bản đồ đã chọn</h1>
          <div className='flex flex-wrap gap-3'>
            {filter.map((item, index) => (
              <button
                className='rounded-lg text-md bg-white text-black border border-gray-300 hover:border-gray-900 duration-300 px-6 py-2'
                key={index}
              >
                {item}
              </button>
            ))}
          </div>
          <div className='space-y-6'>
            {phongThue.map((item, index) => (
              <div className='grid grid-cols-1 md:grid-cols-2 gap-3 py-6 border-t border-gray-300' key={index}>
                <div>
                  <img className='w-full h-52 object-cover rounded-lg' alt='' src={item.hinhAnh} />
                </div>
                <div className=''>
                  <div>
                    <div className='relative'>
                      <p className='text-gray-500 text-md'>Toàn bộ căn hộ dịch vụ tại {cityNoSlug}</p>
                      <p className='truncate text-xl'>{item.tenPhong}</p>
                      <div className='absolute right-0 top-0 cursor-pointer'>
                        <svg xmlns='http://www.w3.org/2000/svg' height='1em' viewBox='0 0 512 512'>
                          <path d='M225.8 468.2l-2.5-2.3L48.1 303.2C17.4 274.7 0 234.7 0 192.8v-3.3c0-70.4 50-130.8 119.2-144C158.6 37.9 198.9 47 231 69.6c9 6.4 17.4 13.8 25 22.3c4.2-4.8 8.7-9.2 13.5-13.3c3.7-3.2 7.5-6.2 11.5-9c0 0 0 0 0 0C313.1 47 353.4 37.9 392.8 45.4C462 58.6 512 119.1 512 189.5v3.3c0 41.9-17.4 81.9-48.1 110.4L288.7 465.9l-2.5 2.3c-8.2 7.6-19 11.9-30.2 11.9s-22-4.2-30.2-11.9zM239.1 145c-.4-.3-.7-.7-1-1.1l-17.8-20c0 0-.1-.1-.1-.1c0 0 0 0 0 0c-23.1-25.9-58-37.7-92-31.2C81.6 101.5 48 142.1 48 189.5v3.3c0 28.5 11.9 55.8 32.8 75.2L256 430.7 431.2 268c20.9-19.4 32.8-46.7 32.8-75.2v-3.3c0-47.3-33.6-88-80.1-96.9c-34-6.5-69 5.4-92 31.2c0 0 0 0-.1 .1s0 0-.1 .1l-17.8 20c-.3 .4-.7 .7-1 1.1c-4.5 4.5-10.6 7-16.9 7s-12.4-2.5-16.9-7z' />
                        </svg>
                      </div>
                    </div>
                    <div className='w-[15%] bg-gray-300 h-[3px] rounded-lg my-2'></div>
                    <p className='text-gray-500 text-md truncate'>
                      {item.khach} khách {item.tenPhong.toLowerCase().includes("studio") ? "• Phòng studio" : ""}
                      {item.phongNgu > 0 && " • " + item.phongNgu + " phòng ngủ"}
                      {item.giuong > 0 && " • " + item.phongNgu + " giường"}
                      {item.phongTam > 0 && " • " + item.phongNgu + " phòng tắm"}
                    </p>
                    <p className='text-gray-500 text-md truncate'>
                      {item.wifi ? "Wifi • " : ""}
                      {item.bep ? "Bếp • " : ""}
                      {item.dieuHoa ? "Điều hòa nhiệt độ • " : ""}
                      {item.mayGiat ? "Máy giặt • " : ""}
                      {item.tivi ? "Tivi • " : ""}
                      {item.doXe ? "Đỗ xe • " : ""}
                      {item.hoBoi ? "Hồ bơi" : ""}
                    </p>
                  </div>
                  <div className='text-right mt-12'>
                    <span className='font-bold'>${item.giaTien}</span> / tháng
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className='py-6 lg:py-0 basis-4/12'>
          <iframe
            src={`https://www.google.com/maps/embed/v1/place?q=${cityNoSlug}&key=${import.meta.env.VITE_MAP_API_KEY}`}
            width='100%'
            height='600px'
            allowfullscreen=''
            loading='lazy'
            referrerPolicy='no-referrer-when-downgrade'
          ></iframe>
        </div>
      </div>
      <FooterFixed />
      <Footer />
    </>
  );
}
