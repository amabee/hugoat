"use client";
import { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Picker from "@emoji-mart/react";
import { IMAGE_LINK, MAIN_ENDPOINT } from "@/globals/endpoints";
import axios from "axios";
import { ERROR_MESSAGE, SUCCESS_MESSAGE } from "@/globals/swal";

export default function CommentModal({
  isOpen,
  onClose,
  post_id,
  userID,
  image,
}) {
  const [emojiPickerVisibility, setEmojiPickerVisibility] = useState({});
  const [selectedEmojis, setSelectedEmojis] = useState([]);
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
          getComments();
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

  const reactToComment = async (commentID, reaction) => {
    const formData = new FormData();
    formData.append("operation", "reactToComment");
    formData.append(
      "json",
      JSON.stringify({
        comment_id: commentID,
        user_id: userID,
        reaction: reaction,
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
          SUCCESS_MESSAGE("Success");
          getComments();
        } else {
          ERROR_MESSAGE(
            "Something went wrong reacting to the comment",
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

  const handleEmojiSelect = (emoji, index) => {
    const updatedEmojis = [...selectedEmojis];
    updatedEmojis[index] = emoji.native;
    setSelectedEmojis(updatedEmojis);
    toggleEmojiPicker(index);

    const emojiToReact = emoji.native;
    const commentID = comments[index]?.comment_id;

    if (commentID) {
      reactToComment(commentID, emojiToReact);
    }
  };

  const toggleEmojiPicker = (index) => {
    setEmojiPickerVisibility((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const extractEmoji = (reactionString) => {
    const [emoji] = reactionString.split(":");
    return emoji || "";
  };

  const isUserReaction = (reactionString, userID) => {
    const [, userId] = reactionString.split(":");
    return parseInt(userId, 10) === userID;
  };

  return (
    <Modal
      show={isOpen}
      onHide={onClose}
      centered
      scrollable
      fullscreen={"xl-down"}
      className="modal-xl"
    >
      <Modal.Header closeButton className="bg-secondary">
        <Modal.Title className="text-light">Comments</Modal.Title>
      </Modal.Header>
      <Modal.Body className="bg-dark">
        <div className="d-flex align-items-start border p-3 bg-dark rounded">
          <img
            className="rounded-circle bg-secondary me-3"
            style={{ width: "50px", height: "50px" }}
            src={IMAGE_LINK + image}
          />
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
              <Button
                variant="secondary"
                size="lg"
                className="ms-auto"
                onClick={() => postComment()}
              >
                Submit
              </Button>
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
                <img
                  src={IMAGE_LINK + comment.image}
                  className="rounded-circle bg-secondary me-3"
                  style={{ width: "50px", height: "50px" }}
                />

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
                        style={{
                          fontSize: selectedEmojis[index] ? "2rem" : "initial",
                          lineHeight: "1",
                        }}
                        onClick={() => toggleEmojiPicker(index)}
                      >
                        {comment.reactions
                          ? isUserReaction(comment.reactions, userID)
                            ? extractEmoji(comment.reactions)
                            : "Like"
                          : selectedEmojis[index]
                          ? selectedEmojis[index]
                          : "Like"}
                      </Button>

                      {emojiPickerVisibility[index] && (
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
                          <Picker
                            onEmojiSelect={(emoji) =>
                              handleEmojiSelect(emoji, index)
                            }
                          />
                        </div>
                      )}
                      <p className="text-light fs-5 mb-0">
                        {comment.total_reactions} Likes
                      </p>
                    </div>
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
