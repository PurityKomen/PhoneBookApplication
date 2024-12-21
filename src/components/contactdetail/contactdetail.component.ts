import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ContactService } from '../contact.service';

@Component({
  selector: 'app-contactdetail',
  standalone: true,
  imports: [],
  providers: [ContactService],
  templateUrl: './contactdetail.component.html',
  styleUrl: './contactdetail.component.css'
})
export class ContactdetailComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private contactService:ContactService,
  ) {}

  contactId!: any;
  contactList!: any;


  ngOnInit() {
    //get contact id from the route
    this.route.paramMap.subscribe(params => {
      this.contactId = params.get('id'); 
    });

    //fetch contact detail from the id 
    this.contactService.getContactById(this.contactId).subscribe(data => {
      this.contactList = data
    }) 
  }
}
