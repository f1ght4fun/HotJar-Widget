import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BehaviorSubject, of } from 'rxjs';
import { DialogsService } from 'src/app/services/dialogs.service';
import { DocumentService } from 'src/app/services/document-actions.service';
import { StorageService } from 'src/app/services/storage.service';
import { AppComponent } from './widget-app.component';

class MockDialogService {
  selection = new BehaviorSubject<any>(null);

  selectionTool = () => this.selection;
  actionTool = () => of('banana');
}

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let dSrv: DialogsService;
  let sSrv: StorageService;
  let docSrv: DocumentService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent],
      providers: [
        {
          provide: DialogsService,
          useClass: MockDialogService
        },
        {
          provide: StorageService,
          useValue: {
            saveEvent: () => {},
            removeEvent: () => {},
            removeEvents: () => {},
            getEvents: () => [{ type: 'api/VISITED_URL', payload: 'banana' }],
            Events: of([{ type: 'api/VISITED_URL', payload: 'banana' }])
          }
        },
        {
          provide: DocumentService,
          useValue: {
            cleanUp: () => {},
            getSelectedElementName: () => 'banana',
            scrollToBottom: () => {}
          }
        },
        {
          provide: Window,
          useValue: window
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;

    dSrv = TestBed.inject(DialogsService);
    docSrv = TestBed.inject(DocumentService);
    sSrv = TestBed.inject(StorageService);
  }));

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  describe('keypressing events', () => {
    it('when alt p capture page visit', () => {
      const spy = spyOn(component, 'capturePageVisit');

      component.onKeyDown({ keyCode: 80, altKey: true } as any);

      expect(spy).toHaveBeenCalled();
    });
    it('when alt e capture element by calling selection tool', () => {
      const spy = spyOn(component, 'captureSelection').and.stub();

      component.onKeyDown({ keyCode: 69, altKey: true } as any);

      expect(spy).toHaveBeenCalled();
    });

    it('when alt any other char should not do anything', () => {
      const spy = spyOn(component, 'captureSelection').and.stub();

      component.onKeyDown({ keyCode: 2, altKey: true } as any);

      expect(spy).not.toHaveBeenCalled();
    });
  });

  describe('Functions', () => {
    it('capture page visit', () => {
      const spy = spyOn(sSrv, 'saveEvent').and.stub();
      const e = jasmine.createSpyObj('e', ['preventDefault', 'stopPropagation', 'stopImmediatePropagation']);

      component.capturePageVisit(e);

      expect(spy).toHaveBeenCalled();
    });

    it('remove event', () => {
      const spy = spyOn(sSrv, 'removeEvent').and.stub();
      const e = jasmine.createSpyObj('e', ['preventDefault', 'stopPropagation', 'stopImmediatePropagation']);

      component.removeCapturedEvent(e, 0);

      expect(spy).toHaveBeenCalled();
    });

    it('save funnel', () => {
      component.ngOnInit();

      const spy = spyOn(sSrv, 'removeEvents').and.stub();
      const e = jasmine.createSpyObj('e', ['preventDefault', 'stopPropagation', 'stopImmediatePropagation']);

      component.saveFunnel(e);

      expect(spy).toHaveBeenCalled();
    });

    it('capture selection but only first step and not got to action until element is selected', () => {
      component.ngOnInit();

      const spy = spyOn(dSrv, 'selectionTool').and.callThrough();
      const spyActionTool = spyOn(dSrv, 'actionTool').and.callThrough();
      const e = jasmine.createSpyObj('e', ['preventDefault', 'stopPropagation', 'stopImmediatePropagation']);

      component.captureSelection(e);

      expect(spy).toHaveBeenCalled();
      expect(spyActionTool).not.toHaveBeenCalled();
    });

    it('capture selection and than proceed to the action tool', () => {
      component.ngOnInit();

      (dSrv as any).selection.next({ success: true });

      const spy = spyOn(dSrv, 'selectionTool').and.callThrough();
      const spyActionTool = spyOn(dSrv, 'actionTool').and.callThrough();
      const e = jasmine.createSpyObj('e', ['preventDefault', 'stopPropagation', 'stopImmediatePropagation']);

      component.captureSelection(e);

      expect(spy).toHaveBeenCalled();
      expect(spyActionTool).toHaveBeenCalled();
    });
  });
});
