"use client";
import React, { useState } from "react";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";

const Main = () => {
  const [isFocused, setIsFocused] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [selectedEmoji, setSelectedEmoji] = useState(null);
  

  const likePost = () => {
    setIsLiked((prevLiked) => {
      const newLikedStatus = !prevLiked;
      console.log("Did it like?:", newLikedStatus);
      return newLikedStatus;
    });
  };

  return (
    <div className="container">
      <main>
        <div id="input-area">
          <img src="/images/maloi.jpg" alt="Profile Image" />
          <span className="input-username">@Maloi</span>
          <textarea
            id="input-thread"
            cols="30"
            rows="1"
            placeholder="Add a hugot..."
            type="text"
            style={{
              fontSize: "20px",
              color: isFocused ? "white" : "gray",
            }}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          ></textarea>
          <button className="publish">Post</button>
          <span className="answer">Anyone can respond</span>
        </div>

        <div id="timeline">
          <div className="tweet">
            <div className="thread">
              <img
                src="/images/maloi.jpg"
                alt="Profile Pic"
                className="rounded-avatar"
              />
              <div className="thread-line"></div>
            </div>

            <div className="content">
              <div className="thread-data">
                <div>
                  <span>Maloi</span>
                  <img
                    src="/images/verified.svg"
                    alt=""
                    style={{ width: "15px", height: "auto" }}
                  />
                </div>
                <div className="info">
                  <span>8h</span>
                  <img src="/images/dots.svg" alt="" />
                </div>
              </div>

              <div className="text">
                <p>Lalake po si chowlong</p>
              </div>

              <div className="icons reactions">
                <div
                  className="emoji-container"
                  onMouseEnter={() => setShowEmojiPicker(true)}
                  onMouseLeave={() => setShowEmojiPicker(false)}
                >
                  {selectedEmoji ? (
                    <span
                      role="img"
                      aria-label={selectedEmoji.name}
                      style={{ fontSize: "24px", cursor: "pointer" }}
                      onClick={() => {
                        setSelectedEmoji(null);
                        setIsLiked(false);
                      }}
                    >
                      {selectedEmoji.native}
                    </span>
                  ) : (
                    <img
                      src={
                        isLiked
                          ? "/images/heart_filled.svg"
                          : "/images/heart.svg"
                      }
                      alt={isLiked ? "Liked" : "Like"}
                      onClick={likePost}
                    />
                  )}
                  {showEmojiPicker && (
                    <Picker
                      data={data}
                      onEmojiSelect={(emoji) => {
                        setSelectedEmoji(emoji);
                        setIsLiked(true);
                        setShowEmojiPicker(false);
                      }}
                      style={{
                        position: "absolute",
                        zIndex: 1000,
                        top: "100%",
                        left: 0,
                      }}
                    />
                  )}
                </div>
                <img src="/images/comment.svg" alt="" />
                <img src="/images/reply.svg" alt="" />
                <img src="/images/share.svg" alt="" />
              </div>

              <div className="interactions">
                <span>2,323 replies</span>
                <span>&#8901;</span>
                <span>32K likes</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Main;
