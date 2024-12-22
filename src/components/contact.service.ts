import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Contact } from './contact';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(private http: HttpClient) { }

  baseUrl: string = 'https://contacts-api-062q.onrender.com/contacts'

  // get all contact
  getContacts() {
    return this.http.get<Contact[]>(this.baseUrl)
  }

  // get contact by id
  getContactById(id: number) {
    return this.http.get<Contact[]>(this.baseUrl + '/' + id)
  }

  // modify contact
  updateContact(contact: Contact) {
    return this.http.put(this.baseUrl + '/' + contact.id, contact)
  }

  // delete contact
  deleteContact(id: number) {
    return this.http.delete(this.baseUrl + '/' + id)
  }

  // Perform a search
  searchContact(searchCriteria: { name?: string, email?: string, phone?: string, group?: string }) {
    const params = new HttpParams({ fromObject: searchCriteria });
    return this.http.get(this.baseUrl, { params })
  }
}