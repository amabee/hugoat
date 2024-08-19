"use client";
import React, { useState, useEffect } from "react";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import main_states from "@/system_states/main_states";
import { MAIN_ENDPOINT } from "@/globals/endpoints";
import { ERROR_MESSAGE, SUCCESS_MESSAGE } from "@/globals/swal";
import axios from "axios";
import ToastBox from "@/globals/toasts";
import AOS from "aos";

const Main = () => {
  const {
    isFocused,
    setIsFocused,
    posts,
    setPosts,
    postContent,
    setPostContent,
    showSubmitToast,
    setShowSubmitToast,
    toastBoxMessage,
    setToastBoxMessage,
    toastBoxTitle,
    setToastBoxTitle,
  } = main_states();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AOS.init();
  }, []);

  const addPosts = async () => {
    const formData = new FormData();
    formData.append("operation", "addPost");
    formData.append(
      "json",
      JSON.stringify({
        user_id: "1001",
        post_content: postContent,
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
          setToastBoxTitle("Success");
          setToastBoxMessage("Post created");
          setShowSubmitToast(true);
          setPostContent("");
          getPosts(); // Refresh the posts after adding a new one
        } else if (res.data !== null || res.data.error) {
          ERROR_MESSAGE(
            "Something went wrong getting the posts",
            `${res.data.error}`
          );
        } else {
          ERROR_MESSAGE("Unknown Error", "An unknown error occurred");
        }
      } else {
        ERROR_MESSAGE("Status error", `${res.status}`);
      }
    } catch (error) {
      ERROR_MESSAGE("Exception Error at addPosts", `${error}`);
    }
  };

  const getPosts = async () => {
    setLoading(true);
    try {
      const res = await axios.get(MAIN_ENDPOINT, {
        params: {
          operation: "getPosts",
          json: "",
        },
      });

      if (res.status === 200) {
        if (res.data !== null && res.data.success) {
          const postsWithStates = res.data.success.map((post) => ({
            ...post,
            isLiked: false,
            showEmojiPicker: false,
            selectedEmoji: null,
          }));
          setPosts(postsWithStates);
        } else if (res.data === null || res.data.error) {
          ERROR_MESSAGE(
            "Something went wrong fetching posts",
            `${res.data.error}`
          );
        } else {
          ERROR_MESSAGE(
            "Unknown Error",
            "An unknown error occurred while fetching posts"
          );
        }
      } else {
        ERROR_MESSAGE("Status Error", `${res.status}`);
      }
    } catch (error) {
      ERROR_MESSAGE("Exception Error Getting Posts", `${error}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getPosts();
  }, []);

  const likePost = (index) => {
    setPosts((prevPosts) =>
      prevPosts.map((post, i) =>
        i === index ? { ...post, isLiked: !post.isLiked } : post
      )
    );
  };

  const selectEmoji = (index, emoji) => {
    setPosts((prevPosts) =>
      prevPosts.map((post, i) =>
        i === index
          ? {
              ...post,
              selectedEmoji: emoji,
              isLiked: true,
              showEmojiPicker: false,
            }
          : post
      )
    );
  };

  const toggleEmojiPicker = (index, show) => {
    setPosts((prevPosts) =>
      prevPosts.map((post, i) =>
        i === index ? { ...post, showEmojiPicker: show } : post
      )
    );
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
            rows="10"
            placeholder="Add a hugot..."
            type="text"
            style={{
              fontSize: "20px",
              color: isFocused ? "white" : "gray",
            }}
            value={postContent}
            onChange={(e) => setPostContent(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          ></textarea>
          <button className="publish" type="button" onClick={addPosts}>
            Post
          </button>
          <span className="answer">Anyone can respond</span>
        </div>

        <div id="timeline">
          {loading ? (
            <div
              className="loading"
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "50vh",
              }}
            >
              <img src="/images/loader.gif" alt="Loading..." />
            </div>
          ) : (
            posts.map((post, index) => (
              <div className="tweet" key={index}>
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
                      <span>@{post.username}</span>
                      <img
                        src="/images/verified.svg"
                        alt=""
                        style={{ width: "15px", height: "auto" }}
                      />
                    </div>
                    <div className="info">
                      <span>
                        {new Date(post.created_at).toLocaleTimeString()}
                      </span>
                      <img src="/images/dots.svg" alt="" />
                    </div>
                  </div>

                  <div className="text">
                    <p>{post.post_content}</p>
                  </div>

                  <div className="icons reactions">
                    <div
                      className="emoji-container"
                      onMouseEnter={() => toggleEmojiPicker(index, true)}
                      onMouseLeave={() => toggleEmojiPicker(index, false)}
                    >
                      {post.selectedEmoji ? (
                        <span
                          role="img"
                          aria-label={post.selectedEmoji.name}
                          style={{ fontSize: "24px", cursor: "pointer" }}
                          onClick={() => selectEmoji(index, null)}
                        >
                          {post.selectedEmoji.native}
                        </span>
                      ) : (
                        <img
                          src={
                            post.isLiked
                              ? "/images/heart_filled.svg"
                              : "/images/heart.svg"
                          }
                          alt={post.isLiked ? "Liked" : "Like"}
                          onClick={() => likePost(index)}
                        />
                      )}
                      {post.showEmojiPicker && (
                        <Picker
                          data={data}
                          onEmojiSelect={(emoji) => selectEmoji(index, emoji)}
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
                    <img src="/images/share.svg" alt="" />
                  </div>

                  <div className="interactions">
                    <span>0 replies</span>
                    <span>{' '}&#8901;{' '}</span>
                    <span>{post.total_reactions} likes</span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        <div
          className="container"
          style={{
            position: "fixed",
            bottom: "5rem",
            right: "1rem",
            zIndex: "1050",
          }}
        >
          <ToastBox
            show={showSubmitToast}
            onClose={() => setShowSubmitToast(false)}
            title={toastBoxTitle}
            message={toastBoxMessage}
          />
        </div>
      </main>
    </div>
  );
};

export default Main;
