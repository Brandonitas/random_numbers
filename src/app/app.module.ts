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

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    MiddleSquareComponent
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
    MatSlideToggleModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
