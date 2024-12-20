import { Component } from '@angular/core';
import { ContactlistComponent } from '../components/contactlist/contactlist.component';
import { RouterModule, RouterOutlet  } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ContactlistComponent, RouterModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
}
