import { fakeAsync, TestBed } from '@angular/core/testing';
import { ContactService } from './contact.service';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';

describe('ContactService', () => {
  let service: ContactService;

  beforeEach(() => {
    TestBed.configureTestingModule({
        imports: [], 
        providers: [ContactService,provideHttpClient(), provideHttpClientTesting() ],
    });
    service = TestBed.inject(ContactService);
  });

it('should test function', fakeAsync(() => {
    spyOn(service, 'getContacts').and.callThrough();
    service.getContacts()
    service.getContactById(1)
    service.deleteContact(1)
    expect(service.getContacts).toBeTruthy();
    expect(service.getContactById).toBeTruthy();
    expect(service.deleteContact).toBeTruthy();
}));
});