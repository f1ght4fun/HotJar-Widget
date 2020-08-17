import { DOCUMENT } from '@angular/common';
import { discardPeriodicTasks, fakeAsync, flushMicrotasks, TestBed, tick } from '@angular/core/testing';
import { ElementType } from '../enums/element-type.enum';
import { DocumentService } from './document-actions.service';

describe('DocumentService', () => {
  let service: DocumentService;
  let doc: Document;

  const mockElement = {
    id: 'banana',
    className: 'bananapeel',
    tagName: 'a',
    scrollIntoView: () => {},
    getAttribute: () => {},
    removeAttribute: () => {},
    setAttribute: () => {},
    getBoundingClientRect: () => ({ top: 100, bottom: 100, left: 100, right: 100 })
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        DocumentService,
        {
          provide: DOCUMENT,
          useValue: {
            getElementById: () => mockElement,
            elementFromPoint: () => mockElement
          }
        }
      ]
    });

    service = TestBed.inject(DocumentService);
    doc = TestBed.inject(DOCUMENT);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('Functions', () => {
    it('cleanUp', () => {
      service.selectedElement = mockElement as any;
      expect(service.selectedElement).not.toBeUndefined();
      service.cleanUp();
      expect(service.selectedElement).toBeUndefined();
    });
    it('cleanUp style is not called if element is undefined', () => {
      const spy = spyOn(mockElement, 'removeAttribute').and.stub();
      service.cleanUp();
      expect(spy).not.toHaveBeenCalled();
    });
    it('set solid border once element selected', () => {
      const spy = spyOn(mockElement, 'setAttribute').and.stub();
      service.selectedElement = mockElement as any;
      service.actionOnSelectedElement();

      expect(spy).toHaveBeenCalled();
    });
    it('return element name with id present', () => {
      service.selectedElement = mockElement as any;
      expect(service.getSelectedElementName()).toEqual('a#banana');
    });
    it('return element name with className as fallback if id not present', () => {
      service.selectedElement = { ...mockElement, id: undefined } as any;
      expect(service.getSelectedElementName()).toEqual('a#bananapeel');
    });
    it('get position to open action tool under selected element', () => {
      service.selectedElement = mockElement as any;
      const position = service.getPositionUnderSelection();
      expect(position.top).toEqual('100px');
    });
    it('scrolls down until element is visible', fakeAsync(() => {
      const spy = spyOn(mockElement, 'scrollIntoView').and.stub();

      service.scrollToBottom();

      tick(100);
      flushMicrotasks();
      discardPeriodicTasks();

      expect(spy).toHaveBeenCalled();
    }));
    it('analyse selected element type and in case its not form control return any', () => {
      service.selectedElement = mockElement as any;
      expect(service.getSelectedElementType()).toEqual(ElementType.ANY);
    });
    it('analyse selected element type and in case it is a select return SELECTLIKE', () => {
      service.selectedElement = { ...mockElement, tagName: 'select' } as any;
      expect(service.getSelectedElementType()).toEqual(ElementType.SELECTLIKE);
    });
    it('analyse selected element type and in case it is a default input return INPUTLIKE', () => {
      service.selectedElement = { ...mockElement, tagName: 'input' } as any;
      expect(service.getSelectedElementType()).toEqual(ElementType.INPUTLIKE);
    });
    it('select document element on specific position', () => {
      const cleanUpSpy = spyOn(service, 'cleanUp');

      service.selectDocumentElement(20, 20);

      expect(cleanUpSpy).not.toHaveBeenCalled();
      expect(service.selectDocumentElement).not.toBeUndefined();
    });
    it('select document element on specific position', () => {
      const cleanUpSpy = spyOn(service, 'cleanUp');

      service.selectDocumentElement(20, 20);

      expect(cleanUpSpy).not.toHaveBeenCalled();
      expect(service.selectDocumentElement).not.toBeUndefined();
    });
    it('select document should do cleanup when no element selected within document in works', () => {
      const cleanUpSpy = spyOn(service, 'cleanUp');
      spyOn(doc, 'elementFromPoint').and.returnValue(undefined);

      service.selectDocumentElement(20, 20);

      expect(cleanUpSpy).toHaveBeenCalled();
    });
    it('select document should do cleanup when element selected within document is within skip elements', () => {
      const cleanUpSpy = spyOn(service, 'cleanUp');

      spyOn(doc, 'elementFromPoint').and.returnValue({ ...mockElement, id: 'widget-selection-tool' } as any);
      service.selectDocumentElement(20, 20);

      expect(cleanUpSpy).toHaveBeenCalled();
    });
  });
});
