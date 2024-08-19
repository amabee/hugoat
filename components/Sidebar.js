import React from "react";

const Sidebar = () => {
  return (
    <section className="suggestions">
      <div className="suggestions-fy">
        <div className="title-suggestions">
          <p>Users you may know</p>

          <p>See All</p>
        </div>

        <ul>
          <li>
            <div className="user-info">
              <img
                src="/images/maloi.jpg"
                alt="user image"
                className="rounded-avatar"
                style={{ width: "45px", height: "45px" }}
              />

              <div>
                <p>@Maloicco</p>

                <p>Suggested for you</p>
              </div>
            </div>

            <button type="button" className="btn-follow">
              Follow
            </button>
          </li>
        </ul>
      </div>
    </section>
  );
};

export default Sidebar;
