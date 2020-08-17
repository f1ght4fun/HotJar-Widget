import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ElementType } from 'src/app/enums/element-type.enum';

@Component({
  selector: 'app-action-tool',
  templateUrl: './action-tool.component.html',
  styleUrls: ['./action-tool.component.scss']
})
export class ActionToolComponent implements OnInit {
  private elementActions: Record<ElementType, Array<Partial<{ text: string; value: string }>>> = {
    [ElementType.ANY]: [
      { text: 'Viewed', value: 'event/VIEWED' },
      { text: 'Clicked', value: 'event/CLICK' }
    ],
    [ElementType.INPUTLIKE]: [
      { text: 'Key Pressed', value: 'event/KEY_PRESS' },
      { text: 'Focused', value: 'event/FOCUS' }
    ],
    [ElementType.SELECTLIKE]: [
      { text: 'Changed', value: 'event/KEY_PRESS' },
      { text: 'Focused', value: 'event/FOCUS' }
    ]
  };
  actionOptions: Array<Partial<{ text: string; value: string }>> = [];

  constructor(@Inject(MAT_DIALOG_DATA) public data: Partial<{ elementType: ElementType }>) {}

  ngOnInit(): void {
    this.actionOptions = this.elementActions[this.data.elementType] || [];
  }
}
