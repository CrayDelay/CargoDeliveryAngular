import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarLargeComponent } from '../components/layouts/admin-layout-sidebar-large/sidebar-large/sidebar-large.component';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SidebarLargeComponent,
    CommonModule,
    PerfectScrollbarModule,

  ],
  exports:[
    CommonModule,
    SidebarLargeComponent,

  ]
})
export class SharedModule { }
