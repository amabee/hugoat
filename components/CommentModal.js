"use client";
import { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Picker from "@emoji-mart/react";
import { MAIN_ENDPOINT } from "@/globals/endpoints";
import axios from "axios";
import { ERROR_MESSAGE, SUCCESS_MESSAGE } from "@/globals/swal";

export default function CommentModal({ isOpen, onClose, post_id, userID }) {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [selectedEmoji, setSelectedEmoji] = useState(null);
  const [comments, setComments] = useState([]);
  const [myComment, setMyComment] = useState("");

  const getComments = async () => {
    try {
      const res = await axios.get(MAIN_ENDPOINT, {
        params: {
          operation: "getComments",
          json: JSON.stringify({
            post_id: post_id,
          }),
        },
      });

      if (res.status === 200) {
        if (res.data !== null && res.data.success) {
          setComments(res.data.success);
          console.log(res.data.success);
        } else {
          setComments([]);
          ERROR_MESSAGE("Error", "Failed to fetch comments");
        }
      } else {
        ERROR_MESSAGE("Status Error", `${res.status}`);
      }
    } catch (error) {
      ERROR_MESSAGE("Exception Error while fetching comments", `${error}`);
    }
  };

  const postComment = async () => {
    const formData = new FormData();
    formData.append("operation", "postComment");
    formData.append(
      "json",
      JSON.stringify({
        user_id: userID,
        post_id: post_id,
        comment: myComment,
      })
    );

    try {
      const res = await axios({
        url: MAIN_ENDPOINT,
        method: "POST",
        data: formData,
      });

      if (res.status === 200) {
        if (res.data !== null && res.data.success) {
          SUCCESS_MESSAGE("Success", "Commented");
          setMyComment("");
        } else {
          ERROR_MESSAGE(
            "Something went wrong posting your comment",
            `${res.data}`
          );
        }
      } else {
        ERROR_MESSAGE("Status Error", `${res.status}`);
      }
    } catch (error) {}
  };

  useEffect(() => {
    if (isOpen) {
      getComments();
    }
  }, [isOpen]);

  const handleEmojiSelect = (emoji) => {
    setSelectedEmoji(emoji.native);
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
              className="form-control bg-secondary text-light border-0 fs-3"
              cols={10}
              rows={5}
              placeholder="Write a comment..."
              value={myComment}
              onChange={(e) => setMyComment(e.target.value)}
            />
            <div className="d-flex mt-2 position-relative">
              <p className="text-light fs-5">1 likes</p>
              <Button
                variant="secondary"
                size="lg"
                className="ms-auto"
                onClick={() => postComment()}
              >
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

        <div className="mt-3">
          {comments.length > 0 ? (
            comments.map((comment, index) => (
              <div
                className="d-flex align-items-start border p-3 bg-dark rounded mb-3"
                key={index}
              >
                <div
                  className="rounded-circle bg-secondary me-3"
                  style={{ width: "50px", height: "50px" }}
                ></div>
                <div className="flex-grow-1">
                  <div className="mb-3 mt-3 text-light">
                    <h3>@{comment.username}</h3>
                  </div>
                  <p className="text-light fs-3">{comment.comment_content}</p>{" "}
                  <div className="d-flex mt-2 position-relative">
                    <div className="d-flex align-items-center">
                      <Button
                        variant="secondary"
                        size="lg"
                        className="me-2"
                        onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                      >
                        {selectedEmoji ? selectedEmoji : "Like"}
                      </Button>
                      <p className="text-light fs-5 mb-0">1 likes</p>
                    </div>

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
            ))
          ) : (
            <p className="text-light">No comments yet.</p>
          )}
        </div>
      </Modal.Body>
    </Modal>
  );
}
