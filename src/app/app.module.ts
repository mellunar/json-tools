import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ToastModule } from './modules/toast/toast.module';
import { NavigationComponent } from './modules/navigation/navigation.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, ToastModule, NavigationComponent],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
