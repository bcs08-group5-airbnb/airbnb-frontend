import PropTypes from "prop-types";
import { addSpaceBeforeUppercase } from "../utils/addSpaceBeforeUppercase";
import { capitalizeString } from "../utils/capitalizeString";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { checkDatetimeFormat } from "../utils/checkDatetimeFormat";
import moment from "moment";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { defaultNoAvatar } from "../constants/defaultValues";

const onImageError = e => {
  e.target.src = defaultNoAvatar;
};

export default function Comment({ item }) {
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
      <p className='line-clamp-3 text-justify'>{item.noiDung.length > 0 ? item.noiDung : "Không nhận xét."}</p>
    </div>
  );
}
Comment.propTypes = {
  item: PropTypes.object,
};
