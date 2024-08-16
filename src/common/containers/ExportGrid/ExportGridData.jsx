import React, {Component} from 'react'
import { IsValid, IsNotNullOrEmpty, GetGlobalizedName, reactIntlFormattedStr } from 'api/utils/helper'
import * as XLSX from 'xlsx'
import { getUserLocale, GetManageDisplayGridFieldsByPage } from 'api/LocalStorageCookiesSvc'
import FileSaver from 'file-saver'
import CommonService from '../ScheduleAppointment/components/CommonService'

class ExportGridData extends Component {
	constructor (props) {
		super(props)
		this.DoExporttoexcel = this.DoExporttoexcel.bind(this)
		this.S2ab = this.S2ab.bind(this)
		this.ExportMyAppointment = this.ExportMyAppointment.bind(this)
	}

	S2ab (s) {
		var buf = new ArrayBuffer(s.length)
		var view = new Uint8Array(buf)
		for (var i = 0; i < s.length; i++) view[i] = s.charCodeAt(i) & 0xFF
		return buf
	}

	DoExporttoexcel (DataArray, PageName, Headers) {
		if (!IsValid(DataArray)) {
			throw new Error('Please pass grid detail to export')
		} else if (PageName === 'myappointment') {
			this.ExportMyAppointment(DataArray, Headers, 'Appointments', 'MyAppointment')
		} else if (PageName === 'watchlist') {
			this.ExportWatchList(DataArray, Headers, 'WatchList', 'WatchList')
		}
	}

	ExportNow (DataArray, SheetName, ExcelName) {
		var wb = XLSX.utils.book_new()
		wb.Props = {
			Title: 'TERMPoint',
			Subject: SheetName,
			Author: 'TERMPoint',
			CreatedDate: new Date()
		}

		wb.SheetNames.push(SheetName)
		var ws_data = DataArray
		var ws = XLSX.utils.aoa_to_sheet(ws_data)
		wb.Sheets[SheetName] = ws
		var wbout = XLSX.write(wb, {bookType: 'xlsx', type: 'binary'})
		FileSaver.saveAs(new Blob([this.S2ab(wbout)], {type: 'application/octet-stream'}), ExcelName + '.xlsx')
	}

	GetDate = (ApptDate, service) => {
		let ParsedDate = ''
		let DatePart = ''
		let TimePart = ''
		if (IsValid(ApptDate) && ApptDate.indexOf('T') !== -1) {
			ApptDate = ApptDate.split('T')
			if (ApptDate.length > 1) {
				DatePart = ApptDate[0]
				TimePart = ApptDate[1].substr(0, 5)
			}
			let LocateDate = service.GlobalDateFormatter(new Date(DatePart).toLocaleDateString(getUserLocale()), getUserLocale())
			if (IsValid(LocateDate) && IsValid(LocateDate.culturedBase)) {
				ParsedDate = LocateDate.culturedBase + '-' + TimePart
			} else {
				ParsedDate = DatePart + '-' + TimePart
			}
		}
		return ParsedDate
	}

	/* -------------------------------------------------------------  Page service methods to export excel. -------------------------------------------- */

	ExportWatchList (Data, Header, SheetName, FileName) {
		let ExcelJsonData = []
		let FirstData = ''
		let RowData = []
		if (IsValid(Header)) {
			let EmptyLine = ['', '', '', '', '', '', '', '', '', '', '']
			const service = new CommonService()
			 let ValidFields = GetManageDisplayGridFieldsByPage('', 'Watchlist.jsx')
			ExcelJsonData.push(Header)
			ExcelJsonData.push(EmptyLine)
			if (IsValid(Data)) {
				let index = 0
				while (index < Data.length) {
					RowData = []
					let $CommonObject = Data[index]
					if (IsValid($CommonObject)) {
						ValidFields.includes('containerid') && RowData.push($CommonObject['Container_Num'])
						ValidFields.includes('available') && RowData.push(IsValid($CommonObject['Available_Flg']) ? $CommonObject['Available_Flg'] : 'NO')
						ValidFields.includes('freight') && RowData.push($CommonObject['Freight'])
						ValidFields.includes('customs') && RowData.push($CommonObject['Customs'])
						ValidFields.includes('demurrage') && RowData.push($CommonObject['Demurrage'])
						ValidFields.includes('shippingline') && RowData.push($CommonObject['Line_Id'])
						ValidFields.includes('equipsize') && RowData.push($CommonObject['SzTp'])
						ValidFields.includes('cargorefnum') && RowData.push($CommonObject['CargoRef_Num'])
						ValidFields.includes('yardloc') && RowData.push($CommonObject['Position'])
						ValidFields.includes('holds') && RowData.push($CommonObject['Holds'])
						ValidFields.includes('goodthru') && RowData.push(IsValid($CommonObject['GoodThru']) ? this.GetDate($CommonObject['GoodThru'], service).split('-')[0] : '')
						ValidFields.includes('grossweight') && RowData.push($CommonObject['Gross_Weight'])
						ValidFields.includes('hazmatflg') && RowData.push($CommonObject['Hazmat_Flg'])
						ValidFields.includes('dischargeddate') && RowData.push(this.GetDate($CommonObject['Discharged'], service))
						ValidFields.includes('pickedup') && RowData.push(this.GetDate($CommonObject['PickedUp'], service))
						FirstData = JSON.stringify(RowData)
						ExcelJsonData.push((JSON.parse(FirstData)))
					} else {
						throw new Error('Given data is null or empty')
					}
					index++
				}
			}
			this.ExportNow(ExcelJsonData, SheetName, FileName)
		}
	}

	ExportMyAppointment (Data, Header, SheetName, FileName) {
		let ExcelJsonData = []
		let FirstData = ''
		let SecondData = ''
		let RowData = []
		if (IsValid(Header)) {
			let EmptyLine = ['', '', '', '', '', '', '', '', '', '', '']
			const service = new CommonService()
			ExcelJsonData.push(Header)
			ExcelJsonData.push(EmptyLine)
			if (IsValid(Data)) {
				let index = 0
				while (index < Data.length) {
					RowData = []
					let $CommonObject = Data[index]
					if (IsValid($CommonObject)) {
						let LocateDate = ''
						RowData.push($CommonObject['GateAppt_Num'])
						let ApptDate = $CommonObject['GateAppt_DtTm']
						if (IsValid(ApptDate) && ApptDate.indexOf('T') !== -1) {
							ApptDate = ApptDate.split('T')
							if (ApptDate.length > 1) {
								ApptDate = ApptDate[1].substr(0, 5)
							}
						}
						RowData.push($CommonObject['GateAppt_DtTm'])
						RowData.push('')
						RowData.push($CommonObject['Gate_Id'])
						RowData.push($CommonObject['Driver_Nm'])
						RowData.push($CommonObject['Plate_Nbr'])
						let FormatDate = null
						try {
							FormatDate = new Date($CommonObject['GateAppt_Dt'])
						} catch (e) {
							FormatDate = $CommonObject['GateAppt_Dt']
						}
						LocateDate = service.GlobalDateFormatter(FormatDate, getUserLocale())
						if (IsValid(LocateDate) && IsValid(LocateDate.culturedBase)) {
							RowData[1] = LocateDate.culturedBase
						} else {
							RowData[1] = $CommonObject['GateAppt_Dt']
						}
						RowData[2] = ApptDate + ' - ' + $CommonObject['GateEnd_Tm']
						RowData.push($CommonObject['ApptType_Dsc'])
						RowData.push($CommonObject['LIne_Id'])
						RowData.push($CommonObject['CargoRef_Num'])
						RowData.push($CommonObject['Container_Num'])
						RowData.push($CommonObject['Con_Cd'])
						RowData.push($CommonObject['DriverOwnChs_Flg'])
						RowData.push($CommonObject['ApptStatus_Dsc'])
						ExcelJsonData.push(RowData)

						index++
					} else {
						throw new Error('Given state appointments.value is null or empty')
					}
				}
			}
			this.ExportNow(ExcelJsonData, SheetName, FileName)
		}
	}
}

export default ExportGridData
