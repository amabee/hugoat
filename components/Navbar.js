import Image from "next/image";
import React, { useState } from "react";
import NotificationsModal from "./NotificationsModal"; // Adjust the path as needed

const Navbar = () => {
  const [showNotifications, setShowNotifications] = useState(false);

  return (
    <aside style={{ fontSize: "15px", color: "white" }}>
      <div className="menu">
        <div className="row">
          <picture id="logo">
            <Image
              src="/images/goat.svg"
              alt="Threads"
              width={65}
              height={65}
              className="mb-3"
            />
          </picture>
          <h4>WhoGoat</h4>
        </div>
        <ul>
          <li className="sidebar-item">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M2.20653 11.0904C2.07556 11.201 2 11.3637 2 11.5351V21.2383C2 21.5598 2.2606 21.8204 2.58207 21.8204H9V17.8205C9 16.1636 10.3431 14.8205 12 14.8205C13.6569 14.8205 15 16.1636 15 17.8205V21.8204H21.4179C21.7394 21.8204 22 21.5598 22 21.2383V11.5351C22 11.3637 21.9244 11.201 21.7935 11.0904L12.3755 3.1375C12.1587 2.95437 11.8413 2.95437 11.6245 3.1375L2.20653 11.0904Z"
                fill="white"
              />
            </svg>
            Home
          </li>

          <li
            className="sidebar-item"
            onClick={() => setShowNotifications(true)}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3.57671 12.9132L11.243 21.1656C11.6378 21.5905 12.3104 21.5905 12.7051 21.1656L20.3714 12.9132C22.4795 10.6439 22.4795 6.96476 20.3714 4.69552C18.2634 2.42628 14.8455 2.42628 12.7375 4.69552L12.7051 4.73032C12.3104 5.15526 11.6378 5.15526 11.243 4.73032L11.2107 4.69552C9.10262 2.42628 5.68477 2.42628 3.57671 4.69552C1.46865 6.96476 1.46865 10.6439 3.57671 12.9132Z"
                stroke="white"
                strokeWidth="1.99568"
              />
            </svg>
            Notifications
          </li>
          <li className="sidebar-item">
            <img
              src="/images/maloi.jpg"
              alt="Profile Picture"
              className="rounded-avatar"
            />
            Profile
          </li>
        </ul>
      </div>
      <div className="more sidebar-item">
        <svg
          width="24"
          height="25"
          viewBox="0 0 24 25"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M4 5.87036L20 5.87036"
            stroke="white"
            strokeWidth="1.49676"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M4 12.8703L20 12.8703"
            stroke="white"
            strokeWidth="1.49676"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M4 19.8703L20 19.8703"
            stroke="white"
            strokeWidth="1.49676"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        Logout
      </div>

      <NotificationsModal
        show={showNotifications}
        onHide={() => setShowNotifications(false)}
      />
    </aside>
  );
};

export default Navbar;
