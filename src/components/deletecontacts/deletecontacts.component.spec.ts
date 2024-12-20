import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletecontactsComponent } from './deletecontacts.component';

describe('DeletecontactsComponent', () => {
  let component: DeletecontactsComponent;
  let fixture: ComponentFixture<DeletecontactsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeletecontactsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeletecontactsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
