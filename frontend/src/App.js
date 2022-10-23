import { Routes, Route } from 'react-router-dom';
import Header from './components/header/index';
import Footer from './components/footer';
import Home from './sceens/homepageScreen/index';
import Login from './sceens/loginScreen/index';

function App() {
	return (
		<div className="App">
			<Header />

			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/login" element={<Login />} />
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