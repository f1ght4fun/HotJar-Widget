import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ElementType } from 'src/app/enums/element-type.enum';
import { ActionToolComponent } from './action-tool.component';

describe('ActionToolComponent', () => {
  let component: ActionToolComponent;
  let fixture: ComponentFixture<ActionToolComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ActionToolComponent],
      providers: [
        {
          provide: MAT_DIALOG_DATA,
          useValue: { elementType: ElementType.ANY }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ActionToolComponent);
    component = fixture.componentInstance;
  }));

  it('should create the component', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should populate action Options based on Element Type ', () => {
    component.ngOnInit();
    expect(component.actionOptions).not.toBeUndefined();
    expect(component.actionOptions.length).toEqual(2);
  });
});
