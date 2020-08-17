import { Component, HostListener } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { DocumentService } from 'src/app/services/document-actions.service';
import { preventDefaults } from 'src/app/utils/misc.util';

@Component({
  selector: 'app-selection-tool',
  templateUrl: './selection-tool.component.html',
  styleUrls: ['./selection-tool.component.scss']
})
export class SelectionToolComponent {
  constructor(private dialogRef: MatDialogRef<SelectionToolComponent>, private docService: DocumentService) {}

  @HostListener('document:click', ['$event'])
  documentClick = (event: MouseEvent) => {
    preventDefaults(event);

    if (!!this.docService.selectedElement) {
      this.dialogRef.close({ success: true });
    }
  }

  @HostListener('document:mousemove', ['$event'])
  mouseMove = (event: MouseEvent) => {
    this.docService.selectDocumentElement(event.clientX, event.clientY);
  }

  cancelCapture = (event: MouseEvent) => {
    preventDefaults(event);

    this.dialogRef.close();
  }
}
