import styled from 'styled-components'
import {media} from 'styles/utils'
import {Image as ImageComponent} from 'semantic-ui-react'
import header_bg from 'static/images/Header-PNG-Photo.png'

export const StyledHeader = styled.header`
background-image: url(${header_bg});
background-size: cover;
background-position: center;
color: white;
text-align: center;
padding: 100px 0;

a{
	color: white;
	font-weight: bold;

}
a:hover{
	color: orange;
}

.logo-container {
	background-color: ${props => props.theme.night};
	
	padding: 20px;
	text-align: center; 
	img {
		filter: invert(1);
	}
}

.active-bg {
	background-color:  ${props => props.theme.basemediumlight} !important; //023b5a
	box-shadow: none !important;
}

.slideup{
	height: 0px;
}

.expand{
	display: block !important;
}

.active-dv {
	margin-top: 15px;
	display: none;
	border-top: 1px solid rgba(255, 255, 255, 0.08);
	padding: 0px;
	width: calc(100% + 3.142857em);
	position: relative;
	left: -1.14285714em;
	margin-bottom: -12px;       
}

.active-dv a{
	background-color: ${props => props.theme.basemediumlight} !important;
	color: white;
}

#menu-sec a.active{
	color: ${props => props.theme.darkorange} !important; //F2711C
	margin-left: 20px !important;
}

.active{
	background-color: ${props => props.theme.basemediumlight} !important;
	font-weight: bold !important;
	padding-right: 20px;
    padding-top: 10px;
    padding-bottom: 10px;
    border-radius: 5px;
}

.menu-dv{
	margin-top: 110px;
}

	h1 {
		margin: 0;
		font-size: 3em;
	}
	.menu-dv {
		display: flex;
		justify-content: center;
		background-color: rgba(0, 0, 0, 0.5);
		padding: 10px 0;
	}
	.menu-dv div {
		color: white;
		text-decoration: none;
		padding: 10px 20px;
		font-size: 1.2em;
	}
	.menu-dv div:hover {
		background-color: rgba(255, 255, 255, 0.2);
	}
	
`

export const SidebarLogo = styled(ImageComponent)`
	margin: 0px;
`
export const SidebarLogoContainer = styled.a`
  position:absolute;
  text-align: center;
  ${media.md`
    padding: 25px;
  `};
 ${media.lg`
    padding: 5px;
  `};

  .spn-title{
	font-size: 12px;
	display: block;
	text-align: left;
	padding-left: 5px;
	margin-top: -4px;
	color: #776e64;
}

.spn-title b{
	color: #776e64
}
`
