import React from "react";
import Toast from "react-bootstrap/Toast";
import ToastContainer from "react-bootstrap/ToastContainer";
// import "bootstrap/dist/css/bootstrap.min.css";
import "../public/styles/toast-style.css";
import { useState, useEffect } from "react";


export function ToastBox({ show, onClose, title, message, img }) {
  const [visible, setVisible] = useState(show);
  const [fadeOut, setFadeOut] = useState(false);


  useEffect(() => {
    if (show) {
      setVisible(true);
      setFadeOut(false);
      const timer = setTimeout(() => {
        setFadeOut(true);
        const hideTimer = setTimeout(() => {
          setVisible(false);
          if (onClose) onClose();
        }, 500);

        return () => clearTimeout(hideTimer);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [show, onClose]);

  return (
    <ToastContainer
      className="p-3 custom-toast-container"
      position="bottom-end"
      style={{ zIndex: 1 }}
    >
      <Toast
        show={visible}
        onClose={() => setVisible(false)}
        className={`custom-toast ${fadeOut ? "fade-out" : ""}`}
      >
        <Toast.Header closeButton={false} className="custom-toast-header">
          <img src={img} className="rounded me-2" alt="" />
          <strong className="me-auto" style={{ marginRight: "3px" }}>
            {title}
          </strong>
          <h5>Just Now</h5>
        </Toast.Header>
        <Toast.Body className="custom-toast-body fs-3">{message}</Toast.Body>
      </Toast>
    </ToastContainer>
  );
}

export default ToastBox;
