import { useState, useRef } from "react";

const main_states = () => {
  const [isFocused, setIsFocused] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [selectedEmoji, setSelectedEmoji] = useState(null);
  const [posts, setPosts] = useState([]);
  const [postContent, setPostContent] = useState("");

  const [showSubmitToast, setShowSubmitToast] = useState(false);
  const [toastBoxMessage, setToastBoxMessage] = useState("");
  const [toastBoxTitle, setToastBoxTitle] = useState("");

  return {
    isFocused,
    setIsFocused,
    isLiked,
    setIsLiked,
    showEmojiPicker,
    setShowEmojiPicker,
    selectedEmoji,
    setSelectedEmoji,
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
  };
};

export default main_states;
