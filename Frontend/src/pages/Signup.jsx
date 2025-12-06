import React, { useState, useContext, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import Select from "react-select";
import countryList from "react-select-country-list";
import { AuthContext } from "../AuthContext";
import "react-toastify/dist/ReactToastify.css";

const SignUpForm = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [country, setCountry] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const countryOptions = useMemo(() => countryList().getData(), []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!country) {
      toast.error("Please select your country");
      return;
    }

    setLoading(true);
    try {
      // Register new user
      await axios.post("http://localhost:5000/api/users/register", {
        username,
        email,
        password,
        country: country.value,
      });

      // Auto-login after register
      const loginRes = await axios.post(
        "http://localhost:5000/api/users/login",
        {
          email,
          password,
        }
      );

      const data = loginRes.data;
      localStorage.clear();

      const role = data.role?.toUpperCase() || "USER";
      localStorage.setItem("token", data.token);
      localStorage.setItem("role", role);
      localStorage.setItem("username", data.username);
      localStorage.setItem("email", data.email);

      login(data.token, data);

      toast.success("Welcome aboard 🎉 You’re now logged in!");
      navigate("/");
    } catch (err) {
      if (err.response?.status === 400) {
        toast.error("User already exists. Please login ⚠️");
      } else {
        toast.error("Registration failed. Please try again ❌");
      }
    } finally {
      setLoading(false);
    }
  };

  // Styles (unchanged)
  const styles = {
    box: {
      position: "relative",
      width: "400px",
      height: "200px",
      background: `repeating-conic-gradient(
        from var(--a),
        #22c55e 0%,
        #22c55e 5%,
        transparent 5%,
        transparent 40%,
        #22c55e 50%
      )`,
      filter: "drop-shadow(0 15px 50px #000)",
      borderRadius: "20px",
      animation: "rotating 4s linear infinite",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      transition: "0.5s",
      "--a": "0deg",
    },
    signup: {
      position: "absolute",
      inset: "60px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      borderRadius: "10px",
      background: "#00000033",
      color: "#fff",
      zIndex: 1000,
      boxShadow: "inset 0 10px 20px #00000080",
      borderBottom: "2px solid #ffffff80",
      transition: "0.5s",
      overflow: "hidden",
    },
    signupBx: {
      position: "relative",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: "20px",
      width: "70%",
      transform: "translateY(90px)",
      transition: "0.5s",
    },
    form: {
      display: "flex",
      flexDirection: "column",
      gap: "20px",
      width: "100%",
    },
    h2: {
      textTransform: "uppercase",
      fontWeight: 600,
      letterSpacing: "0.3em",
      margin: 0,
      marginTop: "25px",
      marginBottom: "22px",
      fontFamily: '"Poppins", sans-serif',
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "10px",
      fontSize: "2em",
      userSelect: "none",
    },
    icon: {
      color: "#22c55e",
      textShadow: "0 0 5px #22c55e, 0 0 20px #22c55e",
    },
    input: {
      width: "100%",
      padding: "10px 20px",
      outline: "none",
      fontSize: "1em",
      color: "#fff",
      background: "#0000001a",
      border: "2px solid #fff",
      borderRadius: "30px",
      boxSizing: "border-box",
      fontFamily: '"Poppins", sans-serif',
    },
    submitButton: {
      width: "100%",
      padding: "10px 20px",
      outline: "none",
      border: "none",
      fontSize: "1em",
      background: "#22c55e",
      fontWeight: 500,
      color: "#111",
      cursor: "pointer",
      transition: "0.5s",
      borderRadius: "30px",
      boxSizing: "border-box",
      fontFamily: '"Poppins", sans-serif',
    },
    group: {
      width: "100%",
      display: "flex",
      justifyContent: "space-between",
    },
    link: {
      color: "#fff",
      textDecoration: "none",
      fontFamily: '"Poppins", sans-serif',
    },
    linkSecondary: {
      color: "#22c55e",
      fontWeight: 600,
      textDecoration: "none",
      fontFamily: '"Poppins", sans-serif',
    },
  };

  return (
    <>
      <style>{`
        @property --a {
          syntax: "<angle>";
          inherits: false;
          initial-value: 0deg;
        }
        @keyframes rotating {
          0% { --a: 0deg; }
          100% { --a: 360deg; }
        }
        .animated-box::before {
          content: "";
          position: absolute;
          width: 100%;
          height: 100%;
          background: repeating-conic-gradient(
            from var(--a),
            #22c55e 0%,
            #22c55e 5%,
            transparent 5%,
            transparent 40%,
            #22c55e 50%
          );
          filter: drop-shadow(0 15px 50px #000);
          border-radius: 20px;
          animation: rotating 4s linear infinite;
          animation-delay: -1s;
        }
        .animated-box::after {
          content: "";
          position: absolute;
          inset: 4px;
          background: #2d2d39;
          border-radius: 15px;
          border: 8px solid #25252b;
        }
        .animated-box:hover {
          width: 450px !important;
          height: 500px !important;
        }
        .animated-box:hover .signup-container {
          inset: 40px !important;
        }
        .animated-box:hover .signup-box {
          transform: translateY(0px) !important;
        }
        .submit-btn:hover {
          box-shadow: 0 0 10px #22c55e, 0 0 60px #22c55e !important;
        }
        .signup-box .input-field,
        .signup-box .submit-btn,
        .signup-box .group {
          opacity: 0;
          pointer-events: none;
          transition: opacity 0.5s ease;
        }
        .animated-box:hover .signup-box .input-field,
        .animated-box:hover .signup-box .submit-btn,
        .animated-box:hover .signup-box .group {
          opacity: 1;
          pointer-events: auto;
        }
      `}</style>

      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          minWidth: "100vw",
          minHeight: "100vh",
          width: "100vw",
          height: "100vh",
          objectFit: "cover",
          zIndex: 0,
          pointerEvents: "none",
        }}
      >
        <source src="/assets/videos/Login BG.mp4" type="video/mp4" />
      </video>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
          width: "100vw",
          background: "rgba(24,24,30,0.85)",
          position: "relative",
          zIndex: 1,
        }}
      >
        <div className="animated-box" style={styles.box}>
          <div className="signup-container" style={styles.signup}>
            <h2 style={styles.h2}>
              <i className="fa-solid fa-user-plus" style={styles.icon}></i> Sign
              Up
            </h2>

            <div className="signup-box" style={styles.signupBx}>
              <form
                onSubmit={handleSubmit}
                style={styles.form}
                autoComplete="on"
              >
                <input
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  style={styles.input}
                  required
                />
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={styles.input}
                  required
                />
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={styles.input}
                  required
                />

                {/* Country Select with Flags */}
                {/* Country Select with Flags */}
                <div style={{ width: "100%" }}>
                  <Select
                    options={countryOptions.map((option) => ({
                      ...option,
                      label: (
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "8px",
                          }}
                        >
                          <img
                            src={`https://flagcdn.com/24x18/${option.value.toLowerCase()}.png`}
                            alt={option.label}
                            width="20"
                            height="14"
                            style={{ borderRadius: "3px" }}
                          />
                          <span style={{ color: "#fff", fontSize: "14px" }}>
                            {option.label}
                          </span>
                        </div>
                      ),
                    }))}
                    value={country}
                    onChange={setCountry}
                    placeholder="Select your country"
                    styles={{
                      control: (base) => ({
                        ...base,
                        backgroundColor: "rgba(0,0,0,0.3)",
                        border: "1.5px solid #22c55e",
                        borderRadius: "30px",
                        color: "#fff",
                        fontSize: "14px",
                        minHeight: "38px",
                        paddingLeft: "4px",
                        boxShadow: "none",
                      }),
                      menu: (base) => ({
                        ...base,
                        backgroundColor: "#111",
                        borderRadius: "10px",
                        fontSize: "13px",
                        color: "#fff",
                        maxHeight: "160px",
                        overflowY: "auto",
                        zIndex: 9999,
                      }),
                      option: (base, state) => ({
                        ...base,
                        backgroundColor: state.isFocused
                          ? "rgba(34,197,94,0.2)"
                          : "transparent",
                        color: "#fff",
                        cursor: "pointer",
                        padding: "6px 10px",
                      }),
                      singleValue: (base) => ({
                        ...base,
                        color: "#fff",
                      }),
                      input: (base) => ({
                        ...base,
                        color: "#fff",
                      }),
                    }}
                  />
                </div>

                <input
                  type="submit"
                  value={loading ? "Registering..." : "Sign Up"}
                  disabled={loading}
                  style={{
                    ...styles.submitButton,
                    opacity: loading ? 0.7 : 1,
                    cursor: loading ? "not-allowed" : "pointer",
                  }}
                  className="submit-btn"
                />
              </form>

              <div style={styles.group} className="group">
                <Link to="/login" style={styles.link}>
                  Already have an account?
                </Link>
                <Link to="/" style={styles.linkSecondary}>
                  Go Home
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUpForm;
