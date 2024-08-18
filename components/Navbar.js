import Image from "next/image";
import React from "react";
const Navbar = () => {
  return (
    <aside>
      <div class="menu">
        <div className="row">
          <picture id="logo">
            <Image
              src="/images/goat.svg"
              alt="Threads"
              width={65}
              height={65}
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
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M2.20653 11.0904C2.07556 11.201 2 11.3637 2 11.5351V21.2383C2 21.5598 2.2606 21.8204 2.58207 21.8204H9V17.8205C9 16.1636 10.3431 14.8205 12 14.8205C13.6569 14.8205 15 16.1636 15 17.8205V21.8204H21.4179C21.7394 21.8204 22 21.5598 22 21.2383V11.5351C22 11.3637 21.9244 11.201 21.7935 11.0904L12.3755 3.1375C12.1587 2.95437 11.8413 2.95437 11.6245 3.1375L2.20653 11.0904Z"
                fill="white"
              />
            </svg>
            Home
          </li>
          <li className="sidebar-item">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M3.99135 10.9762C3.99135 7.11859 7.11859 3.99135 10.9762 3.99135C14.8339 3.99135 17.9611 7.11859 17.9611 10.9762C17.9611 14.8339 14.8339 17.9611 10.9762 17.9611C7.11859 17.9611 3.99135 14.8339 3.99135 10.9762ZM10.9762 1.99567C6.0164 1.99567 1.99567 6.0164 1.99567 10.9762C1.99567 15.9361 6.0164 19.9568 10.9762 19.9568C13.3579 19.9568 15.5231 19.0296 17.1305 17.5166C17.1664 17.5703 17.2081 17.6214 17.2555 17.6689L21.2469 21.6602C21.6366 22.0499 22.2684 22.0499 22.6581 21.6602C23.0477 21.2705 23.0477 20.6387 22.6581 20.2491L18.6667 16.2577C18.5816 16.1726 18.4849 16.106 18.3817 16.0581C19.3753 14.613 19.9568 12.8625 19.9568 10.9762C19.9568 6.0164 15.9361 1.99567 10.9762 1.99567Z"
                fill="white"
              />
            </svg>
            Search
          </li>
          <li className="sidebar-item">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M7.98269 1.99573C4.67615 1.99573 1.99567 4.67621 1.99567 7.98275V15.9654C1.99567 19.272 4.67615 21.9525 7.98269 21.9525H15.9654C19.2719 21.9525 21.9524 19.272 21.9524 15.9654V7.98275C21.9524 4.67621 19.2719 1.99573 15.9654 1.99573H7.98269ZM3.99134 7.98275C3.99134 5.77839 5.77833 3.9914 7.98269 3.9914H15.9654C18.1697 3.9914 19.9567 5.77839 19.9567 7.98275V15.9654C19.9567 18.1698 18.1697 19.9568 15.9654 19.9568H7.98269C5.77833 19.9568 3.99134 18.1698 3.99134 15.9654V7.98275ZM12.9719 7.98275C12.9719 7.43166 12.5251 6.98491 11.974 6.98491C11.4229 6.98491 10.9762 7.43166 10.9762 7.98275V10.9763H7.98269C7.4316 10.9763 6.98485 11.423 6.98485 11.9741C6.98485 12.5252 7.4316 12.9719 7.98269 12.9719H10.9762V15.9654C10.9762 16.5165 11.4229 16.9633 11.974 16.9633C12.5251 16.9633 12.9719 16.5165 12.9719 15.9654V12.9719H15.9654C16.5165 12.9719 16.9632 12.5252 16.9632 11.9741C16.9632 11.423 16.5165 10.9763 15.9654 10.9763H12.9719V7.98275Z"
                fill="white"
              />
            </svg>
            Create
          </li>
          <li className="sidebar-item">
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
                stroke-width="1.99568"
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
      <div class="more sidebar-item">
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
            stroke-width="1.49676"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M4 12.8703L20 12.8703"
            stroke="white"
            stroke-width="1.49676"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M4 19.8703L20 19.8703"
            stroke="white"
            stroke-width="1.49676"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
        Logout
      </div>
    </aside>
  );
};

export default Navbar;
