import { Routes } from '@angular/router';
import { ContactlistComponent } from '../components/contactlist/contactlist.component';
import { ContactdetailComponent } from '../components/contactdetail/contactdetail.component';

export const routes: Routes = [
    { path: 'contacts', component: ContactlistComponent },
    { path: 'contacts/:id', component: ContactdetailComponent },
    { path: '**', redirectTo: 'contacts', pathMatch: 'full' },
];


