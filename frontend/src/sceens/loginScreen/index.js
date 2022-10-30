import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useRef, useState } from 'react';
import { userLogin } from '../../features/user/userActions';
import { Link, useNavigate } from 'react-router-dom';
import { RotateLoader } from 'react-spinners';
import { ClipLoader } from 'react-spinners';
import { AiFillEyeInvisible } from 'react-icons/ai';
import { AiFillEye } from 'react-icons/ai';
import './index.scss';

function Login() {
	const emailRef = useRef();
	const errRef = useRef();

	const [ loadingScreen, setLoadingScreen ] = useState(true);

	const [ email, setEmail ] = useState('');
	const [ password, setPassword ] = useState('');
	const [ passwordVisible, setPasswordVisible ] = useState(false);
	const { loading, userInfo, error } = useSelector((state) => state.user);
	const navigate = useNavigate();
	const dispatch = useDispatch();

	useEffect(() => {
		const loadData = async () => {
			await new Promise((r) => setTimeout(r, 1500));

			setLoadingScreen(false);
		};

		loadData();
	}, []);

	const handleSumbit = (e) => {
		e.preventDefault();
		const data = { email, password };
		dispatch(userLogin(data));
	};

	useEffect(
		() => {
			if (userInfo) {
				navigate('/profile');
			}
		},
		[ navigate, userInfo ]
	);

	const handleVisibilityIcon = () => {
		setPasswordVisible(true);

		if (passwordVisible === true) {
			setPasswordVisible(false);
		}
	};

	return (
		<main className="login-wrapper">
			{loadingScreen ? (
				<div className="loading-container">
					<RotateLoader color="#00bc77" />
				</div>
			) : (
				<section className="sign-in-content">
					<i className="fa fa-user-circle sign-in-icon" />

					<form onSubmit={handleSumbit}>
						<p ref={errRef} className={error ? 'errorMsg' : 'offScreen'}>
							No such user
						</p>

						<div className="input-wrapper">
							<label htmlFor="email">Email</label>
							<input
								type="email"
								id="email"
								ref={emailRef}
								autoComplete="off"
								onChange={(e) => setEmail(e.target.value)}
								value={email}
								required
							/>

							{/* <p className={email.length === 0 ? 'errorMsgInput' : 'offScreen'}>
								{' '}
								This field cannot be empty!
							</p> */}
						</div>
						<div className="input-wrapper">
							<label htmlFor="password">Password</label>

							<div className="password-input-wrapper">
								<input
									type={passwordVisible ? 'text' : 'password'}
									id="password"
									autoComplete="off"
									onChange={(e) => setPassword(e.target.value)}
									value={password}
									required
								/>

								<div className="visible-icon" onClick={() => handleVisibilityIcon()}>
									{passwordVisible ? <AiFillEye /> : <AiFillEyeInvisible />}
								</div>
							</div>

							{/* <p data-error className={password.length === 0 ? 'errorMsgInput' : 'offScreen'}>
								{' '}
								This field cannot be empty!
							</p> */}
						</div>

						<div className="input-remember">
							<input type="checkbox" id="remember-me" />
							<label htmlFor="remember-me">Remember me</label>
						</div>
						<button className="sign-in-button">
							{loading ? <ClipLoader size={15} color="#fff" /> : <p>Sign in</p>}
						</button>
						<span className="sign-up">
							Dont have an account yet? <Link to="/signup"> Sign up here!</Link>
						</span>
					</form>
				</section>
			)}
		</main>
	);
}

export default Login;
