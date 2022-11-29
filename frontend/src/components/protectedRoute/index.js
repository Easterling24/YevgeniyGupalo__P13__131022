import { useSelector } from "react-redux";
import { Link, Outlet } from "react-router-dom";
import UnauthImg from "../../assets/img/Unauthorized.png";
import "./index.scss";

export default function ProtectedRoute() {
  const { userInfo } = useSelector((state) => state.user);

  if (!userInfo) {
    return (
      <section className="unauthorized-wrapper">
        <div className="unauthorized-container-img">
          <img src={UnauthImg} alt="unauthorized-img" />
        </div>

        <Link className="sign-in-link" to="/login">
          Sign in first
        </Link>
      </section>
    );
  }

  return <Outlet />;
}
