import { useEffect, useState } from "react";
import { https } from "../api/config";
import { useParams } from "react-router-dom";
import Spinner from "../components/Spinner";

export default function RoomDetailPage() {
  const { roomId } = useParams();
  const [room, setRoom] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const roomResponse = await https.get(`/phong-thue/${roomId}`);
        const cityResponse = await https.get(`/vi-tri/${roomResponse.data.content.maViTri}`);

        setRoom({
          ...roomResponse.data.content,
          tinhThanh: cityResponse.data.content.tinhThanh,
        });
      } catch (err) {
        setError("Đã xảy ra lỗi khi tìm nạp dữ liệu. Vui lòng thử lại sau.");
        console.error(err);
      }
    }

    fetchData();
  }, [roomId]);

  if (error) {
    return <div className='mx-auto w-[95%] py-6 h-[200px]'>Lỗi: {error}</div>;
  }

  if (!room) {
    return <Spinner />;
  }

  return (
    <div className='mx-auto w-[95%] py-6'>
      <h1 className='font-bold text-black text-3xl'>{room.tenPhong}</h1>
    </div>
  );
}
