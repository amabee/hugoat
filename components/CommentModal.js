"use client";
import { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Picker from "@emoji-mart/react";

export default function CommentModal({ isOpen, onClose }) {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [selectedEmoji, setSelectedEmoji] = useState(null);

  const handleEmojiSelect = (emoji) => {
    setSelectedEmoji(emoji.native);
    console.log(emoji.native);
    setShowEmojiPicker(false);
  };

  return (
    <Modal show={isOpen} onHide={onClose} centered scrollable fullscreen={true}>
      <Modal.Header closeButton className="bg-dark">
        <Modal.Title className="text-light">Comments</Modal.Title>
      </Modal.Header>
      <Modal.Body className="bg-dark">
        <div className="d-flex align-items-start border p-3 bg-dark rounded">
          <div
            className="rounded-circle bg-secondary me-3"
            style={{ width: "50px", height: "50px" }}
          ></div>
          <div className="flex-grow-1">
            <textarea
              type="text"
              className="form-control bg-secondary text-light border-0"
              cols={10}
              rows={5}
              placeholder="Write a comment..."
            />
            <div className="d-flex mt-2 position-relative">
              <Button
                variant="secondary"
                size="lg"
                className="me-2"
                onClick={() => {
                  setShowEmojiPicker(!showEmojiPicker);
                }}
              >
                {selectedEmoji ? selectedEmoji : "Like"}
              </Button>
              <p className="text-light fs-5">1 likes</p>
              <Button variant="secondary" size="lg" className="ms-auto">
                Submit
              </Button>

              {showEmojiPicker && (
                <div
                  className="position-absolute"
                  style={{
                    top: "100%",
                    left: 0,
                    zIndex: 9999,
                    background: "white",
                    border: "1px solid #ccc",
                    borderRadius: "4px",
                  }}
                >
                  <Picker onEmojiSelect={handleEmojiSelect} />
                </div>
              )}
            </div>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}
