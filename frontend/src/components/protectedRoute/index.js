import { useSelector } from 'react-redux';
import { Link, Outlet } from 'react-router-dom';
import './index.scss';

export default function ProtectedRoute() {
	const { userInfo } = useSelector((state) => state.user);

	if (!userInfo) {
		return (
			<section className="unauthorized-wrapper">
				<h1>Unauthorized:/ </h1>
				<span>
					<Link to="/login">Sign in first</Link>
				</span>
			</section>
		);
	}

	return <Outlet />;
}
