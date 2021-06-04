import { Component} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef} from '@angular/material/dialog';
import { CommonConst, ExportGridDataConst } from 'src/app/configs/constants';

@Component({
    selector: 'app-export-grid-data',
    templateUrl: './export-grid-data.component.html',
    styleUrls: ['./export-grid-data.component.scss']
})
export class ExportGridDataComponent {

    CommonConst = CommonConst;
    exportGridDataConst = ExportGridDataConst;
    exportGridDataForm: FormGroup;
    isAllColumnsSelected: boolean;
    selectedValue: boolean = true;

    constructor(private dialogRef: MatDialogRef<ExportGridDataComponent>,private formBuilder: FormBuilder) {
        this.exportGridDataForm = this.formBuilder.group({
            documentType: []
          });
    }

    closePopup() {
        this.dialogRef.close({ event: CommonConst.close })
    }

    onExport(data: any) {
        if (data === this.exportGridDataConst.visibleColumns) {
            this.isAllColumnsSelected = false;
        } else {
            this.isAllColumnsSelected = true
        }
        this.dialogRef.close(this.isAllColumnsSelected);
    }

}
