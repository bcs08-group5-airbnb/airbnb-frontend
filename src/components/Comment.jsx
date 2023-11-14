import PropTypes from "prop-types";
import { addSpaceBeforeUppercase } from "../utils/addSpaceBeforeUppercase";
import { capitalizeString } from "../utils/capitalizeString";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { checkDatetimeFormat } from "../utils/checkDatetimeFormat";
import moment from "moment";
import { faChevronCircleDown, faChevronCircleUp, faStar } from "@fortawesome/free-solid-svg-icons";
import { defaultNoAvatar } from "../constants/defaultValues";
import { useEffect, useRef, useState } from "react";

const onImageError = e => {
  e.target.src = defaultNoAvatar;
};

export default function Comment({ item }) {
  const [hienThiThem, setHienThiThem] = useState(false);
  const preRef = useRef(null);
  const [isThreeLinesOrMore, setIsThreeLinesOrMore] = useState(false);

  useEffect(() => {
    const calculateNumberOfLines = () => {
      if (preRef.current) {
        const preElement = preRef.current;
        const lineHeight = window.getComputedStyle(preElement).getPropertyValue("line-height");
        const height = preElement.clientHeight;
        const numberOfLines = Math.round(height / parseFloat(lineHeight));
        if (numberOfLines > 3) {
          setIsThreeLinesOrMore(true);
        }
      }
    };
    calculateNumberOfLines();
    window.addEventListener("resize", calculateNumberOfLines);
    return () => {
      window.removeEventListener("resize", calculateNumberOfLines);
    };
  }, []);

  return (
    <div className='space-y-3'>
      <div className='flex items-center gap-3'>
        <div>
          <img alt='' className='w-12 h-12 rounded-full object-cover' src={item.avatar} onError={onImageError} />
        </div>
        <div>
          <p className='font-bold space-x-2'>
            <span>{addSpaceBeforeUppercase(capitalizeString(item.tenNguoiBinhLuan)).trim()}</span>
            <span className='space-x-1'>
              <FontAwesomeIcon className='w-4 h-4 text-[#FF5A5F]' icon={faStar} />
              <span className='text-black font-bold'>{item.saoBinhLuan} / 5</span>
            </span>
          </p>
          <p className='text-gray-600'>
            {!checkDatetimeFormat(item.ngayBinhLuan)
              ? "ngày 01 tháng 10 năm 2023"
              : `ngày ${moment(item.ngayBinhLuan).format("DD")} tháng ${moment(item.ngayBinhLuan).format("MM")} năm ${moment(
                  item.ngayBinhLuan,
                ).format("YYYY")}`}
          </p>
        </div>
      </div>
      <div>
        <pre ref={preRef} className={`${!hienThiThem && isThreeLinesOrMore && "line-clamp-3"} text-justify`}>
          {item.noiDung.length > 0 ? item.noiDung : "Không nhận xét."}
        </pre>
        {!hienThiThem && isThreeLinesOrMore && (
          <button className='mt-3 font-bold space-x-2' onClick={() => setHienThiThem(true)}>
            <span className='underline'>Hiển thị thêm</span>
            <FontAwesomeIcon icon={faChevronCircleDown} />
          </button>
        )}
        {hienThiThem && isThreeLinesOrMore && (
          <button className='mt-3 font-bold space-x-2' onClick={() => setHienThiThem(false)}>
            <span className='underline'>Ẩn bớt</span>
            <FontAwesomeIcon icon={faChevronCircleUp} />
          </button>
        )}
      </div>
    </div>
  );
}

Comment.propTypes = {
  item: PropTypes.object,
};
