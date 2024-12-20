import { Routes } from '@angular/router';
import { ContactlistComponent } from '../components/contactlist/contactlist.component';
import { ContactdetailComponent } from '../components/contactdetail/contactdetail.component';
import { EditcontactsComponent } from '../components/editcontacts/editcontacts.component';

export const routes: Routes = [
    { path: 'contacts', component: ContactlistComponent },
    { path: 'contacts/:id', component: ContactdetailComponent },
    { path: 'edit/:id', component: EditcontactsComponent },
    { path: '**', redirectTo: 'contacts', pathMatch: 'full' },
];


