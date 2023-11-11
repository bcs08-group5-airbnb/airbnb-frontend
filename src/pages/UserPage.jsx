import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Card } from "antd";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { httpsNoLoading } from "../api/config";
import ListRooms from "../components/ListRooms";

export default function UserPage() {
  const { id, name } = useSelector(state => {
    return state.userSlice.user;
  });
  const [userBookedPlaces, setUserBookedPlaces] = useState([]);
  useEffect(() => {
    let ngayDen = "";
    let ngayDi = "";
    let soLuongKhach = "";
    httpsNoLoading
      .get(`dat-phong/lay-theo-nguoi-dung/${id}`)
      .then(userBookedPlacesResponse => {
        const promises = userBookedPlacesResponse.data.content.map(item => {
          ngayDen = item.ngayDen;
          ngayDi = item.ngayDi;
          soLuongKhach = item.soLuongKhach;
          return httpsNoLoading.get(`phong-thue/${item.maPhong}`);
        });

        Promise.all(promises)
          .then(roomResponses => {
            // Extract room data from roomResponses
            const roomsData = roomResponses.map(response => response.data.content);

            // Map room data and perform additional mapping
            const transformedPromises = roomsData.map(room => {
              return httpsNoLoading
                .get(`/vi-tri/${room.maViTri}`)
                .then(res => {
                  // Map the room data with additional tinhThanh property
                  return {
                    ...room,
                    tinhThanh: res.data.content.tinhThanh,
                    ngayDen,
                    ngayDi,
                    soLuongKhach,
                  };
                })
                .catch(err => console.error(err));
            });

            // Wait for all the additional mapping promises to complete
            Promise.all(transformedPromises)
              .then(transformedData => {
                // Update the state with the final transformed data
                setUserBookedPlaces(transformedData);
                console.log(transformedData);
              })
              .catch(err => {
                console.error(err);
              });
          })
          .catch(err => {
            console.error(err);
          });
      })
      .catch(err => {
        console.error(err);
      });
  }, [id]);

  return (
    <div className='mx-auto w-[95%] grid lg:flex gap-12 py-6'>
      <Card className='basis-auto h-[500px] block lg:sticky top-0 lg:top-20'>
        <div className='space-y-3'>
          <img className='mx-auto w-36 rounded-full' alt='' src='https://a0.muscache.com/defaults/user_pic-50x50.png' />
          <div className='w-full flex justify-center'>
            <button className='mx-auto w-auto underline font-bold text-sm'>Cập nhật ảnh</button>
          </div>
        </div>
        <div className='space-y-6 mt-3'>
          <div className='flex justify-start items-center gap-3'>
            <img className='w-6' alt='' src='https://cdn-icons-png.flaticon.com/512/5972/5972778.png' />
            <p className='font-bold text-xl'>Xác minh danh tính</p>
          </div>
          <p className='text-justify'>Xác minh danh tính của bạn với huy hiệu xác minh danh tính.</p>
          <Button>Nhận huy hiệu</Button>
          <div className='w-full h-px bg-gray-300'></div>
          <p className='text-xl font-bold'>
            {name
              .trim()
              .split(" ")
              .pop()
              .replace(/^\w/, c => c.toUpperCase())}{" "}
            đã xác nhận
          </p>
          <p className='space-x-3'>
            <span>
              <FontAwesomeIcon icon={faCheck} />
            </span>
            <span>Địa chỉ email</span>
          </p>
        </div>
      </Card>
      <div className='basis-9/12 space-y-3'>
        <p className='font-bold text-xl'>
          Xin chào, tôi là{" "}
          {name
            .trim()
            .split(" ")
            .pop()
            .replace(/^\w/, c => c.toUpperCase())}
        </p>
        <p className='text-gray-500 text-sm'>Bắt đầu tham gia vào {new Date().getFullYear()}</p>
        <button className='w-auto underline font-bold text-sm'>Chỉnh sửa hồ sơ</button>
        <h1 className='font-bold text-2xl'>Phòng đã thuê</h1>
        {userBookedPlaces !== null && userBookedPlaces.length > 0 ? (
          <div className='space-y-6'>
            {userBookedPlaces.map((item, index) => (
              <ListRooms key={index} item={item} cityNoSlug={item.tinhThanh} />
            ))}
          </div>
        ) : (
          <p>Bạn chưa đặt phòng nào? Đang tải...</p>
        )}
      </div>
    </div>
  );
}
