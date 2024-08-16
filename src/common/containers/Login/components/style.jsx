import styled, {css} from 'styled-components'
import {StyledH1, StyledH2, StyledH3, StyledButton, StyledIcon, StyledLabel} from 'styles/components'
import {Divider, Image as ImageComponent } from 'semantic-ui-react'

export const MainContainer = styled.div`

    .container-column {
        height: 25em;
    }

    .login-dv-container{
        border-bottom: 20px solid #d9d9d9;
        padding-bottom: 3px !important;
    }

    .pad-left{
        padding-left: 30px !important;
    }
    
    .floatleft{
        float:left;
        padding: 0 0 0 10px;
    }
    .btn-eq-txt{
        width: 40% !important;
    }
    .msgErr{
        padding-bottom: 5px;
        padding-right:20px;
    }
`
export const MainH1 = styled(StyledH1)`
    text-align: center;
    margin-top: 20px !important;
    margin-bottom: 5px;
    padding-bottom: 0px;
`
export const MainH2 = styled(StyledH2)`
    text-align: center;
    margin-top: 0px;
    margin-bottom: 20px !important;
    padding-top: 0px;
    padding-bottom: 0px;
    font-size: 20px;
`
export const CarouselContainer = styled.div`        
    display: block;
    background-repeat: no-repeat;
    background-attachment: fixed;
    background-attachment: fixed;
    background-position: center; 
    width:100%;
    height:101%;
    .bgImgopacity{
        opacity: 0.2;
    }  
    .borderTopGrey{
       
        padding-left:8% !important;
        margin-top: 0em !important;
        border-top: 1em solid ${props => props.theme.linecolor} !important;
        padding-bottom: 40px !important;
    }
    .Imgwidth{
        width:30px;
        float:left;
    }
    .ui.grid > * {
        padding:1% 0 0 29%;
        width:75%;
    }
    .ui.grid>.row {
        position: relative;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: inherit;
        align-items: stretch;
        width: 100%!important;
        padding: 0!important;
        padding-top: 1rem!important;
        padding-bottom: 1rem!important;
`
export const LiftSymbol = styled(ImageComponent)`
	margin: 0px;
`

export const LogInInputContainer = styled.div`    
    padding-bottom: 0.75em;    
    margin: 0em 1em;
    display: block;        
    .borderTopOrange{
        padding: 0em;
        margin-top: 0em !important;
        border-top: 1em solid ${props => props.theme.darkorange} !important;
    }
    .color-row{
        background-color: ${props => props.theme.lightgrey};
    }
    .form-button button{
        padding: 0px;
    }
    .form-button label{
        margin-left: 10px;
    }
    .form-button a{
        color: ${props => props.theme.night} !important;
        text-decoration: underline;
    }
    .form-field > div{
        font-size: 12px !important;
        width: 40% !important;
    }
    .form-field > div input{
        font-size: 13px !important;
        padding-left: 3em !important;   
    }    
    .clsRegister{
        cursor: pointer;
        color: #FF6218 !important;
        font-size: 0.9rem;
        padding-left: 5px;
    }
`

export const LoginFooter = styled.div`
    height: auto;
    margin-left: auto;
    margin-right: auto;
    margin-top: 3px;

    .footer-dv{
        height: auto;
    }

    .footer-dv i{
        font-size: 1.6em !important;
        padding-left: 3em !important;
    }

    .footer-dv i.icons .icon{
        top: 20% !important;
        left: 66% !important;
    }
`
export const CarouselH2 = styled(StyledH2)`
    padding: 0.25em;
    text-align: center;
    width:100%;
    color: ${props => props.theme.darkorange}   ;
    font-family: Helvetica, Sans-Serif; 
`
export const CarouselH3 = styled(StyledH3)`
    font-size: 1rem;
    font-weight: 525;
    padding-left: 1.5rem;
    padding-right: 1.5rem;
    margin:0;
    text-align: left;
    color: black;  
    font-family: Helvetica, Sans-Serif;  
`
export const CarouselHeader = styled(StyledH3)`
    font-size: 1rem;
    font-weight: 525;
    padding-left: 1.5rem;
    padding-right: 1.5rem;
    text-align: left;
    color: ${props => props.theme.darkorange};    
`
export const CarouselButton = styled(StyledButton)`
    top: 50%;    
    position: absolute;
    padding: 0rem;    
    background-color: ${props => props.theme.basemedium} !important; 
    color: ${props => props.theme.ocean} !important;
    border: 1px solid ${props => props.theme.nobel} !important;
    border-radius: 0rem !important;    
    height: 5rem !important;
    text-align: center;

    &:hover {        
        position: absolute;
        background-color: ${props => props.theme.basemedium} !important;
        color: ${props => props.theme.oceanbright} !important;
        border: 1px solid ${props => props.theme.nobel} !important;
        border-radius: 0rem !important;
    }

    > i.icon:before,i.icon:after{
        font-size: 1.5rem !important;
    }
`
export const CarouselDivider = styled(Divider)`
    padding: 0em;
    margin: 0em;
    color: ${props => props.theme.linecolor} !important;
    border-top: 1em solid ${props => props.theme.linecolor} !important;
`
export const InfoIcon = styled(StyledIcon)`
    color: ${props => props.theme.ocean} !important;
    padding-left: 11rem;
    padding-bottom: 0rem;
    padding-top: 2rem;
`
export const InfoIcon1 = styled(StyledIcon)`
    color: ${props => props.theme.ocean} !important;
    padding-left: 11rem;
    padding-bottom: 0rem;
    padding-top: 2rem;
    z-index:999;
`
export const InfoH2 = styled(StyledH2)`    
    padding-top: 0rem;
    text-align: center;
    color: ${props => props.theme.lightorange};
    font-size: 1.2rem;
    font-weight: bold;
    margin-top: 0.25rem;

`
export const InfoH3 = styled(StyledH3)`
    font-size: 0.95rem;
    font-weight: 525;
    padding-left: 2rem;
    padding-right: 2rem;
    padding-bottom: 2rem;
    text-align: center;
    color: ${props => props.theme.basedark};
`
export const LoginDivider = CarouselDivider.extend`    
    color: ${props => props.theme.darkorange} !important;
    border-top: 1em solid ${props => props.theme.darkorange} !important;
`
export const LoginH1 = styled(StyledH1)`
    text-align: left;
    margin-bottom: 5px;
    padding-bottom: 0px;
    margin-top: 0px !important;
`
export const LoginButton = styled(StyledButton)`
    width: 12rem;    
    font-size: 1.2rem !important;    
`
export const Link = styled.a`
    color: ${props => props.theme.darkorange} !important;
    font-size: 0.9rem;
    padding-top: 0.3rem !important;
    display: block;
    margin-bottom: 2em;
    
    &:hover   {color:green;}
`
export const CustomeModalHeader = styled.div`
    .header{
        color: ${props => props.theme.darkorange}
    }
`
export const Content = styled.div`
    .empty-alert {
        border: 1px solid #d07373 !important;
        border-right: 6px solid red !important;
    }
    
    .valid-alert {
        border: 1px solid #58c558 !important;
        border-right: 6px solid #58c558 !important;
    }    
`
export const ErrorMessage = styled.span`
    color: red;
    font-size: 11px;
    font-weight: bold;
`
