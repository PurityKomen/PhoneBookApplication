import { Component, OnInit } from '@angular/core';
import { ContactService } from '../contact.service';
import { Contact } from '../contact';
import { Router } from '@angular/router'; 
import Swal from 'sweetalert2';

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
    private router: Router,
  ) {}
  contactList!: Contact[];

  //When a user clicks on a contact,navigate to the contact details page with contact is
  toggle(contactId: number){
    this.router.navigate(['/contacts', contactId]);
  }

  //Edit Contact Details
  edit(contactId: number){
    this.router.navigate(['/edit', contactId]);
  }

  //Delete contact 
  delete(contactId: number){
    Swal.fire({
      title: 'Danger!',
      text: 'Are you sure you want to delete this contact?',
      icon: 'error',
      showCancelButton: true,
      confirmButtonText: 'OK'
    }).then((result) => {
      /* Delete if user selected selected okay on the swal or show contact not deleted */
      if (result.isConfirmed) {
        this.contactService.deleteContact(contactId).subscribe(data => {
          this.fetchData()
        }) 
        Swal.fire("Contact Deleted!", "", "success");
      } else if (result.isDenied) {
        Swal.fire("Contact is not deleted", "", "info");
      }
    });
  }

  //get contact data to display on the table
  fetchData(){
    this.contactService.getContacts().subscribe(data => {
      this.contactList = data.sort((a,b) => a.name > b.name ? 1 : -1)
    }) 
  }

  ngOnInit() {
    this.fetchData()
  }

}
