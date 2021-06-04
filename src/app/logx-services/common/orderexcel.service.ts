import { ElementRef, Injectable } from '@angular/core'; 
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';

const EXCEL_EXTENSION = '.xlsx';
const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';

@Injectable({
  providedIn: 'root'
})
export class OrderexcelService {

  constructor() { }

  public exportJsonToExcel(json: any[], fileName: string): void {
    // inserting first blank row
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(
      json[0].data,
      this.getOptions(json[0])
    );

    for (let i = 1, length = json.length; i < length; i++) {
      // adding a dummy row for separation
      XLSX.utils.sheet_add_json(
        worksheet,
        [{}],
        this.getOptions(
          {
            data: [],
            skipHeader: true
          }, -1)
      );
      XLSX.utils.sheet_add_json(
        worksheet,
        json[i].data,
        this.getOptions(json[i], -1)
      );
    }
    const workbook: XLSX.WorkBook = { Sheets: { Sheet1: worksheet }, SheetNames: ['Sheet1'] };
    // save to file
    XLSX.writeFile(workbook, `${fileName}${EXCEL_EXTENSION}`);
  }

  private getOptions(json: any, origin?: number): any {
    // adding actual data
    const options = {
      skipHeader: true,
      origin: -1,
      header: []
    };
    options.skipHeader = json.skipHeader ? json.skipHeader : false;
    if (!options.skipHeader && json.header && json.header.length) {
      options.header = json.header;
    }
    if (origin) {
      options.origin = origin ? origin : -1;
    }
    return options;
  }

 public exportAsExcelFile(json: any[], excelFileName: string): void {
  // const jsondata: Array<any> = [];
  // for(let i = 1, length = json.length; i < length; i++ ){
  //   jsondata.push(json[i]);
  // }
  // console.log('worksheet',json);
  // console.log('worksheet',jsondata);
  const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
  // const jsondata: Array<any> = XLSX.utils.sheet_to_json(worksheet);
  // const data: Array<any> = [];
  // for(let i = 1, length = jsondata.length; i < length; i++ ){
  //   data.push(jsondata[i]);
  // }
  // console.log('worksheet',data);
  // const worksheetData: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data);
  // console.log(XLSX.utils.sheet_to_json(worksheet, { header: 1 }));
  // console.log('worksheet',worksheetData);
  const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
  const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
  this.saveAsExcelFile(excelBuffer, excelFileName);
}
private saveAsExcelFile(buffer: any, fileName: string): void {
  const data: Blob = new Blob([buffer], {
    type: EXCEL_TYPE
  });
  FileSaver.saveAs(data, fileName + EXCEL_EXTENSION);
}

}

