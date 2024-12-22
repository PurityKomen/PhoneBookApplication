import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ContactlistComponent } from './contactlist.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ContactlistComponent', () => {
  let component: ContactlistComponent;
  let fixture: ComponentFixture<ContactlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactlistComponent,HttpClientTestingModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContactlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should test toggle for viewing contact details', () => {
    spyOn(component, 'toggle').and.callThrough();
    component.toggle(1)
    expect(component.toggle).toHaveBeenCalled();
  });

  it('should test edit for editing contact details', () => {
    spyOn(component, 'edit').and.callThrough();
    component.edit(1)
    expect(component.edit).toHaveBeenCalled();
  });

  it('should test delete for deleting contact details', () => {
    spyOn(component, 'delete').and.callThrough();
    component.delete(1)
    expect(component.delete).toHaveBeenCalled();
  });

  it('should test fetchData to get contacts from api', () => {
    spyOn(component, 'fetchData').and.callThrough();
    component.fetchData()
    expect(component.fetchData).toHaveBeenCalled();
  });

  it('should test recentContacts to list recent contacts', () => {
    spyOn(component, 'recentContacts').and.callThrough();
    component.recentContacts()
    expect(component.recentContacts).toHaveBeenCalled();
  });

  it('should test searchContactsDetail to search contact names', () => {
    spyOn(component, 'searchContactsDetail').and.callThrough();
    component.searchContactsDetail()
    expect(component.searchContactsDetail).toHaveBeenCalled();
  });

  it('should test filteredContacts to filter contact groups', () => {
    spyOn(component, 'filteredContacts').and.callThrough();
    component.filteredContacts()
    expect(component.filteredContacts).toHaveBeenCalled();
  });

  it('should test bulkDeletion to delete contacts in bulk', () => {
    spyOn(component, 'bulkDeletion').and.callThrough();
    component.bulkDeletion()
    expect(component.bulkDeletion).toHaveBeenCalled();
  });

  it('should test favorites to list favorite contacts', () => {
    spyOn(component, 'favorites').and.callThrough();
    component.favorites()
    expect(component.favorites).toHaveBeenCalled();
  });
});
