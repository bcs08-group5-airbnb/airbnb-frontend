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
          console.log([...res.data.content]);
        })
        .catch(err => {
          console.error(err);
        });
    }
  }, [cityId]);
  if (phongThue === null) return <p>Cannot find city!</p>;
  const filter = ["Loại nơi ở", "Giá", "Đặt ngay", "Phòng và phòng ngủ", "Bộ lọc khác"];
  return (
    <>
      <Header />
      <div className='mx-auto w-[95%] grid grid-cols-1 lg:grid-cols-2'>
        <div className='py-12 space-y-3'>
          <p>Có {phongThue.length ?? 0} chỗ ở • 16 thg 4 - 14 thg 5 </p>
          <h1 className='font-bold text-3xl text-black'>Chỗ ở tại khu vực bản đồ đã chọn</h1>
          <div className='flex gap-3'>
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
                      <div className='absolute right-0 top-0'>2 trái tim</div>
                    </div>
                    <div className='w-[15%] bg-gray-300 h-[3px] rounded-lg my-2'></div>
                    <p className='text-gray-500 text-md truncate'>
                      {item.khach} khách {item.tenPhong.toLowerCase().includes("studio") ? "• Phòng studio" : ""} • {item.phongNgu} phòng ngủ •{" "}
                      {item.giuong} giường • {item.phongTam} phòng tắm
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
        <div>1</div>
      </div>
      <FooterFixed />
      <Footer />
    </>
  );
}
