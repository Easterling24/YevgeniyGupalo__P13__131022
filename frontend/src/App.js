import { Routes, Route } from 'react-router-dom';

import Header from './components/header/index';
import Footer from './components/footer';
import Home from './sceens/homepageScreen/index';

function App() {
	return (
		<div className="App">
			<Header />

			<Routes>
				<Route path="/" element={<Home/>} />
			</Routes>

			<Footer />
		</div>
	);
}

export default App;
