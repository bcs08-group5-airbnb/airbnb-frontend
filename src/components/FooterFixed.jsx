export default function FooterFixed() {
  return (
    <div className='hidden lg:block fixed left-0 bottom-0 bg-[#f9fafb] text-gray-500 w-full'>
      <div className='mx-auto w-[95%] py-3 flex justify-between items-center'>
        <div>
          <span>© 2023 Airbnb, Inc. All rights reserved</span>
          <span className='px-3 hover:underline cursor-pointer'>Quyền riêng tư</span>.
          <span className='px-3 hover:underline cursor-pointer'>Điều khoản</span>.
          <span className='px-3 hover:underline cursor-pointer'>Sơ đồ trang web</span>.
        </div>
        <div className='text-gray-700'>
          <span>
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
          </span>
          <span className='hover:underline cursor-pointer px-3 font-medium'>Tiếng Việt(VN)</span>
          <i className='fa fa-dollar-sign font-medium cursor-pointer'></i>
          <span className='hover:underline cursor-pointer px-2 font-medium'>USD</span>
          <span className='font-medium hover:underline'>
            Hỗ trợ tài nguyên <i className='fa fa-angle-up'></i>
          </span>
        </div>
      </div>
    </div>
  );
}
