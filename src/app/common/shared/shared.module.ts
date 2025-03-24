import { NgModule } from '@angular/core';
import { Ng2FlatpickrCustomDirective } from '../ui/ui/directives/ng2-flatpickr-custom.directive';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    Ng2FlatpickrCustomDirective,
  ],
  imports: [
    ReactiveFormsModule,
  ],
  exports: [
    Ng2FlatpickrCustomDirective,
    ReactiveFormsModule
  ]
})
export class SharedModule { }