import styled from 'styled-components'
import header_bg from 'static/images/Header-PNG-Photo.png'

export const StyledFooter = styled.footer`
background-image: url(${header_bg});
background-size: cover;
background-position: center;
color: white;
	position: fixed;
	z-index: 1000;
	bottom: 0px;
	width: 100%;
	display: flex;
	align-items: center;
	background-color: ${props => props.theme.basemediumlight};
	height: 60px;
	min-height: 50px;

	.footer-inner {
		margin-top: 8px;
		padding: 0px 1rem;
		width: 100%;
	}

	.footer-color {
		color:white;		
	}
`

export const Chat = styled.div`
	width: 350px;
	position: fixed;
	height: 450px;
	border: 1px solid #d9d9d9;
	background-color: #eee;
	left: 278px;
	bottom: 50px;

	:before {
		content: "";
		position: absolute;
		display: inline-block;
		width: 0;
		height: 0;
		border-top: 19px solid transparent;
		border-bottom: 19px solid transparent;
		border-left: 19px solid #07364f;
		right: 348px;
		bottom: -1px;
	}

	.fade-show{
		display: none;
	}

	.chatwindow:before {
		content: "";
		position: absolute;
		display: inline-block;
		width: 0;
		height: 0;
		border-top: 19px solid transparent;
		border-bottom: 19px solid transparent;
		border-left: 19px solid #07364f;
		right: 348px;
		bottom: -1px;
	}

	.chat-action button{
		border-radius: 0px !important;
	}

	.chat-header {
		background-color: #ff6118;
		height: 14%;
		color: #eee;
		text-align: left;
		padding: 23px;
		font-size: 18px;
	}

	.chat-body{
		height: 86%;
	}

	.char-content {
		height: 90%;
    	padding: 25px 20px;
	}

	.chat-form-label{
		width: 40%;
		padding-top: 8px;
	}

	.chat-action {
		height: 10%;
		width: 100%;
	}

	.chat-action div, input {
		width: 100%;
	}

	.chat-form-flex-dv{
		display: flex;
		margin: 10px 0px;
	}

	.align-label{
		position: relative;
		top: -6px;
	}

	i.close.icon.close-chat-window {
		position: absolute;
		right: 12px;
		top: 10px;
		cursor: pointer;
	}
`
