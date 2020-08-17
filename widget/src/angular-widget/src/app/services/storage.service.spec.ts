import { TestBed } from '@angular/core/testing';
import { NgxWebstorageModule } from 'ngx-webstorage';
import { StorageService } from './storage.service';

describe('StorageService', () => {
  let service: StorageService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NgxWebstorageModule.forRoot()],
      providers: [StorageService]
    });

    service = TestBed.inject(StorageService);
    service.removeEvents();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('Props', () => {
    it('Events', () => {
      let result;
      service.Events.subscribe(() => {
        result = service.getEvents().length;
      });
      expect(result).toEqual(undefined);
      service.saveEvent({ type: 'banana', payload: 'banana' });
      expect(result).toEqual(1);
    });
  });

  describe('Functions', () => {
    it('saveEvent', () => {
      service.saveEvent({ type: 'banana', payload: 'banana' });

      expect(service.events.length).toEqual(1);
    });
    it('removeEvent', () => {
      service.saveEvent({ type: 'banana', payload: 'banana' });
      expect(service.events.length).toEqual(1);
      service.removeEvent(0);
      expect(service.events.length).toEqual(0);
    });
    it('removeEvents', () => {
      service.saveEvent({ type: 'banana', payload: 'banana' });
      expect(service.events.length).toEqual(1);
      service.removeEvents();
      expect(service.events.length).toEqual(0);
    });
    it('getEvents', () => {
      service.saveEvent({ type: 'banana', payload: 'banana' });

      expect(service.getEvents().length).toEqual(1);
    });
  });
});
