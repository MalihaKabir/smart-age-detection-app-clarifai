import React from 'react';

const Navigation = ({ onRouteChange }) => {
	return (
		<nav>
			<h2 className='fl w-60 pa3 pl4 f3 pt2' style={{ display: 'flex', justifyContent: 'flex-start' }}>
				Maliha
			</h2>
			<p
				className='fl w-40 pa3 pr4 f4 link dim black pointer pt2 pr3'
				style={{ display: 'flex', justifyContent: 'flex-end' }}
				onClick={() => onRouteChange('signin')}
			>
				Sign Out
			</p>
		</nav>
	);
};

export default Navigation;
