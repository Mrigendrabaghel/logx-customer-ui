import { DocumentsConst, IncidentConst } from 'src/app/configs/constants';
import { OktaAuthService } from '@okta/okta-angular';
import { updateShorthandPropertyAssignment } from 'typescript';
import { userAccess } from '../models/user-preference.model';


export function CopyPasteData(searchTextOldValue: string, pastedText: string): string {

  pastedText = pastedText.replace(/\s+/g, ",");

  if (searchTextOldValue.length > 0) {
    var delimiter = ",";
    if (delimiter.localeCompare(searchTextOldValue.charAt(searchTextOldValue.length - 1)) === 0) {
      //If textbox value already containes data ending with "," delimeter before paste remove it
      searchTextOldValue = searchTextOldValue.substr(0, searchTextOldValue.length - 1);
    }    
    var selectedtext = "";
      selectedtext = window.getSelection().toString();
    if(selectedtext ==""){
      searchTextOldValue = searchTextOldValue.concat(",", pastedText);     
  
    }else{      
      searchTextOldValue = searchTextOldValue.replace(selectedtext,pastedText);
    }
  }
  else {
    searchTextOldValue = pastedText;
  }
  return searchTextOldValue;
}

export function ReplacePastedDataWithSpace(searchTextOldValue: string, pastedText: string): string {

  pastedText = pastedText.replace(/\s+/g, "\n");

  if (searchTextOldValue.length > 0) {
    var delimiter = ",";
    if (delimiter.localeCompare(searchTextOldValue.charAt(searchTextOldValue.length - 1)) === 0) {
      //If textbox value already containes data ending with "," delimeter before paste remove it
      searchTextOldValue = searchTextOldValue.substr(0, searchTextOldValue.length - 1);
    }
    searchTextOldValue = searchTextOldValue.concat(",", pastedText);

  }
  else {
    searchTextOldValue = pastedText;
  }
  return searchTextOldValue;
}

export function IsUserLoggedIn(): boolean {
  if (localStorage.getItem('userObject')) {
    return true;
  }
  return false;
}

export function Userinfo(): userAccess {
  if (localStorage.getItem('userInfo')) {
    return  JSON.parse(localStorage.getItem('userInfo'))[0];
  }
}

export function previewMatchSortingFn(item, header: any): any  {
  switch (header) {
    case 'orderNumber':
      return item.orderNum;
    case 'status':
      return item.status;
    case 'firstTCN':
      return item.tcnNumber;
    case 'originLocation':
      return item.originLocation;
    case 'deliveryLocation':
      return item.deliveryLocation;
    case 'pickUpDate':
      if (item.pickupDateTimeUtc) {
        let newDate = new Date(item.pickupDateTimeUtc);
        return newDate;
      }
    case 'aDeliveryDate':
      if (item.deliveryDateTimeUtc) {
        let newDate = new Date(item.deliveryDateTimeUtc);
        return newDate;
      }

      return;
    default:
      break;
  }
}

export function GetContentType(fileType:string):string
{
   let contentType:string = '';
  switch (fileType.toLowerCase()) {
    case DocumentsConst.AccessDocuments.pdf: contentType =  DocumentsConst.AccessDocuments.pdfContentType;
      break;
    case DocumentsConst.AccessDocuments.jpg:
    case DocumentsConst.AccessDocuments.jpeg: contentType = DocumentsConst.AccessDocuments.jpegContentType;
    case DocumentsConst.AccessDocuments.png: contentType = DocumentsConst.AccessDocuments.pngContentType;
      break;
    case DocumentsConst.AccessDocuments.text: contentType = DocumentsConst.AccessDocuments.textContentType;
      break;
    case DocumentsConst.AccessDocuments.txt: contentType = DocumentsConst.AccessDocuments.textContentType;
      break;
    case DocumentsConst.AccessDocuments.xlsx: contentType = DocumentsConst.AccessDocuments.xlsxContentType;
      break;
    case DocumentsConst.AccessDocuments.docx: contentType = DocumentsConst.AccessDocuments.docxContentType;
      break;
    case DocumentsConst.AccessDocuments.xls: contentType = DocumentsConst.AccessDocuments.xlsContentType;
      break;
    case DocumentsConst.AccessDocuments.doc: contentType = DocumentsConst.AccessDocuments.docContentType;
      break;
    case DocumentsConst.AccessDocuments.msg: contentType = DocumentsConst.AccessDocuments.msgContentType;
      break;
    case DocumentsConst.AccessDocuments.tiff: contentType = DocumentsConst.AccessDocuments.tiffContentType;
      break;
    case DocumentsConst.AccessDocuments.html: contentType = DocumentsConst.AccessDocuments.htmlContentType;
      break;
    case DocumentsConst.AccessDocuments.word: contentType = DocumentsConst.AccessDocuments.docContentType;
      break;
      case DocumentsConst.AccessDocuments.excel: contentType = DocumentsConst.AccessDocuments.xlsxContentType;
      break;
  }
  return contentType;
}

//ToDo Need refer in future
// export function getUserName(): string {
//   var userName = '';
//   var userInfo
//   var values = JSON.parse(localStorage.getItem(IncidentConst.oktaTokenStorage));
//   if (values && values.idToken && values.idToken.claims) {
//     userInfo = values.idToken.claims;
//     userName = userInfo.name;
//     return userName;
//   }
// }

export function getClientName(): string { //Future purpose for Client Name
  var clientName = 'DFTS';//Future purpose need to change it
  return clientName;
}

export function generateOrderNumber(existingOrderNumber: number): any {
  var orderNumber: any;
  var currentDate = new Date();
  var dd = currentDate.getDate();
  var mm = currentDate.getMonth() + 1;
  var year = currentDate.getFullYear().toString().substr(-2);
  if (dd < 10) {
    var date = '0' + currentDate.getDate().toString().slice(-2);
  } else {
    date = dd.toString();;
  }

  if (mm < 10) {
    var month = '0' + (currentDate.getMonth() + 1).toString().slice(-2)
  } else {
    month = dd.toString();
  }

  let updatedOrderNumber: number = existingOrderNumber + 1;


  if (updatedOrderNumber <= 9) {
    orderNumber = "ORD" + year + month + date + "-000000" + updatedOrderNumber;
  }

  if (updatedOrderNumber > 9 && updatedOrderNumber <= 99) {
    orderNumber = "ORD" + year + month + date + "-00000" + updatedOrderNumber;
  }

  if (updatedOrderNumber > 99 && updatedOrderNumber <= 999) {
    orderNumber = "ORD" + year + month + date + "-0000" + updatedOrderNumber;
  }

  if (updatedOrderNumber > 999 && updatedOrderNumber <= 9999) {
    orderNumber = "ORD" + year + month + date + "-000" + updatedOrderNumber;
  }

  if (updatedOrderNumber > 9999 && updatedOrderNumber <= 99999) {
    orderNumber = "ORD" + year + month + date + "-00" + updatedOrderNumber;
  }

  if (updatedOrderNumber > 99999 && updatedOrderNumber <= 999999) {
    orderNumber = "ORD" + year + month + date + "-0" + updatedOrderNumber;
  }

  if (updatedOrderNumber > 999999 && updatedOrderNumber <= 9999999) {
    orderNumber = "ORD" + year + month + date + "-" + updatedOrderNumber;
  }

  orderNumber = "ORD" + year + month + date + "-000000" + updatedOrderNumber;
  return orderNumber;
}

export function generateIRNumber(existingIRNumber: number): any {
  var IRNumber: any;
  var currentDate = new Date();
  var dd = currentDate.getDate();
  var mm = currentDate.getMonth() + 1;
  var year = currentDate.getFullYear().toString().substr(-2);
  if (dd < 10) {
    var date = '0' + currentDate.getDate().toString().slice(-2);
  } else {
    date = dd.toString();;
  }

  if (mm < 10) {
    var month = '0' + (currentDate.getMonth() + 1).toString().slice(-2)
  } else {
    month = dd.toString();
  }

  let updatedIRNumber = existingIRNumber + 1;

  if (updatedIRNumber <= 9) {
    IRNumber = "IRL" + year + month + date + "-000000" + updatedIRNumber;
  }

  if (updatedIRNumber > 9 && updatedIRNumber <= 99) {
    IRNumber = "IRL" + year + month + date + "-00000" + updatedIRNumber;
  }

  if (updatedIRNumber > 99 && updatedIRNumber <= 999) {
    IRNumber = "IRL" + year + month + date + "-0000" + updatedIRNumber;
  }

  if (updatedIRNumber > 999 && updatedIRNumber <= 9999) {
    IRNumber = "IRL" + year + month + date + "-000" + updatedIRNumber;
  }

  if (updatedIRNumber > 9999 && updatedIRNumber <= 99999) {
    IRNumber = "IRL" + year + month + date + "-00" + updatedIRNumber;
  }

  if (updatedIRNumber > 99999 && updatedIRNumber <= 999999) {
    IRNumber = "IRL" + year + month + date + "-0" + updatedIRNumber;
  }

  if (updatedIRNumber > 999999 && updatedIRNumber <= 9999999) {
    IRNumber = "IRL" + year + month + date + "-" + updatedIRNumber;
  }
  return IRNumber;
}

export function getUserInfo(){
  var user_info: any;
  user_info= JSON.parse(localStorage.getItem('userInfo'))[0];
  if(user_info!=null) 
  return user_info;
}




