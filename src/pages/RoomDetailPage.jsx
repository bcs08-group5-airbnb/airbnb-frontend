import { FrownOutlined, MehOutlined, SmileOutlined } from "@ant-design/icons";
import PropTypes from "prop-types";
import viVN from "antd/es/locale/vi_VN";
import { useEffect, useRef, useState } from "react";
import { https } from "../api/config";
import { Link, useParams } from "react-router-dom";
import Spinner from "../components/Spinner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAirFreshener,
  faAward,
  faBacon,
  faBlackboard,
  faCalendar,
  faElevator,
  faHandsWash,
  faHeadset,
  faHeart,
  faKitchenSet,
  faParking,
  faStar,
  faSwimmingPool,
  faTv,
  faUpload,
  faWarehouse,
  faWifi,
} from "@fortawesome/free-solid-svg-icons";
import convertToSlug from "../utils/convertToSlug";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import { Avatar, Button, ConfigProvider, Form, Image, Rate, message } from "antd";
import { useSelector } from "react-redux";
import CommentSection from "../components/Comment";
import TextArea from "antd/es/input/TextArea";
import { Comment } from "@ant-design/compatible";
import { defaultNoAvatar } from "../constants/defaultValues";

const customIcons = {
  1: <FrownOutlined />,
  2: <FrownOutlined />,
  3: <MehOutlined />,
  4: <SmileOutlined />,
  5: <SmileOutlined />,
};

const Editor = ({ onChange, onSubmit, submitting, value, rateNum, onRateChange }) => (
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
      <Rate onChange={onRateChange} defaultValue={3} value={rateNum} character={({ index }) => customIcons[index + 1]} />
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
  const [tienNghi, setTienNghi] = useState(5);
  const [hienThiTatCaTienNghi, setHienThiTatCaTienNghi] = useState(false);
  const { user } = useSelector(state => {
    return state.userSlice;
  });
  const [trungBinhRating, setTrungBinhRating] = useState(0);
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
        console.log({
          ...roomResponse.data.content,
          tinhThanh: cityResponse.data.content.tinhThanh,
          quocGia: cityResponse.data.content.quocGia,
          danhSachBinhLuan: commentListResponse.data.content.reverse(),
        });
        const totalSao = commentListResponse.data.content.reduce((sum, item) => sum + item.saoBinhLuan, 0);
        if (commentListResponse.data.content.length === 0) {
          setTrungBinhRating("Chưa có đánh giá");
        } else {
          const tempNumber = totalSao / commentListResponse.data.content.length;
          const formatNumber = tempNumber % 1 === 0 ? tempNumber.toFixed(0) : tempNumber.toFixed(2);
          setTrungBinhRating(formatNumber);
        }
        const tempObjectRoom = { ...roomResponse.data.content };
        const trueValueCount = Object.keys(tempObjectRoom).filter(key => key !== "banLa" && tempObjectRoom[key] === true).length;
        setTienNghi(5 + trueValueCount);
      } catch (err) {
        setError("Đã xảy ra lỗi khi tìm nạp dữ liệu. Vui lòng thử lại sau.");
        console.error(err);
      }
    }

    fetchData();
  }, [roomId]);

  const [submitting, setSubmitting] = useState(false);
  const [value, setValue] = useState("");
  const [rating, setRating] = useState(3);
  const fetchCommentData = async () => {
    try {
      const commentListResponse = await https.get(`/binh-luan/lay-binh-luan-theo-phong/${roomId}`);
      setRoom(prevRoom => ({
        ...prevRoom,
        danhSachBinhLuan: commentListResponse.data.content.reverse(),
      }));
      const totalSao = commentListResponse.data.content.reduce((sum, item) => sum + item.saoBinhLuan, 0);
      setTrungBinhRating((totalSao / commentListResponse.data.content.length).toFixed(2));
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
      setRating(3);
      https
        .post(
          `/binh-luan`,
          { maPhong: roomId, maNguoiBinhLuan: user.id, ngayBinhLuan: Date(), noiDung: value, saoBinhLuan: rating },
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

  const handleRateChange = star => {
    setRating(star); // 1, 2, 3, 4, 5
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
          {room.danhSachBinhLuan.length > 0 && (
            <span className='space-x-2'>
              <FontAwesomeIcon className='w-4 h-4 text-[#FF5A5F]' icon={faStar} />
              <span className='text-black font-bold'>{trungBinhRating} / 5</span>
              <span
                onClick={() => binhLuanRef.current.scrollIntoView({ behavior: "smooth" })}
                className='underline cursor-pointer text-gray-600 hover:text-[#FF5A5F] duration-300'
              >
                ({room.danhSachBinhLuan.length}) đánh giá
              </span>
            </span>
          )}
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
                  <Image width='100%' height='470px' alt='' src={room.hinhAnh} className='rounded-lg object-cover' />
                </ConfigProvider>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className='space-y-6'>
        <h1 className='font-bold text-black text-3xl'>Tiện nghi</h1>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          {room.bep && (
            <div className='space-x-3'>
              <span>
                <FontAwesomeIcon className='w-5 h-5' icon={faKitchenSet} />
              </span>
              <span>Bếp</span>
            </div>
          )}
          {room.wifi && (
            <div className='space-x-3'>
              <span>
                <FontAwesomeIcon className='w-5 h-5' icon={faWifi} />
              </span>
              <span>Wifi</span>
            </div>
          )}
          {room.tivi && (
            <div className='space-x-3'>
              <span>
                <FontAwesomeIcon className='w-5 h-5' icon={faTv} />
              </span>
              <span>TV với truyền hình cáp tiêu chuẩn</span>
            </div>
          )}
          {true && (
            <div className='space-x-3'>
              <span>
                <FontAwesomeIcon className='w-5 h-5' icon={faElevator} />
              </span>
              <span>Thang máy</span>
            </div>
          )}
          {room.dieuHoa && (
            <div className='space-x-3'>
              <span>
                <FontAwesomeIcon className='w-5 h-5' icon={faAirFreshener} />
              </span>
              <span>Điều hòa nhiệt độ</span>
            </div>
          )}
          {true && (
            <div className='space-x-3'>
              <span>
                <FontAwesomeIcon className='w-5 h-5' icon={faBlackboard} />
              </span>
              <span>Sân hoặc ban công</span>
            </div>
          )}
          {true && (
            <div className='space-x-3'>
              <span>
                <FontAwesomeIcon className='w-5 h-5' icon={faHeadset} />
              </span>
              <span>Lò sưởi trong nhà</span>
            </div>
          )}
          {true && (
            <div className='space-x-3'>
              <span>
                <FontAwesomeIcon className='w-5 h-5' icon={faWarehouse} />
              </span>
              <span>Tủ lạnh</span>
            </div>
          )}
          {room.doXe && (
            <div className='space-x-3'>
              <span>
                <FontAwesomeIcon className='w-5 h-5' icon={faParking} />
              </span>
              <span>Bãi đỗ xe thu phí nằm ngoài khuôn viên</span>
            </div>
          )}
          {true && (
            <div className='space-x-3'>
              <span>
                <FontAwesomeIcon className='w-5 h-5' icon={faCalendar} />
              </span>
              <span>Cho phép dài hạn</span>
            </div>
          )}
          {hienThiTatCaTienNghi && (
            <>
              {room.banUi && (
                <div className='space-x-3'>
                  <span>
                    <FontAwesomeIcon className='w-5 h-5' icon={faBacon} />
                  </span>
                  <span>Bàn ủi</span>
                </div>
              )}
              {room.hoBoi && (
                <div className='space-x-3'>
                  <span>
                    <FontAwesomeIcon className='w-5 h-5' icon={faSwimmingPool} />
                  </span>
                  <span>Hồ bơi</span>
                </div>
              )}
              {room.mayGiat && (
                <div className='space-x-3'>
                  <span>
                    <FontAwesomeIcon className='w-5 h-5' icon={faHandsWash} />
                  </span>
                  <span>Máy giặt</span>
                </div>
              )}
            </>
          )}
        </div>
        <div>
          {!hienThiTatCaTienNghi ? (
            <button
              onClick={() => setHienThiTatCaTienNghi(true)}
              className='w-56 text-black bg-white border-2 border-black rounded-lg p-3 hover:bg-gray-200 duration-300'
            >
              Hiển thị tất cả {tienNghi} tiện nghi
            </button>
          ) : (
            <div className='mt-6'>
              <button
                onClick={() => setHienThiTatCaTienNghi(false)}
                className='w-56 text-black bg-white border-2 border-black rounded-lg p-3 hover:bg-gray-200 duration-300'
              >
                Ẩn bớt tiện nghi
              </button>
            </div>
          )}
        </div>
      </div>
      {room.danhSachBinhLuan.length > 0 && <div ref={binhLuanRef} className='pb-[50px]'></div>}
      <div className='w-full h-px bg-gray-300 mb-6'></div>
      <h1 className='font-bold text-3xl text-black'>Bình luận</h1>
      {room.danhSachBinhLuan.length > 0 ? (
        <>
          <div
            className={`grid grid-cols-1 md:grid-cols-2 gap-12 ${
              room.danhSachBinhLuan.length > 4 && "h-[300px]"
            } overscroll-y-auto overflow-y-auto px-2`}
          >
            {room.danhSachBinhLuan.map((item, index) => (
              <CommentSection key={index} item={item} />
            ))}
          </div>
        </>
      ) : (
        <p>Chưa có bình luận nào! Bạn hãy trở thành người đầu tiên nhé 😍</p>
      )}
      <div className='w-full h-px bg-gray-300 mb-6'></div>
      {user === null ? (
        <div>Vui lòng đăng nhập để bình luận!</div>
      ) : (
        <div>
          <Comment
            avatar={<Avatar src={user?.avatar !== "" ? user?.avatar : defaultNoAvatar} alt='' />}
            content={
              <Editor
                onRateChange={handleRateChange}
                onChange={handleChange}
                onSubmit={handleSubmit}
                submitting={submitting}
                value={value}
                rateNum={rating}
              />
            }
          />
        </div>
      )}
    </div>
  );
}

Editor.propTypes = {
  onChange: PropTypes.func.isRequired,
  onRateChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
  value: PropTypes.string.isRequired,
  rateNum: PropTypes.number.isRequired,
};
