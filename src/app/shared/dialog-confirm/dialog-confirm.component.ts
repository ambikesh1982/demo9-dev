import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-confirm',
  templateUrl: './dialog-confirm.component.html',
  styleUrls: ['./dialog-confirm.component.scss']
})
export class DialogConfirmComponent implements OnInit {

  dialogMessage: string;

  constructor(
    private dialogRef: MatDialogRef<DialogConfirmComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.dialogMessage = data.dialogMessage;
    console.log('MAT_DIALOG_DATA from parent: ', data);
  }

  ngOnInit() {
  }

}
