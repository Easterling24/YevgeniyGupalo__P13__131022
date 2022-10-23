import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { userLogin } from '../../features/user/userActions';
import { useNavigate } from 'react-router-dom'
import {useEffect} from "react"

function Login() {
	const { loading, userInfo, error } = useSelector((state) => state.user);
	const dispatch = useDispatch();
	const {register, handleSubmit} = useForm()
	const navigate = useNavigate()

	

	useEffect(() => {
		if (userInfo) {
		  navigate('/user-profile')
		}
	  }, [navigate, userInfo])

	const submitForm = (data) => {
		console.log(data)
		dispatch(userLogin(data))
	};



	return (
		<main>
			<section className="sign-in-content">
				<i className="fa fa-user-circle sign-in-icon" />
				<h1>Sign In</h1>
				<form onSubmit={handleSubmit(submitForm)}>
					{error && <p>Not authorized</p>}
					<div className="input-wrapper">
						<label htmlFor="username">Username</label>
						<input type="email" id="username" {...register('email')} />
					</div>
					<div className="input-wrapper">
						<label htmlFor="password">Password</label>
						<input type="password" id="password" {...register('password')} />
					</div>
					<div className="input-remember">
						<input type="checkbox" id="remember-me" />
						<label htmlFor="remember-me">Remember me</label>
					</div>

					{/* <a href="./user.html" className="sign-in-button">
						Sign In
					</a> */}
					<button type="submit" disabled={loading} className="sign-in-button">
						Log in
					</button>
				</form>
			</section>
		</main>
	);
}

export default Login;
