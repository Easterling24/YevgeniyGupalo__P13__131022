import { Routes, Route } from 'react-router-dom';
import Header from './components/header/index';
import Footer from './components/footer';
import Home from './sceens/homepageScreen/index';
import Login from './sceens/loginScreen/index';
import Profile from './sceens/userScreen/index';
import SignUp from './sceens/signUpScreen/index';
import ProtectedRoute from './components/protectedRoute';
import './index.scss';

function App() {
	return (
		<div className="App">
			<Header />

			<Routes>
				<Route path="/" element={<Home />} />
				<Route path='/signup' element={<SignUp/>} />
				<Route path="/login" element={<Login />} />
				<Route element={<ProtectedRoute />}>
					<Route path="/profile" element={<Profile />} />
				</Route>
			</Routes>

			<Footer />
		</div>
	);
}

export default App;

// export const App = () => {
// 	const isAuth = useSelector((state) => state.auth.isConnected);

// 	return (
// 		<Routes>
// 			<Route path="/" element={<Layout />}>
// 				<Route index element={<Home />} />
// 				<Route path="user/login" element={isAuth ? <Navigate to={"user/profile"} /> : <Login />} />
// 				{isAuth && (
// 					<>
// 						<Route path="user/profile" element={<Dashboard />} />
// 					</>
// 				)}
// 				<Route path="user/logout" element={<Logout />} />
// 				<Route path="*" element={<Navigate to={isAuth ? "user/profile" : "/"} />} />
// 			</Route>
// 		</Routes>
// 	);
