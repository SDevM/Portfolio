import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ScreensaverComponent } from './components/screensaver/screensaver.component';
import { SummaryComponent } from './components/summary/summary.component';
import { ConfigComponent } from './components/config/config.component';

@NgModule({
  declarations: [
    AppComponent,
    ScreensaverComponent,
    SummaryComponent,
    ConfigComponent,
  ],
  imports: [BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
