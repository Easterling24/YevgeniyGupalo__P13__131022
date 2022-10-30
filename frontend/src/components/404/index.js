import './index.scss';
import NotFoundImg from '../../assets/img/404.jpg';
export default function NotFound() {
	return (
		<section className="not-found-wrapper">
			<div className="not-found-img-container">
				<img src={NotFoundImg} alt="notFound" />
			</div>
		</section>
	);
}
