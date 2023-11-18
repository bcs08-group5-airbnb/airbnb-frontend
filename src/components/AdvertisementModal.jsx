import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef, useState } from "react";
import { RemoveScrollBar } from "react-remove-scroll-bar";
import { Link } from "react-router-dom";

export default function AdvertisementModal() {
  const [showAdvertisementModal, setShowAdvertisementModal] = useState(false);
  const [removeAdvertisementModal, setRemoveAdvertisementModal] = useState(false);
  const modalRef = useRef(null);
  const closeAdvertisementModal = () => {
    setShowAdvertisementModal(false);
    setTimeout(() => {
      setRemoveAdvertisementModal(true);
    }, 600);
  };
  const handleClickOutside = event => {
    if (modalRef.current && modalRef.current.contains(event.target)) {
      closeAdvertisementModal();
    }
  };
  useEffect(() => {
    setTimeout(() => {
      setShowAdvertisementModal(true);
    }, 500);
  }, []);
  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);
  return (
    <>
      <div
        ref={modalRef}
        className={`${showAdvertisementModal ? "block" : "hidden"} fixed left-0 top-0 z-[90] w-screen h-screen bg-black opacity-50`}
      >
        {showAdvertisementModal && <RemoveScrollBar />}
      </div>
      {!removeAdvertisementModal && (
        <div
          className={`z-[100] grid grid-cols-1 lg:grid-cols-2 fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg ${
            showAdvertisementModal ? "opacity-100 scale-100" : "opacity-0 scale-50"
          } transition-all duration-500`}
        >
          <div className='p-6 flex justify-center items-center relative'>
            <div className='space-y-6'>
              <h1 className='font-bold text-4xl text-center'>Giới thiệu các yêu thích của khách</h1>
              <p className='text-center text-gray-500'>
                Những ngôi nhà được yêu thích nhất trên Airbnb, theo đánh giá của khách hàng. Cộng với những nâng cấp khác để giúp bạn tìm được một kỳ
                nghỉ tuyệt vời.
              </p>
              <div className='flex justify-center items-center'>
                <Link to='/roombycity/ho-chi-minh'>
                  <button className='bg-gray-800 hover:bg-black duration-300 rounded-lg text-center text-white w-52 px-6 py-3'>Có gì hấp dẫn?</button>
                </Link>
              </div>
            </div>
            <div className='absolute left-3 top-3'>
              <FontAwesomeIcon
                className='cursor-pointer bg-gray-200 hover:bg-gray-300 duration-300 rounded-full w-3.5 h-3.5 p-2 text-black'
                icon={faClose}
                onClick={closeAdvertisementModal}
              />
            </div>
          </div>
          <div>
            <img className='rounded-lg' alt='' src='https://a0.muscache.com/im/pictures/ffb461ba-275f-46f5-9b7f-ff508bcaa05f.jpg' />
          </div>
        </div>
      )}
    </>
  );
}
