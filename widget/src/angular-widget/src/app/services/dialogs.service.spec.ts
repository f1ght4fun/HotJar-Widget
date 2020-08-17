import { TestBed } from '@angular/core/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { DialogsService } from './dialogs.service';
import { DocumentService } from './document-actions.service';

describe('DialogsService', () => {
  let service: DialogsService;
  let dServ: DocumentService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MatDialogModule, NoopAnimationsModule, BrowserAnimationsModule],
      providers: [
        DialogsService,
        {
          provide: DocumentService,
          useValue: {
            cleanUp: () => {},
            actionOnSelectedElement: () => {},
            getPositionUnderSelection: () => {},
            getSelectedElementType: () => {}
          }
        }
      ]
    });

    service = TestBed.inject(DialogsService);
    dServ = TestBed.inject(DocumentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('Functions', () => {
    it('selectionTool', () => {
      const spy = spyOn(dServ, 'cleanUp');
      service.selectionTool().subscribe();

      expect(spy).toHaveBeenCalled();
    });

    it('actionTool', () => {
      const spy = spyOn(dServ, 'actionOnSelectedElement');
      service.actionTool().subscribe();

      expect(spy).toHaveBeenCalled();
    });
  });
});
