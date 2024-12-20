import { Component, OnInit } from '@angular/core';
import { ContactService } from '../contact.service';
import { Contact } from '../contact';
import { Router } from '@angular/router'; 

@Component({
  selector: 'app-contactlist',
  standalone: true,
  imports: [ ],
  providers: [ContactService],
  templateUrl: './contactlist.component.html',
  styleUrl: './contactlist.component.css'
})
export class ContactlistComponent implements OnInit{
  constructor(
    private contactService:ContactService,
    private router: Router
  ) {}
  contactList!: Contact[];

  toggle(contactId: number){
    this.router.navigate(['/contacts', contactId]);
  }

  ngOnInit() {
    this.contactService.getContacts().subscribe(data => {
      this.contactList = data.sort((a,b) => a.name > b.name ? 1 : -1)
    }) 
  }

}
