import PropTypes from "prop-types";
import { useEffect, useRef } from "react";
import Viewer from "viewerjs";
import "viewerjs/dist/viewer.css";

const SingleImageViewer = ({ image, className }) => {
  const viewerRef = useRef(null);

  useEffect(() => {
    if (viewerRef.current) {
      // Initialize Viewer.js
      const viewer = new Viewer(viewerRef.current, {
        inline: false,
        viewed() {
          viewer.zoomTo(1); // Set the initial zoom level (1 is 100%)
        },
      });

      // Clean up the viewer on component unmount
      return () => {
        viewer.destroy();
      };
    }
  }, [image]);

  return <img className={className} ref={viewerRef} src={image} alt='Image' />;
};

export default SingleImageViewer;

SingleImageViewer.propTypes = {
  image: PropTypes.string,
  className: PropTypes.string,
};
