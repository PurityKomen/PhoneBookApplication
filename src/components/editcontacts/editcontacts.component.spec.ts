import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditcontactsComponent } from './editcontacts.component';

describe('EditcontactsComponent', () => {
  let component: EditcontactsComponent;
  let fixture: ComponentFixture<EditcontactsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditcontactsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditcontactsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
