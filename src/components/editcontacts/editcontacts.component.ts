import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ContactService } from '../contact.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgToastService } from 'ng-angular-popup';
import { Router } from '@angular/router'; 

@Component({
  selector: 'app-editcontacts',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule,CommonModule],
  templateUrl: './editcontacts.component.html',
  styleUrl: './editcontacts.component.css'
})
export class EditcontactsComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private contactService:ContactService,
    public fb: FormBuilder,
    public toast:NgToastService,
    private router: Router
  ) {}

  contactId!: any;
  contactList!: any;
  editContactsForm!: FormGroup

  //get edit data from the form 
  editContacts(){
    const body = {
      id:this.contactId,
      phone: this.editContactsForm?.value.phone,
      email: this.editContactsForm?.value.email,
      name: this.editContactsForm?.value.name,
      physicaladdress: this.editContactsForm?.value.physicaladdress,
      contactimage: this.editContactsForm?.value.contactimage,
      group: this.editContactsForm?.value.group,
    };

    //Update data with the data from the form
    this.contactService.updateContact(body).subscribe(data => {
      this.toast.success('Success Message','Edit Contact Successful',3000)
      setTimeout(() => {
        this.router.navigate(['/contacts']);
    }, 3050);
    },
    error => (
      this.toast.success('Error Message','Edit Contact not Successful',3000)
    )
  )
  }

  ngOnInit() {

    //Get contact id from the route 
    this.route.paramMap.subscribe(params => {
      this.contactId = params.get('id'); 
    });

    //fetch contact details from the id
    this.contactService.getContactById(this.contactId).subscribe(data => {
      this.contactList = data 
    }) 

    //Validate data from the form and autofill
    this.editContactsForm = this.fb.group(
      {
          name: ['', Validators.required],
          email: [ '',[Validators.required, Validators.email], ],
          phone: [ '', [Validators.required, Validators.minLength(10)],],
          physicaladdress: ['',[Validators.required]],
          contactimage: ['',[Validators.required]],
          group: ['',[Validators.required]],
      },
  );
  
  }

}
