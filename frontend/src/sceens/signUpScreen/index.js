import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../features/user/userActions";
import { Link } from "react-router-dom";
import { RotateLoader } from "react-spinners";
import { AiFillEyeInvisible } from "react-icons/ai";
import { AiFillEye } from "react-icons/ai";
import { ClipLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";
import "./index.scss";

export default function SignUp() {
  const [loadingScreen, setLoadingScreen] = useState(true);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const { loading, success, error } = useSelector((state) => state.user);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const loadScreenData = async () => {
      await new Promise((resolve) => setTimeout(resolve, 1500));

      setLoadingScreen(false);
    };

    loadScreenData();
  }, []);

  useEffect(() => {
    if (success) {
      navigate("/login");
    }
  }, [navigate, success]);

  const handleVisibilityIcon = () => {
    setPasswordVisible(true);

    if (passwordVisible === true) {
      setPasswordVisible(false);
    }
  };

  const handleSumbit = (e) => {
    e.preventDefault();

    const data = { email, password, firstName, lastName };
    dispatch(registerUser(data));
  };

  return (
    <main className="signup-wrapper">
      {loadingScreen ? (
        <div className="loading-container">
          {" "}
          <RotateLoader color="#00bc77" />
        </div>
      ) : (
        <div className="sign-up-content ">
          <form onSubmit={handleSumbit}>
            <p className={error ? "errorMsg" : "offScreen"}>
              Email already exists
            </p>
            <div className="input-wrapper">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                autoComplete="off"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                required
              />
            </div>
            <div className="input-wrapper">
              <label htmlFor="password">Password</label>

              <div className="password-input-wrapper">
                <input
                  type={passwordVisible ? "text" : "password"}
                  id="password"
                  autoComplete="off"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  required
                />

                <div
                  className="visible-icon"
                  onClick={() => handleVisibilityIcon()}
                >
                  {passwordVisible ? <AiFillEye /> : <AiFillEyeInvisible />}
                </div>
              </div>
            </div>
            <div className="input-wrapper">
              <label htmlFor="firstname">Firstname</label>
              <input
                type="text"
                id="firstname"
                autoComplete="off"
                onChange={(e) => setFirstName(e.target.value)}
                value={firstName}
                required
              />
            </div>
            <div className="input-wrapper">
              <label htmlFor="lastname">Lastname</label>
              <input
                type="text"
                id="lastname"
                autoComplete="off"
                onChange={(e) => setLastName(e.target.value)}
                value={lastName}
                required
              />
            </div>

            <button className="sign-in-button">
              {loading ? <ClipLoader size={15} color="#fff" /> : <p>Sign up</p>}
            </button>
            <span className="sign-up">
              Have an account? <Link to="/login"> Sign in here!</Link>
            </span>
          </form>
        </div>
      )}
    </main>
  );
}
