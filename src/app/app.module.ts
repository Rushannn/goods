import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { StoreModule, provideStore } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { AppRoutingModule } from './app-routing.module';
import { GOODS_FEATURE_KEY, goodsFeature } from './features/goods/store/goods.reducer';
import { environment } from 'src/environments/environment';
import * as goodsEffects from './features/goods/store/goods.effects'
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './core/layout/header/header.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HeaderComponent,
    AppRoutingModule,
    HttpClientModule,
    StoreModule.forRoot({
      [GOODS_FEATURE_KEY]: goodsFeature.reducer
    }),
    EffectsModule.forRoot([goodsEffects]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
