import { Component } from '@angular/core';
import { ContactlistComponent } from '../components/contactlist/contactlist.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ContactlistComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'phonebook';
}
