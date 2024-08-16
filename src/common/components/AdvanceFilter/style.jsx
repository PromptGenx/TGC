import styled from 'styled-components'

export const Filter = styled.div`
    position: fixed;
    top: 0px;
    left: 0px;
    bottom: 0px;
    right: 0px;
    background-color: rgba(60, 53, 53, 0.75);
    width: 100%;
    z-index: 1001;
`

export const BodyCard = styled.div`
    height: 90%;
    margin-top: -20px;
    background-color: ${props => props.theme.white};
    padding-top: 25px;
    overflow-y: auto;
    overflow-x: hidden;

    .first-section{
        display: block;
        margin: 14px 0px;
    }

    .field-title {
        padding: 20px 0px;
        padding-bottom: 6px;
    }

    .visible.menu.transition {
        display: block;
    }

    .search-text{
    }
   
    .binded-data{
        width: 100%;
        min-height: 20px;
        margin-bottom: 20px;
        display: block;
        max-height: 101px;
        overflow-y: auto;
    }

    .binded-data div {
        background-color: ${props => props.theme.softpeach};
        margin-right: 5px;
        padding: 4px 10px;
        border-radius: 4px;
        padding-right: 15px;
        display: inline-block;
        margin-top: 6px;
    }

    .binded-data a{
        color: ${props => props.theme.night};
        text-decoration: underline;
        cursor: pointer;
    }

    .binded-data i{
        cursor: pointer;
    }

    .full{
        width: 196px;
        margin: 0 17px 0 0px;
    }

    .card-field-dv {
        margin-top: 16px;
    }

    .first-item{
        margin-top:25px;
    }

    .card-title {
        position: relative;
        z-index: 10;
        text-align: center;
        top: -20px;
        color: ${props => props.theme.metal};
        font-size: 18px;
        width: 60%;
        background-color: ${props => props.theme.white};
        margin: auto;
    }

    .pull-up{
        margin-top: 10px !important;
    }

    .first-section {
        border: 1px solid ${props => props.theme.shades};
        box-shadow: 0px 0px 23px -11px ${props => props.theme.fadeblack};
        padding: 10px 15px;
        text-align: center;
    }

    .from-picker{
        width: 100%;
    }

    .to-picker{
        margin-left: 14px;
        width: 98%;
    }

    .selection-container{
        display: flex;
    }

    .binded-data i{
        position: relative;
        left: 10px;
        color: ${props => props.theme.darkorange};
    }
`

export const BodyContent = styled.div`
    height: 70%;
    margin: 20px;
    background-color: ${props => props.theme.white};

    .filter-popover-body {
        position: absolute;
        z-index: 100;
        margin-top: 10px;
    }
    .filter-popover-body-right {
        position: absolute;
        z-index: 100;
        margin-top: 10px;
        margin-left:32%;
    }
    .userDatepicker{
        width:196px;
        color: ${props => props.theme.darkorange};
        cursor: pointer;
    }
    
    .filter-right-popover-body {
        position: absolute;
        z-index: 100;
        margin-top: 10px;
        right: 45px;
    }
    .be-center{
        margin: auto;
    }

    .second-section{
        display: flex;
        display-direction: row;
        position: absolute;
        width: calc(100% - 40px);
        bottom: 80px;
    }

    .submit-button {
        margin-left: 0px;
        width: 49%;
    }

    .cancel-button {
        margin-right: 0px;
        width: 49%;
    }

    .inline{
        width: 50%;
    }

`

export const ActionSection = styled.div`
`
export const MessageDiv = styled.div`  
    background-color: ${props => props.colorName === 'red' ? props.theme.lightred : props.colorName === 'green' ? props.theme.lightgreen : props.theme.lightgold} !important;
    color: ${props => props.colorName === 'red' ? props.theme.alizarincrimson : props.colorName === 'green' ? props.theme.green : props.theme.gold};
    border: 2px solid ${props => props.colorName === 'red' ? props.theme.alizarincrimson : props.colorName === 'green' ? props.theme.green : props.theme.gold};
    margin: 5px;
    padding-top: 10px;
    padding-left: 5px;
    font-size: 16px;
    width: 100%;
    border-radius: 5px;    

    .MessageDiv_innerDiv{
        display: inline-flex;
    }
    
    .MessageDiv_innerDiv > p{
        padding: 5px 0 0 5px;
    }
`
export const ErrorMessage = styled.span`
    color: red;
    font-size: 11px;
    font-weight: bold;
    padding-bottom: 10px !important;
`
