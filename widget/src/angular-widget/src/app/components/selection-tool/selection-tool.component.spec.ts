import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef } from '@angular/material/dialog';
import { DocumentService } from 'src/app/services/document-actions.service';
import { SelectionToolComponent } from './selection-tool.component';

describe('ActionToolComponent', () => {
  let component: SelectionToolComponent;
  let fixture: ComponentFixture<SelectionToolComponent>;
  let closeSpy;
  let docSrv: DocumentService;

  beforeEach(async(() => {
    closeSpy = jasmine.createSpyObj('obj', ['close']);

    TestBed.configureTestingModule({
      declarations: [SelectionToolComponent],
      providers: [
        {
          provide: MatDialogRef,
          useValue: closeSpy
        },
        {
          provide: DocumentService,
          useValue: {
            selectedElement: null,
            selectDocumentElement: () => {}
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(SelectionToolComponent);
    component = fixture.componentInstance;
    docSrv = TestBed.inject(DocumentService);
  }));

  it('should create the component', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('cancel capture should call close', () => {
    const e = jasmine.createSpyObj('e', ['preventDefault', 'stopPropagation', 'stopImmediatePropagation']);

    component.cancelCapture(e);

    expect(closeSpy.close).toHaveBeenCalled();
  });

  it('should call doc service selection method', () => {
    const e = jasmine.createSpyObj('e', ['preventDefault', 'stopPropagation', 'stopImmediatePropagation']);
    const spy = spyOn(docSrv, 'selectDocumentElement').and.stub();

    component.mouseMove(e);

    expect(spy).toHaveBeenCalled();
  });

  it('should not close selection tool unless element selected', () => {
    const e = jasmine.createSpyObj('e', ['preventDefault', 'stopPropagation', 'stopImmediatePropagation']);

    component.documentClick(e);

    expect(closeSpy.close).not.toHaveBeenCalled();
  });

  it('should not close selection tool when element selected', () => {
    const e = jasmine.createSpyObj('e', ['preventDefault', 'stopPropagation', 'stopImmediatePropagation']);

    docSrv.selectedElement = {} as any;
    component.documentClick(e);

    expect(closeSpy.close).toHaveBeenCalled();
  });
});
