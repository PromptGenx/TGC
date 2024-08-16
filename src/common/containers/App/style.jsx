import styled from 'styled-components'
import {media} from 'styles/utils'
import {Dimmer, Sidebar, Container} from 'semantic-ui-react'

export const SidebarSemanticPushable = Sidebar.Pushable
export const SidebarSemanticPusherStyled = styled(Sidebar.Pusher)`
-webkit-overflow-scrolling: touch;
${''}

::-webkit-scrollbar {
  width: 0px!important;
}
	height: 100%;
	width: calc(100% - 260px);
	-webkit-overflow-scrolling: touch;
	${({sidebar_opened: sidebarOpened}) => {
		// `sidebar_opened` attr instead of `media` util -> SSRed app looks better
		// return sidebarOpened && css`max-width: calc(100% - 150px);`
	}};
`

export const Toast = styled.div`{
    position: fixed;
    width: calc(100% - 320px);
    min-height: 28px;
    background-color: rgba(68,68,68,0.95);
    right: 37px;
    bottom: 10%;
    margin: auto;
    border-radius: 4px;
    color: #eee;
    text-align: center;
    display: none;
    padding: 4px;
}
`

export const ScrollChip = styled.div`{
	position: fixed;
	z-index: 99999;
	right: 10px;
	bottom: 62px;
	background-color: rgba(68, 68, 68, 0.67);
	height: 40px;
	width: 40px;
	border-radius: 50%;
	color: #fff;

	:hover{
		background-color: #444;
		cursor: pointer;
	}

	.anc-scroll{
		z-index: 1000000;
    color: #fff;
    width: 40px;
    display: block;
    height: 40px;
    position: relative;
	}

	.anc-scroll > i {
    position: absolute;
    left: 0px;
    right: 0px;
    margin: auto;
    -webkit-transform: translateY(70%);
    -ms-transform: translateY(70%);
    transform: translateY(45%);
    font-size: 21px;
    font-weight: bold;
	}
}`

export const PageLayout = styled.div`
	height: 100%;
	overflow: hidden;
	background-color: ${props => props.theme.basemediumlight};

	.fadeIn {
		display: block !important;
	}

	.d-none {
		display: none !important;
	}

	.zero-opac{
		opacity: 0 !important;
		transition: opacity 0.5s ease !important;
	}

	.full-opac{
		opacity: 1;
		transition: opacity 0.5s ease;
	}

	.fadeOut {
		opacity: 0 !important;
		transition: opacity 1s linear;
	}

	.custom-dimmer{
		z-index: 1050 !important;
	}

	.loader-txt{
		color: darkorange;
		font-weight: bold;
	}

	.pushable {
		position: relative;
		z-index: 0;
		width: 100%;
		max-width: 100% !important;
		display: block;
		margin-top: 60px;
		margin-left: 260px;
		height: calc(100% - 120px);
		overflow-x: hidden;
		padding: 0;
		transform: translate3d(0, 0, 0);
		> ${SidebarSemanticPusherStyled} {
			-webkit-overflow-scrolling: touch;
			${''}
		
		  ::-webkit-scrollbar {
			  width: 0px!important;
			}
			overflow: visible !important;
		}
	}

	.no-bar {
		position: absolute;
		left: 0px;
		right: 0px;
		margin: auto !important;
		top: 0px;
		bottom: 0px;
	}

	.no-bar > div{
		width: initial !important;
	}

	::-webkit-scrollbar {
		width: 4px !important;
	}

	.main-layout {
		min-height: calc(100% - 72px);
		display: flex;
		flex-direction: column;
		color: ${props => props.theme.night};
		background-color: ${props => props.theme.basemediumlight};

		> .main-content {
			flex-grow: 1;
			min-height: calc(100% - 72px);
			display: flex;
			flex-direction: column;

			> .main-container {
				width: 100%;
				padding-left: 1rem;
				padding-right: 1rem;
				margin-top: 50px;
				margin-bottom: 1em;
				flex-direction: column;
				display: flex !important;
				flex-grow: 1;
				& > *:last-child {
					flex-grow: 1;
				}
			}
		}
	}
`

export const MainLayout = styled.div`
	background-color: ${props => props.theme.primaryColorText};
	color: ${props => props.theme.primaryTextColor};
	display: flex;
	flex-direction: column;
	${'100% - Header height - Footer height'};
	height: 100%;
`

export const MainContent = styled.main`
	height: 100%;
	display: flex;
	flex-grow: 1;
`

export const SidebarSemanticPushableStyled = styled(Sidebar.Pushable)`
	display: initial;
	transform: initial !important;
	> .pusher {
		position: relative;
		z-index: 0;
	}
`

//  Margin - just to fill empty space
export const MainContainer = styled(Container)`
	height: calc(100% - 50px);
  	margin-top: 3.5em;
	width: 100% !important;
	overflow-y: auto;
	overflow-x: auto;
	padding-left: 1.0rem;

  &#main-container {
		${media.mdOnly`
			width: 100% !important;
		`}

		${media.smOnly`
		  width: 100% !important;
		`}
	}
`

export const StyledDimmer = styled(Dimmer)`
	z-index: 55!important;
	cursor: pointer;
`
