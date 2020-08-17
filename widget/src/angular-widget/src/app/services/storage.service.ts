import { Injectable } from '@angular/core';
import { LocalStorage, LocalStorageService } from 'ngx-webstorage';
import { Observable } from 'rxjs';
import { FunnelType } from '../interfaces/funnel-event.interface';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  @LocalStorage('funnelEvents') events;

  get Events(): Observable<FunnelType[]> {
    return this.storageService.observe('funnelEvents');
  }

  constructor(private storageService: LocalStorageService) {}

  getEvents = (): FunnelType[] => this.storageService.retrieve('funnelEvents');

  saveEvent = (event: FunnelType) => {
    if (!this.events) {
      this.events = [];
    }

    this.events.push(event);
    this.storageService.store('funnelEvents', [...this.events]);
  }

  removeEvent = (idx: number) => {
    this.events.splice(idx, 1);
    this.storageService.store('funnelEvents', [...this.events]);
  }

  removeEvents = () => {
    this.events = [];
    this.storageService.store('funnelEvents', [...this.events]);
  }
}
