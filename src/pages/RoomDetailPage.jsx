import PropTypes from "prop-types";
import viVN from "antd/es/locale/vi_VN";
import { useEffect, useRef, useState } from "react";
import { https } from "../api/config";
import { Link, useParams } from "react-router-dom";
import Spinner from "../components/Spinner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAward, faHeart, faStar, faUpload } from "@fortawesome/free-solid-svg-icons";
import convertToSlug from "../utils/convertToSlug";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import { Avatar, Button, ConfigProvider, Form, Image, message } from "antd";
import { useSelector } from "react-redux";
import CommentSection from "../components/Comment";
import TextArea from "antd/es/input/TextArea";
import { Comment } from "@ant-design/compatible";
import { defaultNoAvatar } from "../constants/defaultValues";

const Editor = ({ onChange, onSubmit, submitting, value }) => (
  <>
    <Form.Item>
      <TextArea
        rows={4}
        onChange={onChange}
        value={value}
        style={{
          resize: "none",
        }}
        placeholder='Viết đánh giá...'
      />
    </Form.Item>
    <Form.Item>
      <Button disabled={!value} htmlType='submit' loading={submitting} onClick={onSubmit} type='primary'>
        Thêm bình luận
      </Button>
    </Form.Item>
  </>
);

export default function RoomDetailPage() {
  const binhLuanRef = useRef(null);
  const { roomId } = useParams();
  const [room, setRoom] = useState(null);
  const [error, setError] = useState(null);
  const { user } = useSelector(state => {
    return state.userSlice;
  });
  useEffect(() => {
    async function fetchData() {
      try {
        const roomResponse = await https.get(`/phong-thue/${roomId}`);
        const commentListResponse = await https.get(`/binh-luan/lay-binh-luan-theo-phong/${roomId}`);
        const cityResponse = await https.get(`/vi-tri/${roomResponse.data.content.maViTri}`);

        setRoom({
          ...roomResponse.data.content,
          tinhThanh: cityResponse.data.content.tinhThanh,
          quocGia: cityResponse.data.content.quocGia,
          danhSachBinhLuan: commentListResponse.data.content.reverse(),
        });
      } catch (err) {
        setError("Đã xảy ra lỗi khi tìm nạp dữ liệu. Vui lòng thử lại sau.");
        console.error(err);
      }
    }

    fetchData();
  }, [roomId]);

  const [submitting, setSubmitting] = useState(false);
  const [value, setValue] = useState("");
  const fetchCommentData = async () => {
    try {
      const commentListResponse = await https.get(`/binh-luan/lay-binh-luan-theo-phong/${roomId}`);
      setRoom(prevRoom => ({
        ...prevRoom,
        danhSachBinhLuan: commentListResponse.data.content.reverse(),
      }));
    } catch (err) {
      setError("Đã xảy ra lỗi khi tìm nạp dữ liệu. Vui lòng thử lại sau.");
      console.error(err);
    }
  };
  const handleSubmit = () => {
    if (!value) return;
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setValue("");
      https
        .post(
          `/binh-luan`,
          { maPhong: roomId, maNguoiBinhLuan: user.id, ngayBinhLuan: Date(), noiDung: value, saoBinhLuan: 5 },
          {
            headers: { token: user.token },
          },
        )
        .then(() => {
          message.success("Bình luận đã được gửi đi!");
          fetchCommentData();
        })
        .catch(err => {
          message.error(err.response.data.content.replace(/^\w/, c => c.toUpperCase()));
        });
    }, 1000);
  };

  const handleChange = e => {
    setValue(e.target.value);
  };

  if (error) {
    return <div className='mx-auto w-[95%] py-6 h-[200px]'>Lỗi: {error}</div>;
  }

  if (!room) {
    return <Spinner />;
  }

  return (
    <div className='mx-auto w-[95%] py-6 space-y-6'>
      <h1 className='font-bold text-black text-3xl'>{room.tenPhong}</h1>
      <div className='grid grid-cols-1 md:flex justify-between items-center gap-6'>
        <div className='grid md:flex gap-x-6 gap-y-3'>
          <span className='space-x-2'>
            <FontAwesomeIcon className='w-4 h-4 text-[#FF5A5F]' icon={faStar} />
            <span className='text-black font-bold'>5,0</span>
            <span
              onClick={() => binhLuanRef.current.scrollIntoView({ behavior: "smooth" })}
              className='underline cursor-pointer text-gray-600 hover:text-[#FF5A5F] duration-300'
            >
              ({room.danhSachBinhLuan.length}) đánh giá
            </span>
          </span>
          <span className='space-x-2'>
            <FontAwesomeIcon className='w-4 h-4 text-[#FF5A5F]' icon={faAward} />
            <span className='text-gray-600'>Chủ nhà siêu cấp</span>
          </span>
          <Link
            className='underline cursor-pointer text-gray-600 hover:text-[#FF5A5F] duration-300'
            to={`/roombycity/${convertToSlug(room.tinhThanh)}`}
          >
            {room.tinhThanh}, {room.quocGia}
          </Link>
        </div>
        <div className='space-x-6'>
          <span className='text-black hover:text-[#FF5A5F] duration-300 cursor-pointer space-x-2'>
            <FontAwesomeIcon className='w-4 h-4' icon={faUpload} />
            <span className='underline'>Chia sẻ</span>
          </span>
          <span className='text-black hover:text-[#FF5A5F] duration-300 cursor-pointer space-x-2'>
            <FontAwesomeIcon className='w-4 h-4' icon={faHeart} />
            <span className='underline'>Lưu</span>
          </span>
        </div>
      </div>
      <div className='w-full'>
        <Swiper slidesPerView={1} spaceBetween={0} loop={true} modules={[Pagination]} pagination={true} className='mySwiper mx-auto rounded-lg'>
          {Array.from({ length: 5 }).map((_, index) => (
            <SwiperSlide key={index}>
              <div className='w-full cursor-pointer'>
                <ConfigProvider locale={viVN}>
                  <Image width='100%' alt='' src={room.hinhAnh} className='rounded-lg' />
                </ConfigProvider>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div ref={binhLuanRef} className='pb-[39px]'></div>
      <div className='w-full h-px bg-gray-300 mb-6'></div>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-12 h-[300px] overscroll-y-auto overflow-y-auto px-2'>
        {room.danhSachBinhLuan.map((item, index) => (
          <CommentSection key={index} item={item} />
        ))}
      </div>
      <div className='w-full h-px bg-gray-300 mb-6'></div>
      {user === null ? (
        <div>Vui lòng đăng nhập để bình luận!</div>
      ) : (
        <div>
          <Comment
            avatar={<Avatar src={user?.avatar !== "" ? user?.avatar : defaultNoAvatar} alt='' />}
            content={<Editor onChange={handleChange} onSubmit={handleSubmit} submitting={submitting} value={value} />}
          />
        </div>
      )}
    </div>
  );
}

Editor.propTypes = {
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
  value: PropTypes.string.isRequired,
};
