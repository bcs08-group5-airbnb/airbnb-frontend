export default function FooterFixed() {
  return (
    <div className='hidden lg:block fixed left-0 bottom-0 bg-[#f9fafb] text-gray-500 w-full'>
      <div className='mx-auto w-[95%] py-3 flex justify-between items-center'>
        <div>
          <span>© 2022 Airbnb, Inc.</span>
          <span className='px-3 hover:underline cursor-pointer'>Quyền riêng tư</span>.
          <span className='px-3 hover:underline cursor-pointer'>Điều khoản</span>.
          <span className='px-3 hover:underline cursor-pointer'>Sơ đồ trang web</span>.
        </div>
        <div className='text-gray-700'>
          <span></span>
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
