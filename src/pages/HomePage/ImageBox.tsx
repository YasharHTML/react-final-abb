import React from "react";
import { Modal } from "../../components/layout/Modal";
import { MoreIcon } from "../../icons/MoreIcon";

const ImageBox = () => {
  const [showModal, setShowModal] = React.useState(false);

  return (
    <div style={{ width: "470px", border: "1px solid gray", margin: "50px" }}>
      <div className="post-header">
        <div className="profile-img-box">
          <img
            src={
              "https://www.celladorales.com/wp-content/uploads/2016/12/ShippingBox_sq.jpg"
            }
            alt="imaxge"
            style={{ width: "100%" }}
          />
        </div>
        <div className="user"> </div>
        <button onClick={() => setShowModal(true)}>
          <MoreIcon />
        </button>
      </div>
      <img
        src={
          "https://www.celladorales.com/wp-content/uploads/2016/12/ShippingBox_sq.jpg"
        }
        alt="imaxge"
        style={{ width: "100%" }}
      />
      <Modal showModal = {showModal} closeModal={() => setShowModal(false)} />
    </div>
  );
};

export default ImageBox;
