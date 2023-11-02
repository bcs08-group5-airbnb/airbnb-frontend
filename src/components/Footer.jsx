export default function Footer() {
  return (
    <div className='bg-[#f3f4f6] pb-0 lg:pb-12'>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 py-6 gap-12 mx-auto w-[95%]'>
        <div className='space-y-3'>
          <h2 className='font-bold'>Hỗ trợ</h2>
          <ul className='space-y-1 text-sm'>
            <li>
              <a className='cursor-pointer hover:underline'>Trung tâm trợ giúp</a>
            </li>
            <li>
              <a className='cursor-pointer hover:underline'>AirCover</a>
            </li>
            <li>
              <a className='cursor-pointer hover:underline'>Thông tim an toàn</a>
            </li>
            <li>
              <a className='cursor-pointer hover:underline'>Hỗ trợ người khuyết tật</a>
            </li>
            <li>
              <a className='cursor-pointer hover:underline'>Các tùy chọn hủy</a>
            </li>
            <li>
              <a className='cursor-pointer hover:underline'>Biện pháp ứng phó COVID-19</a>
            </li>
            <li>
              <a className='cursor-pointer hover:underline'>Báo cáo lo ngại của hàng xóm</a>
            </li>
          </ul>
        </div>
        <div className='space-y-3'>
          <h2 className='font-bold'>Cộng đồng</h2>
          <ul className='space-y-1 text-sm'>
            <li>
              <a className='cursor-pointer hover:underline'>Airbnb.org: nhà ở cứu trợ</a>
            </li>
            <li>
              <a className='cursor-pointer hover:underline'>Hỗ trợ dân tị nạn Afghanistan</a>
            </li>
            <li>
              <a className='cursor-pointer hover:underline'>Chống phân biệt đối xử</a>
            </li>
          </ul>
        </div>
        <div className='space-y-3'>
          <h2 className='font-bold'>Đón tiếp khách</h2>
          <ul className='space-y-1 text-sm'>
            <li>
              <a className='cursor-pointer hover:underline'>Thử đón tiếp khách</a>
            </li>
            <li>
              <a className='cursor-pointer hover:underline'>AirCover cho Chủ nhà</a>
            </li>
            <li>
              <a className='cursor-pointer hover:underline'>Xem tài nguyên đón tiếp khách</a>
            </li>
            <li>
              <a className='cursor-pointer hover:underline'>Truy cập diễn đàn cộng đồng</a>
            </li>
            <li>
              <a className='cursor-pointer hover:underline'>Đón tiếp khách có trách nhiệm</a>
            </li>
          </ul>
        </div>
        <div className='space-y-3'>
          <h2 className='font-bold'>Airbnb</h2>
          <ul className='space-y-1 text-sm'>
            <li>
              <a className='cursor-pointer hover:underline'>Trang tin tức</a>
            </li>
            <li>
              <a className='cursor-pointer hover:underline'>Tìm hiểu các tính năng mới</a>
            </li>
            <li>
              <a className='cursor-pointer hover:underline'>Thư ngỏ từ các nhà sáng lập</a>
            </li>
            <li>
              <a className='cursor-pointer hover:underline'>Cơ hội nghề nghiệp</a>
            </li>
            <li>
              <a className='cursor-pointer hover:underline'>Nhà đầu tư</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
