import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA} from "@angular/material/dialog";



@Component({
  selector: 'app-yes-no-dialog',
  templateUrl: './yes-no-dialog.component.html',
  styleUrls: ['./yes-no-dialog.component.css']
})
export class YesNoDialogComponent implements OnInit {
 


  message:string = 'loading...';


  constructor(
    private dialogRef: MatDialogRef<YesNoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) message:string) {
        this.message = message ; 
    }

    ngOnInit() {

    }

     yes() {
      this.dialogRef.close(true);
    }

    no() {
      this.dialogRef.close(false);
    } 





}
