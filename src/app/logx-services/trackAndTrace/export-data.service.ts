import { Injectable } from '@angular/core';
import { DatePipe } from '@angular/common';
import { CommonConst, ExportDataConst } from 'src/app/configs/constants';

@Injectable({
  providedIn: 'root'
})
export class ExportDataService {
  ExportDataConst = ExportDataConst;
  CommonConst = CommonConst;
  constructor(public datepipe: DatePipe) { }

  downloadFile(csvData, filename = ExportDataConst.data) {
    let blob = new Blob(['\ufeff' + csvData], { type: ExportDataConst.type });
    let dwldLink = document.createElement(ExportDataConst.a);
    let url = URL.createObjectURL(blob);
    let isSafariBrowser = navigator.userAgent.indexOf(ExportDataConst.safari) != -1 && navigator.userAgent.indexOf(ExportDataConst.Chrome) == -1;
    if (isSafariBrowser) {  //if Safari open in new window to save file with random filename.
      dwldLink.setAttribute(ExportDataConst.target, ExportDataConst.blank);
    }
    dwldLink.setAttribute(ExportDataConst.href, url);
    dwldLink.setAttribute(ExportDataConst.download, filename + ExportDataConst.csv);
    dwldLink.style.visibility = ExportDataConst.hidden;
    document.body.appendChild(dwldLink);
    dwldLink.click();
    document.body.removeChild(dwldLink);
  }

  ConvertToCSV(objArray, headerList, sectionTitle) {
    let array = typeof objArray != ExportDataConst.object ? JSON.parse(objArray) : objArray;
    let str = '';
    let row = '';
    var rowColumnData = '';


    //Add section name 
    row += sectionTitle;
    str += ',' + row + '\r\n';
    row = '';
    for (let index in headerList) {
      row += headerList[index].header + ',';
    }
    row = row.slice(0, -1);
    str += ',' + row + '\r\n';
    for (let i = 0; i < array.length; i++) {
      let line = ''; //(i + 1) +
      for (let index in headerList) {

        let head = headerList[index].field;
        if (head === ExportDataConst.originLocation) {
          let originAddress = [];
          let headerValue = [{ field: ExportDataConst.originLocation }, { field: ExportDataConst.originAddressLine },
          { field: ExportDataConst.originCityName }, { field: ExportDataConst.originState }, { field: ExportDataConst.originZip }]
          for (let index in headerValue) {
            let headVal = headerValue[index].field;

            originAddress.push(String(array[i][headVal]));
          }
          rowColumnData = originAddress.toString().split(",").join(" ");
        }
        if (head === ExportDataConst.destinationLocation) {
          let destAddress = [];
          let headerValue = [{ field: ExportDataConst.destinationLocation }, { field: ExportDataConst.destinationAddressLine },
          { field: ExportDataConst.destinationCityName }, { field: ExportDataConst.destinationState }, { field: ExportDataConst.destinationZip }]
          for (let index in headerValue) {
            let headVal = headerValue[index].field;
            let destdata = String(array[i][headVal]);
            if(destdata != CommonConst.undefined ) 
            destAddress.push(destdata);
          }
          rowColumnData = destAddress.toString().split(",").join(" ");
        }
        if (head === ExportDataConst.priority && sectionTitle === ExportDataConst.additionalInfo) {
          rowColumnData = array[i][head] === false ? ExportDataConst.Low : ExportDataConst.High;
        }
        if (head === ExportDataConst.isHazmat && sectionTitle === ExportDataConst.additionalInfo) {
          rowColumnData = array[i][head] === false ? ExportDataConst.No : ExportDataConst.Yes;
        }
        if (head === ExportDataConst.isHazmat && sectionTitle !== ExportDataConst.additionalInfo) {
          rowColumnData = array[i][head] === false ? ExportDataConst.N : ExportDataConst.Y;
        }
        if (head === ExportDataConst.orderLineId) {
          let rowId = i;
          rowColumnData = String(rowId + 1);
        }
        if (head !== ExportDataConst.destinationLocation && head !== ExportDataConst.originLocation 
        && head !== ExportDataConst.priority && head !== ExportDataConst.isHazmat && head !== ExportDataConst.orderLineId) {
          rowColumnData = String(array[i][head]);
        }
        if (rowColumnData === ExportDataConst.null || rowColumnData === CommonConst.undefined) {
          rowColumnData = '';
        }
        
        line += ',' + (rowColumnData.indexOf(',') > -1 ? rowColumnData.split(",").join(" ") : rowColumnData);
      }
      str += line + '\r\n';
    }
    str += ',' + '' + '\r\n';
    return str;
  }

}
