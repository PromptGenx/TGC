import {Sidebar} from 'semantic-ui-react'
import styled from 'styled-components'

export const StyledSidebar = styled(Sidebar)`
	z-index: 0 !important;
	display: flex !important;
	border: none !important;
	position: fixed !important;
	background-color: ${props => props.theme.night} !important;
	box-shadow: none !important;
	transform: translate3d(0%, 0, 0) !important;	
	visibility: visible !important;
	width: 260px !important;

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
		padding-left: 2.142857em !important
	}

	#menu-sec a.active{
		color: ${props => props.theme.darkorange} !important; //F2711C
	}

	.active{
		background-color: ${props => props.theme.basemediumlight} !important;
		font-weight: bold !important;
	}

	.menu-dv{
		margin-top: 110px;
	}

	/* styles for browsers larger than 1366px; */
	@media screen and (min-width: 1367px)
	{
		.side-bar-footer{
			position: absolute;
			margin-bottom: 50px;
			left: 0px;
			// min-height: 176px;
			width: 100%;
			bottom: 0px;
		}
		.side-bar-footer-fixedheight{
			position: absolute;
			margin-bottom: 50px;
			left: 0px;
			// min-height: 176px;
			height:230px;
			width: 100%;
			bottom: 0px;
		}
	}

	/* styles for browsers lesser than 1366px; */
	@media screen and (max-width: 1366px)
	{
		.side-bar-footer{
			position: absolute;
			margin-bottom: 50px;
			left: 0px;
			// min-height: 176px;
			width: 100%;
			bottom: 0px;
		}
		.side-bar-footer-fixedheight{
			position: absolute;
			margin-bottom: 50px;
			left: 0px;
			// min-height: 176px;
			height:230px;
			width: 100%;
			bottom: 0px;
		}
	}
	
	.info-card {
		margin: 6px;
		background-color: #447590a8;
		color: #fff;
		padding: 12px;
		border-radius: 4px;
		// margin-bottom: 10px;
	}

	.contactLabel{
		padding-bottom:7px !important;
		text-decoration: underline;
	}

	.sidemenu_tooltip:after{
		border-top: 6px solid #fff !important;
	}

	.sidemenu_tooltip{
		background-color: #fff !important;
		color: ${props => props.theme.darknight} !important;
		font-weight: bold;
	}

	.sidemenu_tooltip span {
		text-transform: capitalize;
	}

	.sidebar-footer-flex{
		text-align: center;
		float: left;
		width: 100%;
		height: 40px;
		line-height: 40px;
		background-color: ${props => props.theme.darknight};
		margin:0 0 11px 0;
		display: flex;
	}

	.right-arrow:after{
		width: 20px;
		content: "";
		height: 10px;
		background-color: ${props => props.theme.darknight};
	}

	.fade-show{
		display: none;
	}

	.sidebar-footer-flex div:hover{
		background-color: rgb(21, 79, 107);
	}

	.enablethree_tooltip:after {
		right: 58px;
	}

	.sidebar-footer-flex div{
		float: left;
		width: 100%;
		color: #eee;
		border-right: 1px solid rgb(72, 68, 68);
		cursor: pointer;
		font-size: 20px;
		height: 100%;
	}

	.info-card p {
		padding: 0px;
		margin: 0px;
		white-space: nowrap;
		overflow-x: hidden;
		text-overflow: ellipsis;
	}
`
