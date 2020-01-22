import React from 'react';
import './FaceRecognition.css';

const FaceRecognitionFromURL = ({ imgURL, box, demoGen, demoAge }) => {
	return (
		<div className='fl w-100 tc'>
			<div>
				<div className='center'>
					<p className='ml2 mr2 f3'>{`${demoGen} ${demoAge}`}</p>
				</div>
				<div className='center'>
					<div className='ml1 mr2 absolute mt2'>
						<img
							id={'inputImg'}
							alt='body image1'
							src={imgURL}
							className='br4 ba b--washed-red bw1 shadow-5 mb2 mr2'
							width='700px'
							height='auto'
						/>
						<div
							className='center bounding-box'
							style={{ top: box.topRow, right: box.rightCol, bottom: box.bottomRow, left: box.leftCol }}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};
export default FaceRecognitionFromURL;
