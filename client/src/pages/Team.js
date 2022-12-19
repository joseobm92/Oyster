import React from "react";

const Team = () => {
  return (
    <>
      <section id="instructors" className="p-5 bg-white">
        <div className="container">
          <h2 className="text-center text-white">Our team</h2>
          <p className="lead text-center text-white mb-5">Meet the Team</p>
          <div className="row g-4">
            <div className="col-md-6 col-lg-4">
              <div className="card bg-light">
                <div className="card-body text-center">
                  <img
                    className="rounded-circle mb-3"
                    src="https://randomuser.me/api/portraits/men/11.jpg"
                    alt=""
                  />
                  <h3 className="card-title mb-3">Jose Barreto</h3>
                  <p className="card-text">Full Stack Web Developer</p>
                  <a
                    href="https://twitter.com/AxieBarre"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <i className="bi bi-twitter text-dark mx-1"></i>
                  </a>
                  <a
                    href="https://www.linkedin.com/in/jose-barreto-875087ab/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <i className="bi bi-linkedin text-dark mx-1"></i>
                  </a>
                  <a
                    href="https://github.com/joseobm92"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <i className="bi bi-github text-dark mx-1"></i>
                  </a>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-4">
              <div className="card bg-light">
                <div className="card-body text-center">
                  <img
                    className="rounded-circle mb-3"
                    src="https://randomuser.me/api/portraits/men/18.jpg"
                    alt=""
                  />
                  <h3 className="card-title mb-3">Youssef Ojeil</h3>
                  <p className="card-text">Full Stack Web Developer</p>
                  <a
                    href="https://twitter.com/Gallops_"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <i className="bi bi-twitter text-dark mx-1"></i>
                  </a>
                  <a
                    href="https://www.linkedin.com/in/youssefojeil/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <i className="bi bi-linkedin text-dark mx-1"></i>
                  </a>
                  <a
                    href="https://github.com/youssefojeil"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <i className="bi bi-github text-dark mx-1"></i>
                  </a>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-4">
              <div className="card bg-light">
                <div className="card-body text-center">
                  <img
                    className="rounded-circle mb-3"
                    src="https://randomuser.me/api/portraits/women/15.jpg"
                    alt=""
                  />
                  <h3 className="card-title mb-3">Beth Decarlo</h3>
                  <p className="card-text">Full Stack Web Developer</p>
                  <a href="https://twitter.com/Edec000/">
                    <i className="bi bi-twitter text-dark mx-1"></i>
                  </a>
                  <a href="https://www.linkedin.com/in/bethdecarlo/">
                    <i className="bi bi-linkedin text-dark mx-1"></i>
                  </a>
                  <a
                    href="https://github.com/bethdecarlo"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <i className="bi bi-github text-dark mx-1"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Team;
