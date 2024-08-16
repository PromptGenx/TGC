import styled from 'styled-components'

export const ContainerBox = styled.div` 
padding: 30px;
background-color: #fff;
border: 1px solid #d9d9d9;
box-shadow: 0px 0px 10px -4px black;
margin-top: 10px;
min-height: 500px;
`

export const NotCompatibleLayout = styled.div`
  display: flex;
  flex-grow: 1;
  align-items: center;  
  position: fixed;
  width: 100%;
  left: 0px;
  right: 0px;
  bottom: 0px;
  top: 0px;
  margin: auto;
`
