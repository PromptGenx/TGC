import { Button, Icon, Checkbox, Label, Input, Radio, Dropdown, Modal, Image as ImageComponent } from 'semantic-ui-react'
import styled, {css} from 'styled-components'
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {media} from 'styles/utils'

/* StyledButton */
export const StyledButton = styled(Button)`
    background-color: ${props => props.primary ? props.theme.darkorange : props.theme.nobel} !important; 
    color: ${props => props.theme.basemediumlight} !important;
    border: 1px solid ${props => props.primary ? props.theme.darkorange : props.theme.nobel} !important; 
    border-radius: 0.28571429rem !important;
    ${props => props.medium ? `
        height: 2.2rem;
        line-height: 6px !important;
    ` : props.small ? `
        height: 2.0rem;
        line-height: 5px !important;
    ` : `
        height: 2.6rem
    `} !important;
    font-weight: 100 !important;

    &:hover {
        background-color: ${props => props.theme.basemediumlight} !important;
        color: ${props => props.primary ? props.theme.darkorange : props.theme.basedark} !important;
        border: px solid ${props => props.primary ? props.theme.darkorange : props.theme.basedark} !important;
        border-radius: 0.28571429rem !important;
    }
`

export const ToolTip = styled.div`
    width: 90px;
    min-height: 24px;
    background-color: rgba(0, 0, 0, 0.30196078431372547);
    position: absolute;
    color: #eee;
    border-radius: 4px;
    padding: 4px;
    text-align: center;

    &:after{
        content: "";
        position: absolute;
        right: 40px;
        top: 25px;
        border-left: 8px solid transparent;
        border-right: 8px solid transparent;
        border-bottom: 8px solid transparent;
        border-top: 8px solid #022e46;
    }
`

export const StyledButton1 = styled(Button)`
    background-color: ${props => props.primary ? props.theme.darkorange : props.theme.nobel} !important; 
    color: ${props => props.theme.basemediumlight} !important;
    border: 2px solid ${props => props.primary ? props.theme.darkorange : props.theme.nobel} !important; 
    border-radius: 4px !important;
    padding: 6px !important;

    &:hover {
        background-color: ${props => props.theme.basemediumlight} !important;
        color: ${props => props.primary ? props.theme.darkorange : props.theme.basedark} !important;
        border: 2px solid ${props => props.primary ? props.theme.darkorange : props.theme.basedark} !important;
        border-radius: 4px !important;
        padding: 6px !important;
    }
`
/* StyledIcon */
export const StyledIcon = styled(Icon)`
    color: ${props => props.theme.lightorange} !important;        
    opacity: 1 !important;

    &:hover {
        color: ${props => props.theme.darkorange} !important;
        transform: scale(1.5);
    }
`
/* StyledLabel */
export const StyledLabel = styled(Label)`
    color: ${props => props.theme.black} !important;
    background-color: ${props => props.theme.white} !important;
    font-size: 0.92857143em !important;
`
/* StyledCheckbox */
export const StyledCheckbox = styled(Checkbox)`    
    font-size: 0.92857143em !important;
    font-weight: bold;
    padding-left: 15px;
    padding-right: 15px;    

    input[type=checkbox]+label:before {
        transition-property:box-shadow !important;
        transition-timing-function:cubic-bezier(0,0,.2,1);
        transition-duration:167ms;
        background-color: ${props => props.theme.white} !important;
        height: 16px !important;
        width: 16px !important;
        font-size: 12px !important;
        font-weight: 100 !important;
    }
    input[type=checkbox]+label:after {
        transition-property:box-shadow !important;
        transition-timing-function:cubic-bezier(0,0,.2,1);
        transition-duration:167ms;
        background-color: ${props => props.theme.darkorange} !important;
        border: 1px solid ${props => props.theme.darkorange} !important;
        border-radius: 4px !important;
        color: ${props => props.theme.white} !important;
        height: 16px !important;
        width: 16px !important;    
        font-size: 12px !important;
        font-weight: 100 !important;
    }
`
/* StyledRadio */
export const StyledRadio = styled(Radio)` 
    font-size: 0.92857143em !important;
    font-weight: bold;
    padding-left: 15px;
    padding-right: 15px;     
    
    input[type=radio]+label:before {
        transition-property:box-shadow !important;
        transition-timing-function:cubic-bezier(0,0,.2,1);
        transition-duration:167ms;
        background-color: ${props => props.theme.white} !important;
        border: 1px solid ${props => props.theme.linecolor} !important;
        height: 16px !important;
        width: 16px !important;
    }
    input[type=radio]+label:after {
        transition-property:box-shadow !important;
        transition-timing-function:cubic-bezier(0,0,.2,1);
        transition-duration:167ms;
        background-color: ${props => props.theme.darkorange} !important;
        border: 1px solid ${props => props.theme.darkorange} !important;
        height: 16px !important;
        width: 16px !important;
    }
`
/* StyledH1 */
export const StyledH1 = styled.h1`
    margin-top: 14px !important;
    margin-bottom: 14px;
    color: ${props => props.theme.darkorange}
`
/* StyledH2 */
export const StyledH2 = styled.h2`
    color: ${props => props.theme.night};
    font-weight: normal;
    font-size: 24px;
`
/* StyledH3 */
export const StyledH3 = styled.h3`
    color: ${props => props.theme.night};
    font-weight: normal;
    font-size: 18px;
`
export const StyledGridTextBox = styled(Input)`
    width: 100px;
    height: 28px;
    padding-left: 6px;
    padding-right: 6px;
`

export const IGrid = styled.div`
    font-size: 12px;

    .igrid table{
        border-collapse: separate;
        border-spacing: 0 0.4em;
        width: 100%;
        display: table;
        font-size: 12px;
    }

    .igrid th {
        padding: 12px 0px;
        text-align: left;
        padding-left: 10px;
    }

    .igrid td {
        padding: 15px 0px;
        text-align: left;
        padding-left: 10px;
    }            

    .igrid thead {
        background-color: #3f3f50;
        color: #eee;
    }

    .igrid tbody > tr {
        background-color: #eee;
    }

    .igrid tbody>tr td:first-child {
        border: 1px solid;
        border-right: 0px;
        border-radius: 4px 0px 0px 4px;
    }

    .igrid tbody>tr td:last-child {
        border: 1px solid;
        border-left: 0px;
        border-radius: 0px 4px 4px 0px;
    }

    .igrid tbody>tr td {
        border-top: 1px solid;
        border-bottom: 1px solid;
    }
`
/* StyledFooter */
export const StyledFooter = styled.footer`
	position: fixed;
	z-index: 1000;
	bottom: 0px;
	width: 100%;
	display: flex;
	align-items: center;
	background-color: ${props => props.theme.mediumgrey};
	color: ${props => props.theme.night};
	height: 50px;
	min-height: 50px;
	.footer-inner {
		padding: 15px 1rem;
		width: 100%;		
	}
	.footer-color {
		color:${props => props.theme.night};		
	}
`
/* StyledHeader */
export const StyledHeader = styled.header`
	position: fixed;
	top: 0px;
	background: ${props => props.theme.basemediumlight};
	color: ${props => props.theme.black};
	display: flex;
	justify-content: center;
	flex-direction: column;
	width: 100%;
	z-index: 444;
	height: 110px;

	.Header-bottom-bar{
		width: 100%;
		height: 50px;
		background-color: ${props => props.theme.night};
	}

	.head-info {
		position: absolute;
		background: ${props => props.theme.basemediumlight};
		border: 1px solid #d9d9d9;
		margin-top: 20px;
		right: 0px;
		width: 133px;
		padding: 6px 0px;
	}

	.title-txt{
		color: #004165;
	}

	.dn{
		display: none;
	}

	.sn{
		display: block;
	}

	.head-info ul {
		list-style-type: none;
		padding: 0px;
	}

	.head-info a {
		display: block;
		width: 100%;
		cursor: pointer;
		padding: 4px 14px;
		color: ${props => props.theme.night}
	}

	.flag-li{
		padding: 5px !important;
	}

	.faq-li{
		padding: 5px !important;
	}

	.contact-li {
		padding: 5px !important;
	}

	.Header-bottom-bar > h1{
		margin-left: 294px;
		margin-top: 8px;
		color: #e6e6e6;
		font-size: 25px;
	}

	.header-inner {
		display: flex;
		padding: 0 15px;
	}

	.page-title {
		line-height: 1;
		font-size: 24px;
		align-items: center;
		display: flex;
	}

	.navicon {
		top: 12px;
		position: absolute;
		width: 48px;
		height: 48px;
		padding: 12px;
		line-height: 1;
		font-size: 24px;
		display: none;
		${media.md`
			display: block;
		`};
	}

	.pullright{
		float:right;
		height: 60px;
	}

	.header-ul {
        text-decoration: none;
		list-style-type: none;
		display: inline-block;
		float: right;
		margin-top: 0px;
    }

    .header-ul > li {
		display: inline-block;
		padding: 20px;
		color: ${props => props.theme.night}
    }

    .header-ul > li : hover{
		cursor: pointer;		
	}
	
	.highlight-li{
        font-size: 18px;
		border-left: 1px solid #d9d9d9;
		color: #444;
	}

	.highlight-span{
		color: ${props => props.theme.night};
		font-weight: bolder;
	}

	.pagelogo{
		position: absolute;
		top: 4px;
		margin-left: 50px;
	}

	.pagelogo > img{
		width: 150px;
	}
`
/* SidebarLogo */
export const SidebarLogo = styled(ImageComponent)`
	margin: 0px;
`

export const AdvanceFilter = styled.div`
    position: fixed;
    top: 0px;
    bottom: 0px;
    left: 0px;
    right: 0px;
    width: 100%
    height: 100%;
    background-color: #eee;
`

export const LoginFooter = styled(ImageComponent)`
    margin: 0px;
    height: 42px;
    margin-top: 3px !important;
    width: 110%;
`

export const InlineAction = styled.div`
    
    ul{
        list-style-type: none;
        margin: 0px;
    }

    li{
        float: left;
        border: 1px solid #d9d9d9;
        padding: 4px 18px;
        cursor: pointer;
    }

    li:first-child{
        border-radius: 4px 0px 0px 4px;
    }

    li:last-child{
        border-radius: 0px 4px 4px 0px;
    }

    li a{
        text-decoration: none;
        color: #444;
        font-weight: bold;
    }
`

/* SidebarLogoContainer */
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

export const StyledLink = styled.a`
    cursor: pointer;
    display: inline !important;
    color: ${props => props.theme.fadeblack} !important;

    .active {
        color: #5d646b;
        text-decoration: underline;
    }
    
    &:hover {
        color: ${props => props.theme.darkorange} !important;
        transform: scale(1.5);
    }
`
