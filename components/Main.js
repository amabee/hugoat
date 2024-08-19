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
import { Form } from "react-bootstrap";

const Main = ({ userID }) => {
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
  const [currentID, setCurrentID] = useState();
  const [reactions, setReactions] = useState();

  useEffect(() => {
    getPostsWithReactions();
    setCurrentID(userID);
    getReactions();
  }, [currentID]);

  useEffect(() => {
    AOS.init();
  }, []);

  const addPosts = async () => {
    const formData = new FormData();
    formData.append("operation", "addPost");
    formData.append(
      "json",
      JSON.stringify({
        user_id: currentID,
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
          getPostsWithReactions();
        } else if (res.data === null || res.data.error) {
          ERROR_MESSAGE(
            "Something went wrong getting the posts",
            `${res.data}`
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

  const getPostsWithReactions = async () => {
    setLoading(true);
    try {
      const postsRes = await axios.get(MAIN_ENDPOINT, {
        params: { operation: "getPosts", json: "" },
      });

      if (postsRes.status === 200) {
        if (postsRes.data !== null && postsRes.data.success) {
          const posts = postsRes.data.success;

          const reactionsRes = await axios.get(MAIN_ENDPOINT, {
            params: { operation: "getReactions", json: "" },
          });

          if (reactionsRes.status === 200) {
            if (reactionsRes.data !== null && reactionsRes.data.success) {
              const reactions = reactionsRes.data.success;

              const postsWithReactions = posts.map((post) => {
                const postReactions = reactions.filter(
                  (reaction) => reaction.post_id === post.post_id
                );
                return {
                  ...post,
                  reactions: postReactions,
                  total_reactions: postReactions.length,
                };
              });

              setPosts(postsWithReactions);
            } else {
              ERROR_MESSAGE("Error fetching reactions", `${reactionsRes.data}`);
            }
          } else {
            ERROR_MESSAGE("Status Error", `${reactionsRes.status}`);
          }
        } else {
          ERROR_MESSAGE("Error fetching posts", `${postsRes.data}`);
        }
      } else {
        ERROR_MESSAGE("Status Error", `${postsRes.status}`);
      }
    } catch (error) {
      ERROR_MESSAGE("Exception Error", `${error}`);
    } finally {
      setLoading(false);
    }
  };

  const getReactions = async () => {
    try {
      const res = await axios.get(MAIN_ENDPOINT, {
        params: {
          operation: "getReactions",
          json: "",
        },
      });

      if (res.status === 200) {
        if (res.data !== null && res.data.success) {
          setReactions(res.data.success);
          // console.log(res.data.success);
        } else {
          ERROR_MESSAGE("Error reacting to post", `${res.data}`);
        }
      } else {
        ERROR_MESSAGE("Status Error", `${res.status}`);
      }
    } catch (error) {
      ERROR_MESSAGE("Exceptio Error", `${error}`);
    }
  };

  const selectEmoji = async (index, emoji) => {
    // console.log("Emoji Selected: ", emoji);

    if (emoji) {
      try {
        // Submit the reaction to the server
        await submitReaction(posts[index].post_id, emoji);

        // Update the local state to reflect the new emoji
        setPosts((prevPosts) =>
          prevPosts.map((post, i) =>
            i === index
              ? {
                  ...post,
                  selectedEmoji: emoji.native,
                  isLiked: true,
                  showEmojiPicker: false,
                }
              : post
          )
        );
      } catch (error) {
        // console.error("Error submitting reaction:", error);
        ERROR_MESSAGE("Exception Error", `${error}`);
      }
    }
  };

  const toggleEmojiPicker = (index, show) => {
    setPosts((prevPosts) =>
      prevPosts.map((post, i) =>
        i === index ? { ...post, showEmojiPicker: show } : post
      )
    );
  };

  const submitReaction = async (postId, emoji) => {
    const formData = new FormData();
    formData.append("operation", "reactToPost");
    formData.append(
      "json",
      JSON.stringify({
        post_id: postId,
        user_id: currentID,
        reaction: emoji.native,
      })
    );

    try {
      const res = await axios({
        url: MAIN_ENDPOINT,
        method: "POST",
        data: formData,
      });

      if (res.status === 200) {
        // console.log("Submit Emoji Data: ", res.data);
        if (res.data.success) {
          setToastBoxTitle("Success");
          setToastBoxMessage("Reaction submitted");
          setShowSubmitToast(true);
        } else {
          ERROR_MESSAGE("Error", res.data.error || "Failed to submit reaction");
        }
      } else {
        ERROR_MESSAGE("Status Error", `Status code: ${res.status}`);
      }
    } catch (error) {
      ERROR_MESSAGE("Exception Error", error.message);
    }
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
                          aria-label="User's reaction"
                          style={{ fontSize: "24px", cursor: "pointer" }}
                        >
                          {post.selectedEmoji}
                        </span>
                      ) : post.reactions.find(
                          (reaction) => reaction.user_id === currentID
                        ) ? (
                        <span
                          role="img"
                          aria-label="User's reaction"
                          style={{ fontSize: "24px", cursor: "pointer" }}
                        >
                          {
                            post.reactions.find(
                              (reaction) => reaction.user_id === currentID
                            ).reaction_type
                          }
                        </span>
                      ) : (
                        <img
                          src="/images/heart.svg"
                          alt="Like"
                          onClick={() => toggleEmojiPicker(index, true)}
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
                    <img src="/images/comment.svg" alt="Comment" />
                    <img src="/images/share.svg" alt="Share" />
                  </div>

                  <div className="interactions">
                    <span>0 replies</span>
                    <span> &#8901; </span>
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
