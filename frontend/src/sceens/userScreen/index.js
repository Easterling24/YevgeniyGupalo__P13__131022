import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { getUserProfile } from '../../features/user/userActions';
import { updateProfileData } from '../../features/user/userActions';
import './index.scss';

export default function Profile() {
	const { userToken, userInfo } = useSelector((state) => state.user);
	const [ editData, setEditData ] = useState(false);
	const [ firstName, setFirstName ] = useState('');
	const [ lastName, setLastName ] = useState('');
	const dispatch = useDispatch();

	useEffect(
		() => {
			if (userToken) {
				dispatch(getUserProfile());
			}
		},
		[ userToken, dispatch ]
	);

	const handleUpdateName = () => {
		const data = { firstName, lastName };
		dispatch(updateProfileData(data));
		setEditData(false);
	};

	return (
		<main className="main bg-dark">
			<div className="header">
				<h1>
					Welcome back<br />
				</h1>

				{editData ? (
					<div className="header-name-container">
						<div className="edit-name-save">
							<input
								className="header-firstname"
								id="firstname"
								value={firstName}
								onChange={(e) => setFirstName(e.target.value)}
								placeholder="Firstname"
								data-error
							/>
							<button
								disabled={firstName.length === 0 || lastName.length === 0}
								onClick={() => handleUpdateName()}
							>
								Save
							</button>
						</div>

						<div className="edit-name-cancel">
							<input
								className="header-lastname"
								id="lastname"
								value={lastName}
								placeholder="Lastname"
								data-error
								onChange={(e) => setLastName(e.target.value)}
							/>
							<button onClick={() => setEditData(false)}>Cancel</button>
						</div>
					</div>
				) : (
					<div className="header-name-container">
						<h1 className="header-firstname">{userInfo && userInfo.firstName}</h1>
						<h1 className="header-lastname">{userInfo && userInfo.lastName}</h1>
					</div>
				)}

				<button className={editData ? 'offScreen' : 'edit-button'} onClick={() => setEditData(true)}>
					Edit Name
				</button>
			</div>
			<h2 className="sr-only">Accounts</h2>
			<section className="account">
				<div className="account-content-wrapper">
					<h3 className="account-title">Argent Bank Checking (x8349)</h3>
					<p className="account-amount">$2,082.79</p>
					<p className="account-amount-description">Available Balance</p>
				</div>
				<div className="account-content-wrapper cta">
					<button className="transaction-button">View transactions</button>
				</div>
			</section>
			<section className="account">
				<div className="account-content-wrapper">
					<h3 className="account-title">Argent Bank Savings (x6712)</h3>
					<p className="account-amount">$10,928.42</p>
					<p className="account-amount-description">Available Balance</p>
				</div>
				<div className="account-content-wrapper cta">
					<button className="transaction-button">View transactions</button>
				</div>
			</section>
			<section className="account">
				<div className="account-content-wrapper">
					<h3 className="account-title">Argent Bank Credit Card (x8349)</h3>
					<p className="account-amount">$184.30</p>
					<p className="account-amount-description">Current Balance</p>
				</div>
				<div className="account-content-wrapper cta">
					<button className="transaction-button">View transactions</button>
				</div>
			</section>
		</main>
	);
}
