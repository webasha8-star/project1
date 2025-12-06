import React, { useEffect, useState, useContext, useMemo } from "react";
import axios from "axios";
import { AuthContext } from "../AuthContext";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Select from "react-select";
import countryList from "react-select-country-list";

const Profile = () => {
  const { token, isLoggedIn, logout } = useContext(AuthContext);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [updatedUser, setUpdatedUser] = useState({});
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const navigate = useNavigate();

  // ✅ Country dropdown data
  const countryOptions = useMemo(() => countryList().getData(), []);

  // ✅ Fetch user profile
  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
      return;
    }

    const fetchUser = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/users/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(res.data);
        setUpdatedUser(res.data);
      } catch (error) {
        console.error("Error fetching user profile:", error);
        toast.error("Failed to load profile data");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [isLoggedIn, token, navigate]);

  // ✅ Handle profile update
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(
        "http://localhost:5000/api/users/update-profile",
        updatedUser,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setUser(res.data);
      setEditMode(false);
      toast.success("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile");
    }
  };

  // ✅ Handle image selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  // ✅ Upload image to backend
  const handleImageUpload = async () => {
    if (!selectedImage) {
      toast.warning("Please select an image first.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("image", selectedImage);

      const res = await axios.post(
        `http://localhost:5000/api/upload-profile/${user.id}`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      setUser({
        ...user,
        image: res.data.user.image,
      });
      setPreviewImage(null);
      setSelectedImage(null);

      toast.success("Profile image uploaded successfully!");
    } catch (error) {
      console.error("Error uploading image:", error);
      toast.error("Failed to upload image");
    }
  };

  if (loading)
    return (
      <h2 style={{ color: "#00ff41", textAlign: "center", marginTop: "100px" }}>
        Loading Profile...
      </h2>
    );

  if (!user)
    return (
      <h2 style={{ color: "red", textAlign: "center", marginTop: "100px" }}>
        User not found
      </h2>
    );

  // ✅ Helper to show flag with name
  const getFlag = (code) =>
    code ? (
      <img
        src={`https://flagcdn.com/24x18/${code.toLowerCase()}.png`}
        alt={code}
        style={{
          width: "22px",
          height: "16px",
          borderRadius: "3px",
          marginRight: "8px",
          verticalAlign: "middle",
        }}
      />
    ) : null;

  return (
    <>
      <Header />

      <div
        style={{
          minHeight: "100vh",
          backgroundColor: "#000",
          color: "#fff",
          fontFamily: '"Poppins", sans-serif',
          paddingTop: "140px",
          paddingBottom: "50px",
        }}
      >
        <div
          style={{
            maxWidth: "700px",
            margin: "0 auto",
            background: "#101012",
            borderRadius: "14px",
            padding: "40px",
            boxShadow: "0 0 20px rgba(0,255,65,0.15)",
            border: "1px solid #0FA30F",
          }}
        >
          <h1
            style={{
              color: "#00ff41",
              fontWeight: "bold",
              fontSize: "2rem",
              textAlign: "center",
              marginBottom: "30px",
            }}
          >
            MY PROFILE
          </h1>

          {/* ✅ Profile Image with Camera Overlay (unchanged) */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginBottom: "30px",
              position: "relative",
            }}
          >
            <div
              style={{
                position: "relative",
                width: "130px",
                height: "130px",
                borderRadius: "50%",
                overflow: "hidden",
                border: "3px solid #00ff41",
                boxShadow: "0 0 15px rgba(0,255,65,0.3)",
                backgroundColor: "#0c0c0c",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "2.5rem",
                fontWeight: "bold",
                color: "#00ff41",
              }}
            >
              {previewImage || user.image ? (
                <img
                  src={
                    previewImage
                      ? previewImage
                      : `http://localhost:5000${user.image}?t=${Date.now()}`
                  }
                  alt="Profile"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              ) : (
                <span>{user.username?.charAt(0).toUpperCase()}</span>
              )}

              {/* 📸 Camera Icon Overlay */}
              <label
                htmlFor="imageUpload"
                style={{
                  position: "absolute",
                  bottom: "8px",
                  right: "8px",
                  backgroundColor: "rgba(0,0,0,0.7)",
                  borderRadius: "50%",
                  width: "36px",
                  height: "36px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  transition: "background 0.3s ease",
                }}
                title="Change profile picture"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="#00ff41"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 5c-3.859 0-7 3.141-7 7s3.141 7 7 7 7-3.141 7-7-3.141-7-7-7zm0-3c5.514 0 10 4.486 10 10s-4.486 10-10 10S2 17.514 2 12 6.486 2 12 2zm-1 5h2v3h3v2h-3v3h-2v-3H8v-2h3V7z" />
                </svg>
                <input
                  id="imageUpload"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  style={{ display: "none" }}
                />
              </label>
            </div>
          </div>

          {selectedImage && (
            <div style={{ textAlign: "center", marginBottom: "25px" }}>
              <button
                onClick={handleImageUpload}
                style={{
                  background: "#00ff41",
                  color: "#000",
                  border: "none",
                  borderRadius: "6px",
                  padding: "8px 18px",
                  fontWeight: "bold",
                  cursor: "pointer",
                }}
              >
                Upload Image
              </button>
            </div>
          )}

          {/* ✅ Profile Info */}
          {!editMode ? (
            <div style={{ textAlign: "center" }}>
              <p>
                <strong style={{ color: "#0FA30F" }}>Username:</strong>{" "}
                {user.username}
              </p>
              <p>
                <strong style={{ color: "#0FA30F" }}>Email:</strong>{" "}
                {user.email}
              </p>
              <p>
                <strong style={{ color: "#0FA30F" }}>Country:</strong>{" "}
                {user.country ? (
                  <>
                    {getFlag(user.country)}{" "}
                    {new Intl.DisplayNames(["en"], { type: "region" }).of(
                      user.country
                    )}
                  </>
                ) : (
                  "Not specified"
                )}
              </p>
              <p>
                <strong style={{ color: "#0FA30F" }}>Role:</strong>{" "}
                <span
                  style={{
                    color:
                      user.role?.toUpperCase() === "ADMIN"
                        ? "#00ff41"
                        : "rgba(255,255,255,0.7)",
                    textTransform: "capitalize",
                  }}
                >
                  {user.role
                    ? user.role.charAt(0) + user.role.slice(1).toLowerCase()
                    : "User"}
                </span>
              </p>
              <p>
                <strong style={{ color: "#0FA30F" }}>Joined:</strong>{" "}
                {new Date(user.createdAt).toLocaleDateString()}
              </p>

              <div style={{ marginTop: "25px" }}>
                <button
                  onClick={() => setEditMode(true)}
                  style={{
                    background: "#00ff41",
                    border: "none",
                    color: "#000",
                    fontWeight: "bold",
                    padding: "10px 24px",
                    borderRadius: "6px",
                    cursor: "pointer",
                    marginRight: "15px",
                  }}
                >
                  Edit Profile
                </button>
                <button
                  onClick={() => {
                    logout();
                    navigate("/");
                  }}
                  style={{
                    background: "red",
                    border: "none",
                    color: "#fff",
                    fontWeight: "bold",
                    padding: "10px 24px",
                    borderRadius: "6px",
                    cursor: "pointer",
                  }}
                >
                  Logout
                </button>
              </div>
            </div>
          ) : (
            // ✅ Edit Mode (with country dropdown)
            <form
              onSubmit={handleUpdate}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "16px",
                color: "#fff",
              }}
            >
              <label>
                Username:
                <input
                  type="text"
                  value={updatedUser.username}
                  onChange={(e) =>
                    setUpdatedUser({ ...updatedUser, username: e.target.value })
                  }
                  style={{
                    width: "100%",
                    padding: "10px",
                    borderRadius: "6px",
                    border: "1px solid #0FA30F",
                    background: "#0c0c0c",
                    color: "#fff",
                    marginTop: "5px",
                  }}
                />
              </label>

              <label>
                Email:
                <input
                  type="email"
                  value={updatedUser.email}
                  onChange={(e) =>
                    setUpdatedUser({ ...updatedUser, email: e.target.value })
                  }
                  style={{
                    width: "100%",
                    padding: "10px",
                    borderRadius: "6px",
                    border: "1px solid #0FA30F",
                    background: "#0c0c0c",
                    color: "#fff",
                    marginTop: "5px",
                  }}
                />
              </label>

              {/* ✅ Country Dropdown */}
              <label>
                Country:
                <Select
                  options={countryOptions}
                  value={
                    countryOptions.find(
                      (opt) => opt.value === updatedUser.country
                    ) || null
                  }
                  onChange={(selected) =>
                    setUpdatedUser({
                      ...updatedUser,
                      country: selected?.value,
                    })
                  }
                  styles={{
                    control: (base) => ({
                      ...base,
                      backgroundColor: "#0c0c0c",
                      border: "1px solid #0FA30F",
                      color: "#fff",
                    }),
                    singleValue: (base) => ({
                      ...base,
                      color: "#fff",
                    }),
                    menu: (base) => ({
                      ...base,
                      backgroundColor: "#111",
                      color: "#fff",
                      zIndex: 9999,
                    }),
                  }}
                  placeholder="Select your country"
                />
              </label>

              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  gap: "15px",
                  marginTop: "25px",
                }}
              >
                <button
                  type="submit"
                  style={{
                    background: "#00ff41",
                    border: "none",
                    color: "#000",
                    fontWeight: "bold",
                    padding: "10px 24px",
                    borderRadius: "6px",
                    cursor: "pointer",
                  }}
                >
                  Save Changes
                </button>
                <button
                  type="button"
                  onClick={() => setEditMode(false)}
                  style={{
                    background: "gray",
                    border: "none",
                    color: "#fff",
                    fontWeight: "bold",
                    padding: "10px 24px",
                    borderRadius: "6px",
                    cursor: "pointer",
                  }}
                >
                  Cancel
                </button>
              </div>
            </form>
          )}
        </div>
      </div>

      <ToastContainer position="top-center" autoClose={2000} theme="dark" />
    </>
  );
};

export default Profile;
