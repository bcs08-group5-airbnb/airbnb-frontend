import Footer from "../components/Footer";
import FooterFixed from "../components/FooterFixed";
import Header from "../components/Header";
import PropTypes from "prop-types";

export default function MainLayout({ children }) {
  return (
    <>
      <Header />
      <div>{children}</div>
      <FooterFixed />
      <Footer />
    </>
  );
}

MainLayout.propTypes = {
  children: PropTypes.element,
};
