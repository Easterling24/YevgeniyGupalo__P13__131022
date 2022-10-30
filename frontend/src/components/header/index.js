import argentBank from '../../assets/img/argentBankLogo.png';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getUserProfile } from '../../features/user/userActions';
import { logout } from '../../features/user/userSlice';
import { useEffect } from 'react';
import { GoSignIn } from 'react-icons/go';
import { GoSignOut } from 'react-icons/go';
import { FaUserCircle } from 'react-icons/fa';
import './index.scss';

function Header() {
	const { userInfo, userToken } = useSelector((state) => state.user);
	const dispatch = useDispatch();

	useEffect(
		() => {
			if (userToken) {
				dispatch(getUserProfile(userToken));
			}
		},
		[ userToken, dispatch ]
	);

	return (
		<nav className="main-nav">
			<NavLink className="main-nav-logo" to="/">
				<img className="main-nav-logo-image" src={argentBank} alt="Argent Bank Logo" />
				{/* <h1 className="sr-only">Argent Bank</h1> */}
			</NavLink>
			<div className="main-nav-info">
				{userInfo ? (
					<NavLink className="main-nav-item" to="/login" onClick={() => dispatch(logout())}>
						<GoSignOut />
						Sign out
					</NavLink>
				) : (
					<NavLink className="main-nav-item" to="/login">
						<GoSignIn />
						Sign in
					</NavLink>
				)}

				{/* <span> {userInfo && userInfo.firstName}</span> */}

				{userInfo && (
					<NavLink to="/profile" className="main-nav-icon">
						<FaUserCircle />
						{userInfo.firstName}
					</NavLink>
				)}
			</div>
		</nav>
	);
}

export default Header;
