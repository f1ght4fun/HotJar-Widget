import { Component, HostListener, OnInit } from '@angular/core';
import { attempt } from 'lodash-es';
import { BehaviorSubject, Subscription } from 'rxjs';
import * as api from '../../../../../../../api';
import { FunnelType } from '../../interfaces/funnel-event.interface';
import { DialogsService } from '../../services/dialogs.service';
import { DocumentService } from '../../services/document-actions.service';
import { StorageService } from '../../services/storage.service';
import { preventDefaults } from '../../utils/misc.util';

@Component({
  selector: 'app-widget',
  templateUrl: './widget-app.component.html',
  styleUrls: ['./widget-app.component.scss']
})
export class AppComponent implements OnInit {
  private subscription: Subscription;

  readonly eventMap = {
    'event/VISITED_URL': 'Visit Page',
    'event/VIEWED': 'Viewed',
    'event/CLICK': 'Clicked',
    'event/KEY_PRESS': 'Key Entered',
    'event/FOCUS': 'Focused',
    'event/CHANGE': 'Changed'
  };

  constructor(
    private dialogService: DialogsService,
    private storageService: StorageService,
    private documentService: DocumentService,
    private window: Window
  ) {}

  events$: BehaviorSubject<FunnelType[]> = new BehaviorSubject<FunnelType[]>(undefined);

  @HostListener('window:keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    if (!!event.altKey && event.keyCode === 80) {
      this.capturePageVisit(event);
    }

    if (!!event.altKey && event.keyCode === 69) {
      this.captureSelection(event);
    }
  }

  ngOnInit(): void {
    this.events$.next(this.storageService.getEvents());

    this.storageService.Events.subscribe(() => {
      this.events$.next(this.storageService.getEvents());
      this.documentService.scrollToBottom();
    });

    this.documentService.scrollToBottom();
  }

  capturePageVisit = (event: Event) => {
    preventDefaults(event);

    this.storageService.saveEvent({ type: 'event/VISITED_URL', payload: this.window.location.toString() });
  }

  captureSelection = (event: Event) => {
    preventDefaults(event);

    this.openSelectionDialog();
  }

  removeCapturedEvent = (event: Event, idx: number) => {
    preventDefaults(event);

    this.storageService.removeEvent(idx);
  }

  saveFunnel = (event: Event) => {
    preventDefaults(event);

    api.submit(this.events$.getValue());

    this.storageService.removeEvents();
  }

  private openSelectionDialog = () => {
    attempt(() => this.subscription.unsubscribe());

    this.subscription = this.dialogService.selectionTool().subscribe((data: Partial<{ success: boolean }>) => {
      if (!!data?.success) {
        this.openActionDialog();
      }
    });
  }

  private openActionDialog = () => {
    attempt(() => this.subscription.unsubscribe());

    this.subscription = this.dialogService.actionTool().subscribe((data: string) => {
      this.storageService.saveEvent({ type: data, payload: this.documentService.getSelectedElementName() });
      this.documentService.cleanUp();
    });
  }
}
