import React from 'react';
import {TakeYourBusinessDiv, TakeYourBusinessHeadingDiv, VisualsDiv} from './StyledComponents'
import GetCarousel from "../util/carousel/GetCarousel";

const visualDivImages = [
	{
		'url': `/img/review.png`
	},
	{
		'url': `/img/menu.png`
	},
	{
		'url': `/img/Employee Management.jpg`
	},
	{
		'url': `img/SEO.png`
	}
]

const TakeYourBusiness = () => {
	return (
	<TakeYourBusinessDiv>
		<TakeYourBusinessHeadingDiv>
			<h1>Take your business to new Heights</h1>
			<p>Grow your business to another level with a tool that has everything a business needs.</p>
		</TakeYourBusinessHeadingDiv>
		<VisualsDiv>
			<GetCarousel
				images={visualDivImages}
				showIndicators={false}
				customStyle={{
					width: 'auto',
					objectFit: 'contain',
				}}
				infiniteLoop={true}
				background={'white'}/>
		</VisualsDiv>
	</TakeYourBusinessDiv>
)
}

export default TakeYourBusiness;
