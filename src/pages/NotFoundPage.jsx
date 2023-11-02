import Header from "../components/Header";
import Footer from "../components/Footer";
import FooterFixed from "../components/FooterFixed";

export default function NotFoundPage() {
  return (
    <>
      <Header />
      <div className='w-[95%] mx-auto grid grid-cols-1 md:grid-cols-2'>
        <div className='space-y-9'>
          <p className='text-black font-bold text-3xl'>We can’t seem to find the page you’re looking for</p>
          <div className='space-y-3'>
            <p>Here are some helpful links instead:</p>
            <ul className='space-y-3'>
              <li>
                <a className='font-bold text-black underline cursor-pointer'>Home</a>
              </li>
              <li>
                <a className='font-bold text-black underline cursor-pointer'>Traveling on Airbnb</a>
              </li>
              <li>
                <a className='font-bold text-black underline cursor-pointer'>Hosting on Airbnb</a>
              </li>
              <li>
                <a className='font-bold text-black underline cursor-pointer'>Trust & Safety</a>
              </li>
              <li>
                <a className='font-bold text-black underline cursor-pointer'>Sitemap</a>
              </li>
            </ul>
          </div>
        </div>
        <div>
          <img
            alt=''
            src='https://a0.muscache.com/airbnb/static/error_pages/404-Airbnb_final-d652ff855b1335dd3eedc3baa8dc8b69.gif'
            className='mx-auto w-52'
          />
        </div>
      </div>
      <Footer />
      <FooterFixed />
    </>
  );
}
