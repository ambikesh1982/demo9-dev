import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { DialogConfirmComponent } from '../shared/dialog-confirm/dialog-confirm.component';

@Injectable({
  providedIn: 'root'
})
export class DialogService {
  constructor(private dialog: MatDialog) { }

  openDialog(dialogMsg: string): Observable<boolean> {
    const dialogConfig = new MatDialogConfig();
    // Set dialog configuration and data property.
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.hasBackdrop = true;
    dialogConfig.data = { dialogMessage: dialogMsg };

    // Passing data to DialogComponent
    const dialogRef = this.dialog.open(DialogConfirmComponent, dialogConfig);
    return dialogRef.afterClosed();
  }
}
