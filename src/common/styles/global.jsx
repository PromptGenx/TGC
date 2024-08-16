import {injectGlobal} from 'styled-components'

// NOTE: some styles are duplicated to make SSRed app looks better
injectGlobal`
  body {
    margin: 0;
	  padding: 0;
	  overflow-x: hidden;
	  min-width: 320px;
	  background: ${props => props.theme.basemediumlight};
	  font-family: 'Lato', 'Helvetica', 'Helvetica Neue', Arial, sans-serif !important;
	  font-size: 1rem;
	  line-height: 1.4285em;
	  color: rgba(0, 0, 0, 0.87);
  }

  #app {
    width: 100%;
    height: 100%;
	}
	
	.react-datepicker .react-datepicker-container .react-datepicker-body .react-datepicker-row .react-datepicker-picker.selected {
		margin: 0px !important;
	}
`
