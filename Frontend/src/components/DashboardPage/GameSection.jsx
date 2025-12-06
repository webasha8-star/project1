import React from "react";

const GameSection = () => {
  const games = [
    {
      id: 1,
      image: "Learn By Doing Enhanced.png",
      delay: "0.3s",
      tagline: "Learn by Doing",
      subtitle: "Complete hands-on labs that mirror OSCP-style exams.",
    },
    {
      id: 2,
      image: "OSCP Pathway Enhanced.png",
      delay: "0.4s",
      tagline: "OSCP Learning Paths",
      subtitle:
        "Follow Certificated based training from beginner to expert. ",
    },
    {
      id: 3,
      image: "Real Vulnerabilities 3 Enhanced.png",
      delay: "0.6s",
      tagline: "Real Vulnerabilities",
      subtitle:
        "Explore Machines with realistic isconfigurations and exploits.",
    },
    {
      id: 4,
      image: "Report Enhanced.png",
      delay: "0.8s",
      tagline: "Auto Report Generator ",
      subtitle:
        "Creater OSCP-style reports based on your lab performance. ",
    },
    {
      id: 5,
      image: "Skills Progress Tracker Enhanced.png",
      delay: "0.2s",
      tagline: "Skill Progress Tracker",
      subtitle:
        "Visualize Growth across red teaming skill categories.",
    },
    {
      id: 6,
      image: "Flexible Digital Labs 2 Enhanced.png",
      delay: "0.4s",
      tagline: "Flexible On-Demand Labs",
      subtitle: "Learn at your own pace-anytime,anywhere.",
    },
  ];

  const topGames = games.slice(0, 3);
  const bottomGames = games.slice(3, 6);

  // Updated, darker and clearer text shadow for subtitle
  const subtitleShadow = {
    textShadow:
      "0 12px 48px rgba(0,0,0,0.9), 0 8px 32px rgba(0,0,0,0.85), 0 4px 16px rgba(0,0,0,0.8), 0 0 12px rgba(0,0,0,0.7)",
  };

  return (
    <section className="gt-game-section section-padding fix">
      <div className="container-fluid">
        <div className="gt-section-title-2 text-center">
          <h2 className="tx-title sec_title tz-itm-title tz-itm-anim">
            Why CrackMeNow?
          </h2>
          <h6 className="subtitle tz-sub-tilte tz-sub-anim tx-subTitle">
            CrackMeNow offers purpose-built-style training labs, real-world
            scenarios and tools to track your skills and readiness. Everything
            you need to pass the OSCP and grow as a pentester.
          </h6>
        </div>
        <div className="row">
          {topGames.map((game) => (
            <div
              key={game.id}
              className="col-xl-4 col-lg-4 col-md-6 wow fadeInUp"
              data-wow-delay={game.delay}
            >
              <div
                className="gt-gaming-card-item"
                style={{ cursor: "default" }}
              >
                <div className="gt-gaming-image">
                  <img
                    src={`/assets/img/home-1/game/${game.image}`}
                    alt="img"
                  />
                  <div className="gt-gaming-content">
                    <h6>{game.tagline}</h6>
                    <h3 style={subtitleShadow}>
                      {game.subtitle}
                    </h3>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="row mt-4">
          {bottomGames.map((game) => (
            <div
              key={game.id}
              className="col-xl-4 col-lg-4 col-md-6 wow fadeInUp"
              data-wow-delay={game.delay}
            >
              <div
                className="gt-gaming-card-item"
                style={{ cursor: "default" }}
              >
                <div className="gt-gaming-image">
                  <img
                    src={`/assets/img/home-1/game/${game.image}`}
                    alt="img"
                  />
                  <div className="gt-gaming-content">
                    <h6>{game.tagline}</h6>
                    <h3 style={subtitleShadow}>
                      {game.subtitle}
                    </h3>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GameSection;
