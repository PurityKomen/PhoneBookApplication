import { Component, OnInit } from '@angular/core';
import { ContactService } from '../contact.service';
import { Router } from '@angular/router'; 
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Contact } from '../contact';

@Component({
  selector: 'app-contactlist',
  standalone: true,
  imports: [ FormsModule, ReactiveFormsModule ],
  providers: [ContactService],
  templateUrl: './contactlist.component.html',
  styleUrl: './contactlist.component.css'
})
export class ContactlistComponent implements OnInit{
  constructor(
    private contactService:ContactService,
    private router: Router,
    public fb: FormBuilder,
  ) {}

  contactList!: any;
  searchForm!: FormGroup
  filterForm!: FormGroup
  viewMode: 'list' | 'grid' = 'list';
  isDarkMode:boolean = false
  selectedGroup: string = 'All';
  recentlyViewed: any
  recent: any = []

  //When a user clicks on a contact,navigate to the contact details page with contact is
  toggle(contactId: number){
    //add recent contact ids to the array
    this.recentlyViewed.unshift(contactId);

    // Limit the array to a maximum of 5 recent contact ids
    if (this.recentlyViewed.length > 5) {
      this.recentlyViewed.pop()
    }

    // Store the updated array in local storage
    localStorage.setItem('recentlyViewed', JSON.stringify(this.recentlyViewed)); 

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

  //view recent contacts
  recentContacts(){
    this.recentlyViewed.map( (item: number) => {
      this.contactService.getContactById(item).subscribe(data => {
        this.recent.push(data)
        console.log('recent',this.recent)
        this.contactList = this.recent
      }) 
    })
  }

  //Perform a search for either the name,phone nummber or email
  searchContactsDetail(){
    const searchCriteria = {
      name: '',
      email: '',
      phone: ''
    };
    const searchField = this.searchForm?.value.searchField;
    const body = this.searchForm?.value.name

    //Determine if its name,email,or phone
    if (searchField === 'name') {
      searchCriteria.name = body;
    } else if (searchField === 'email') {
      searchCriteria.email = body
    } else if (searchField === 'phone') {
      searchCriteria.phone = body
    }

    //Update data with the data from the form
    this.contactService.searchContact(searchCriteria).subscribe(data => {
      this.contactList = data
      this.searchForm.reset()
    }
  )
  }

  //toggle between list and grid view
  toggleView(){
    this.viewMode = this.viewMode === 'list' ? 'grid' : 'list';
  }

  //toggle between light and dark mode
  toggleDarkMode() {
    this.isDarkMode = !this.isDarkMode;
    document.body.classList.toggle('dark');
  }

  filteredContacts(){
    const body = {
      group: this.filterForm?.value.group
    }
    if (body === undefined) {
      return this.contactList;
    } else {
      this.contactService.searchContact(body).subscribe(data => {
        this.contactList = data
        this.filterForm?.reset()
      })
    }
  }

  ngOnInit() {
    this.filteredContacts()
    
    this.fetchData()

    // Check if there's any data stored in local storage
    const storedData = localStorage.getItem('recentlyViewed');
    if (storedData) {
      this.recentlyViewed = JSON.parse(storedData);
    }


    //Validate data from the form
    this.searchForm = this.fb.group(
      {
          name: [''],
          searchField: ['']
      },
  );

  this.filterForm = this.fb.group(
    {
        group: ['All']
    },
);
  }

}
