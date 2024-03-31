import { Component, OnInit, ViewChild } from '@angular/core';
import { PerfectScrollbarDirective } from 'ngx-perfect-scrollbar';
import { NavigationService } from '../../../services/navigation.service';
import { SearchService } from '../../../services/search.service';
import { ResolveEnd, ResolveStart, RouteConfigLoadEnd, RouteConfigLoadStart, Router } from '@angular/router';

@Component({
  selector: 'app-admin-layout-sidebar-large',
  standalone: true,
  imports: [],
  templateUrl: './admin-layout-sidebar-large.component.html',
  styleUrl: './admin-layout-sidebar-large.component.css'
})
export class AdminLayoutSidebarLargeComponent implements OnInit {
  moduleLoading?: boolean;
  @ViewChild(PerfectScrollbarDirective, { static: true }) perfectScrollbar?: PerfectScrollbarDirective;

  constructor(
    public navService: NavigationService,
    public searchService: SearchService,
    private router: Router
  ) { }

  ngOnInit() {
    this.router.events.subscribe(event => {
      if (event instanceof RouteConfigLoadStart || event instanceof ResolveStart) {
        this.moduleLoading = true;
      }
      if (event instanceof RouteConfigLoadEnd || event instanceof ResolveEnd) {
        this.moduleLoading = false;
      }
    });
  }

}
