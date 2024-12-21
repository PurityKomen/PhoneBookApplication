import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ContactService } from '../contact.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

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
  ) {}

  contactId!: any;
  contactList!: any;
  editContactsForm!: FormGroup

  editContacts(){
    const body = {
      id:this.contactId,
      phone: this.editContactsForm?.value.phone,
      email: this.editContactsForm?.value.email,
      name: this.editContactsForm?.value.name,
      physicaladdress: this.editContactsForm?.value.physicaladdress,
      contactimage: this.editContactsForm?.value.contactimage,
    };

    console.log('body',body)
    this.contactService.updateContact(body).subscribe(data => {
      return data
    })
  }

  ngOnInit() {

    this.route.paramMap.subscribe(params => {
      this.contactId = params.get('id'); 
    });

    this.contactService.getContactById(this.contactId).subscribe(data => {
      this.contactList = data 
      console.log(data)
    }) 

    this.editContactsForm = this.fb.group(
      {
          name: [this.contactList?.name, Validators.required],
          email: [ this.contactList?.email,[Validators.required, Validators.email], ],
          phone: [ this.contactList?.phone, [Validators.required, Validators.minLength(10)],],
          physicaladdress: [this.contactList?.physicaladdress,[Validators.required]],
          contactimage: [this.contactList?.contactimage,[Validators.required],
        ],
      },
  );
  
  }

}
