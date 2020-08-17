import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { ActionToolComponent } from '../components/action-tool/action-tool.component';
import { SelectionToolComponent } from '../components/selection-tool/selection-tool.component';
import { DocumentService } from './document-actions.service';

@Injectable({
  providedIn: 'root'
})
export class DialogsService {
  constructor(private dialog: MatDialog, private documentService: DocumentService) {}

  selectionTool = (): Observable<any> => {
    this.documentService.cleanUp();

    return this.dialog
      .open(SelectionToolComponent, {
        id: 'hotjar-selection-tool',
        height: '65px',
        width: '330px',
        hasBackdrop: false,
        position: {
          top: '0px'
        },
        panelClass: 'selection-overlay'
      })
      .afterClosed();
  }

  actionTool = (): Observable<any> => {
    this.documentService.actionOnSelectedElement();

    return this.dialog
      .open(ActionToolComponent, {
        id: 'hotjar-action-tool',
        height: '65px',
        width: '200px',
        disableClose: true,
        hasBackdrop: true,
        position: this.documentService.getPositionUnderSelection(),
        data: {
          elementType: this.documentService.getSelectedElementType()
        },
        panelClass: 'action-overlay'
      })
      .afterClosed();
  }
}
