import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { DialogPosition } from '@angular/material/dialog';
import { attempt, delay } from 'lodash-es';
import { ElementType } from '../enums/element-type.enum';
import { domRectContains } from '../utils/misc.util';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  private readonly skipElements: Array<string> = ['widget-selection-tool', 'widget-action-tool'];

  private readonly selectionElementStyle = 'border: 2px dashed yellow';
  private readonly actionElementStyle = 'border: 4px solid yellow';

  selectedElement: Element;

  constructor(@Inject(DOCUMENT) private document: Document) {}

  cleanUp = () => {
    this.cleanSelectedElementStyle();

    this.selectedElement = undefined;
  }

  scrollToBottom = () => {
    const saveFunnelElement = this.document.getElementById('save-funnel');

    delay(
      () =>
        attempt(() => {
          saveFunnelElement.scrollIntoView({ behavior: 'smooth', block: 'end' });
        }),
      50
    );
  }

  selectDocumentElement = (x: number, y: number) => {
    const newElement = this.document.elementFromPoint(x, y);
    const widgetElement = this.document.getElementById('widget-container');

    if (!newElement || this.skipElements.includes(newElement.id) || domRectContains(widgetElement.getBoundingClientRect(), x, y)) {
      this.cleanUp();
    } else if (newElement !== this.selectedElement) {
      this.cleanSelectedElementStyle();
      this.selectedElement = newElement;
      this.setSelectedElementStyle(this.selectionElementStyle);
    }
  }

  actionOnSelectedElement = () => {
    this.setSelectedElementStyle(this.actionElementStyle);
  }

  getPositionUnderSelection = (): DialogPosition => {
    const domRect: DOMRect = this.selectedElement.getBoundingClientRect();

    return { top: domRect.bottom + 'px', left: domRect.left + 'px' };
  }

  getSelectedElementType = (): ElementType => {
    if (
      this.selectedElement.tagName.toLowerCase() === 'select' ||
      (this.selectedElement.tagName.toLowerCase() === 'input' &&
        ['checkbox', 'radio'].includes((this.selectedElement.getAttribute('type') || 'text').toLowerCase()))
    ) {
      return ElementType.SELECTLIKE;
    } else if (this.selectedElement.tagName.toLowerCase() === 'textarea' || this.selectedElement.tagName.toLowerCase() === 'input') {
      return ElementType.INPUTLIKE;
    } else {
      return ElementType.ANY;
    }
  }

  getSelectedElementName = (): string => {
    return `${this.selectedElement.tagName.toLowerCase()}#${this.selectedElement.id || this.selectedElement.className}`;
  }

  private setSelectedElementStyle = (style: string) => {
    this.selectedElement.setAttribute('style', style);
  }

  private cleanSelectedElementStyle = () => {
    if (!!this.selectedElement) {
      this.selectedElement.removeAttribute('style');
    }
  }
}
