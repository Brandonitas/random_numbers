import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

//Components
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';

//Rutas
import { APP_ROUTING } from './app.routes';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//Style Angular Material
import {MatSidenavModule} from '@angular/material/sidenav';
import { MatAutocompleteModule, MatButtonModule, MatCheckboxModule, MatDatepickerModule, 
  MatFormFieldModule, MatInputModule, MatRadioModule, MatSelectModule, MatSliderModule, 
  MatSlideToggleModule } from '@angular/material';
import { MiddleSquareComponent } from './components/middle-square/middle-square.component';
import { CongruencialComponent } from './components/congruencial/congruencial.component';
import {MatTableModule} from '@angular/material/table';
import {MatDialogModule} from '@angular/material/dialog';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { FormsModule } from '@angular/forms';


//Service
import { RandomService } from './services/random.service';
import { CongruencialMixtoComponent } from './components/congruencial-mixto/congruencial-mixto.component';
import { MultiplicativoComponent } from './components/multiplicativo/multiplicativo.component';
import { CongruencialLinealCombinadoComponent } from './components/congruencial-lineal-combinado/congruencial-lineal-combinado.component';






@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    MiddleSquareComponent,
    CongruencialComponent,
    CongruencialMixtoComponent,
    MultiplicativoComponent,
    CongruencialLinealCombinadoComponent,
  ],
  imports: [
    BrowserModule,
    APP_ROUTING,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatSelectModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatTableModule,
    MatDialogModule,
    MatSnackBarModule,
    FormsModule
  ],
  providers: [RandomService],
  bootstrap: [AppComponent]
})
export class AppModule { }
