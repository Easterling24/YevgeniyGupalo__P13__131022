import { Routes, Route } from 'react-router-dom';
import Header from './components/header/index';
import Footer from './components/footer';
import Home from './sceens/homepageScreen/index';
import Login from './sceens/loginScreen/index';
import Profile from './sceens/userScreen/index';
import SignUp from './sceens/signUpScreen/index';
import ProtectedRoute from './components/protectedRoute';
import NotFound from './components/404/index';
import './index.scss';

function App() {
	return (
		<div className="App">
			<Header />

			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/signup" element={<SignUp />} />
				<Route path="/login" element={<Login />} />
				<Route element={<ProtectedRoute />}>
					<Route path="/profile" element={<Profile />} />
				</Route>

				<Route path="*" element={<NotFound />} />
			</Routes>

			<Footer />
		</div>
	);
}

export default App;

