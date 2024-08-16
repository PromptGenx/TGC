import React from 'react'
import { CarouselH2, CarouselH3, CarouselContainer, LiftSymbol, CarouselHeader, CarouselButton, CarouselDivider } from './style'
import { Segment, Grid, Divider, Icon } from 'semantic-ui-react'
// import liftimg from 'static/images/LiftSymbol-Orange.png'
import { FormattedMessage, injectIntl, intlShape } from 'react-intl'
import { Carousel } from 'react-responsive-carousel'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import tog_logo from 'static/images/TOG_logo.jpg'
import tog_logo1 from 'static/images/TOG_logo1.jpeg'
import jesus from 'static/images/Jesus.jpg'

const divStyle = {
	'margin-top': '0px',
	'width': '100%',
	'height': '400px'
}
const divStyle1 = {
	'margin-top': '0px',
	'width': '100%',
	'height': '100%'
}

const CarouselDemo = () => {
	return (
		<Carousel showThumbs={false} autoPlay infiniteLoop>
			<div style={divStyle}>
				<img src="https://via.placeholder.com/800x400?text=Slide+1" alt="Slide 1" />
				<p className="legend">Slide 1</p>
			</div>
			<div>
				<img src="https://via.placeholder.com/800x400?text=Slide+2" alt="Slide 2" />
				<p className="legend">Slide 2</p>
			</div>
			<div>
				<img src="https://via.placeholder.com/800x400?text=Slide+3" alt="Slide 3" />
				<p className="legend">Slide 3</p>
			</div>
		</Carousel>
	)
}

export default CarouselDemo
