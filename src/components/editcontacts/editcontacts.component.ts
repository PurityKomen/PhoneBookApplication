import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ContactService } from '../contact.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-editcontacts',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
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
      phone: this.editContactsForm.value.date,
      email: this.editContactsForm.value.date,
      name: this.editContactsForm.value.description,
      address: this.editContactsForm.value.category,
      image: this.editContactsForm.value.amount,
    };

    this.contactService.updateContact(body).subscribe(data => {
      this.contactList = data
      console.log("edit",this.contactList)
    }) 
  }

  ngOnInit() {
    this.editContacts()
    
    this.route.paramMap.subscribe(params => {
      this.contactId = params.get('id'); 
    });

    this.editContactsForm = this.fb.group(
      {
          name: ['', Validators.required],
          email: [ '',[Validators.required, Validators.email], ],
          phone: [ '', [Validators.required, Validators.minLength(10)],],
          address: ['',[Validators.required]],
          image: ['',[Validators.required],
        ],
      },
  );
  
  }

}
