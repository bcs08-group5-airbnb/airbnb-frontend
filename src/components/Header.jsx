import { Dropdown } from "antd";
import { Link } from "react-router-dom";

export default function Header() {
  const items = [
    {
      key: "1",
      label: <Link to='/register'>Đăng ký</Link>,
    },
    {
      key: "2",
      label: <Link to='/login'>Đăng nhập</Link>,
    },
    {
      key: "3",
      label: <div>Cho thuê nhà</div>,
    },
    {
      key: "4",
      label: <div>Tổ chức trải nghiệm</div>,
    },
    {
      key: "5",
      label: <div>Trợ giúp</div>,
    },
  ];
  return (
    <div className='w-[95%] mx-auto py-6 flex flex-grow justify-between items-center'>
      <Link to='/' className='w-[50%]'>
        <img
          alt=''
          src='https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Airbnb_Logo_B%C3%A9lo.svg/2560px-Airbnb_Logo_B%C3%A9lo.svg.png'
          className='w-24'
        />
      </Link>
      <ul className='flex justify-center items-center gap-x-12 grow w-full'>
        <li className='text-black cursor-pointer truncate'>Nơi ở</li>
        <li className='text-black cursor-pointer truncate'>Trải nghiệm</li>
        <li className='text-black cursor-pointer truncate'>Trải nghiệm trực tuyến</li>
      </ul>
      <div className='flex justify-end w-[50%]'>
        <div className='flex justify-between items-center gap-x-3'>
          <div className='text-black rounded-full bg-transparent hover:bg-gray-300 duration-300 cursor-pointer px-1 py-2 truncate'>
            Đón tiếp khách
          </div>
          <div className='flex justify-center items-center text-black rounded-full bg-transparent hover:bg-gray-300 duration-300 cursor-pointer px-6 py-3'>
            <svg
              viewBox='0 0 16 16'
              xmlns='http://www.w3.org/2000/svg'
              aria-hidden='true'
              role='presentation'
              focusable='false'
              className='inline-block h-4 w-4 text-current fill-current'
            >
              <path d='m8.002.25a7.77 7.77 0 0 1 7.748 7.776 7.75 7.75 0 0 1 -7.521 7.72l-.246.004a7.75 7.75 0 0 1 -7.73-7.513l-.003-.245a7.75 7.75 0 0 1 7.752-7.742zm1.949 8.5h-3.903c.155 2.897 1.176 5.343 1.886 5.493l.068.007c.68-.002 1.72-2.365 1.932-5.23zm4.255 0h-2.752c-.091 1.96-.53 3.783-1.188 5.076a6.257 6.257 0 0 0 3.905-4.829zm-9.661 0h-2.75a6.257 6.257 0 0 0 3.934 5.075c-.615-1.208-1.036-2.875-1.162-4.686l-.022-.39zm1.188-6.576-.115.046a6.257 6.257 0 0 0 -3.823 5.03h2.75c.085-1.83.471-3.54 1.059-4.81zm2.262-.424c-.702.002-1.784 2.512-1.947 5.5h3.904c-.156-2.903-1.178-5.343-1.892-5.494l-.065-.007zm2.28.432.023.05c.643 1.288 1.069 3.084 1.157 5.018h2.748a6.275 6.275 0 0 0 -3.929-5.068z'></path>
            </svg>
          </div>
          <Dropdown menu={{ items }} placement='bottomRight'>
            <div className='px-6 py-3 border border-gray-300 rounded-full flex justify-between items-center gap-x-6 hover:shadow-lg hover:shadow-gray-500/50 duration-200'>
              <svg
                viewBox='0 0 32 32'
                xmlns='http://www.w3.org/2000/svg'
                aria-hidden='true'
                role='presentation'
                focusable='false'
                className='block h-5 w-5 text-current stroke-current stroke-3 fill-none overflow-visible'
              >
                <g fill='none' fillRule='nonzero'>
                  <path d='m2 16h28'></path>
                  <path d='m2 24h28'></path>
                  <path d='m2 8h28'></path>
                </g>
              </svg>
              <svg
                viewBox='0 0 32 32'
                xmlns='http://www.w3.org/2000/svg'
                aria-hidden='true'
                role='presentation'
                focusable='false'
                className='block h-5 w-5 fill-current'
              >
                <path d='m16 .7c-8.437 0-15.3 6.863-15.3 15.3s6.863 15.3 15.3 15.3 15.3-6.863 15.3-15.3-6.863-15.3-15.3-15.3zm0 28c-4.021 0-7.605-1.884-9.933-4.81a12.425 12.425 0 0 1 6.451-4.4 6.507 6.507 0 0 1 -3.018-5.49c0-3.584 2.916-6.5 6.5-6.5s6.5 2.916 6.5 6.5a6.513 6.513 0 0 1 -3.019 5.491 12.42 12.42 0 0 1 6.452 4.4c-2.328 2.925-5.912 4.809-9.933 4.809z'></path>
              </svg>
            </div>
          </Dropdown>
        </div>
      </div>
    </div>
  );
}
