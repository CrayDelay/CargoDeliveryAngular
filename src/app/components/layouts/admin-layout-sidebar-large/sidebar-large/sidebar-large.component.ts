import { Component, OnInit, HostListener, QueryList, ViewChildren } from '@angular/core';
import { NavigationService,  IMenuItem,  IChildItem} from '../../../../services/navigation.service';
import { Router, NavigationEnd } from '@angular/router';
import { PerfectScrollbarDirective} from 'ngx-perfect-scrollbar';
import { filter } from 'rxjs/operators';
import { Utils } from '../../../../services/utils';
import { SharedModule } from '../../../../shared/shared.module';

@Component({
  selector: 'app-sidebar-large',
  standalone: true,
  imports: [
    SharedModule,
  ],
  templateUrl: './sidebar-large.component.html',
  styleUrl: './sidebar-large.component.css',
})


export class SidebarLargeComponent implements OnInit{


  selectedItem?: IMenuItem;
  nav?: IMenuItem[];
  @ViewChildren(PerfectScrollbarDirective) psContainers:QueryList<PerfectScrollbarDirective> = new QueryList<PerfectScrollbarDirective>();
  psContainerSecSidebar?: PerfectScrollbarDirective;

  constructor(public router: Router, public navService: NavigationService) {
    setTimeout(() => {
      this.psContainerSecSidebar = this.psContainers.toArray()[1];
    });
  }

  ngOnInit() {
    this.updateSidebar();
    // CLOSE SIDENAV ON ROUTE CHANGE
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(routeChange => {
        this.closeChildNav();
        if (Utils.isMobile()) {
          this.navService.sidebarState.sidenavOpen = false;
        }
      });

    this.navService.menuItems$.subscribe(items => {
      this.nav = items;
      this.setActiveFlag();
    });
  }

  selectItem(item: IMenuItem) {
    this.navService.sidebarState.childnavOpen = true;
    this.navService.selectedItem = item;
    this.setActiveMainItem(item);

    // Scroll to top secondary sidebar
    setTimeout(() => {
      if(this.psContainerSecSidebar){
      this.psContainerSecSidebar.update();
      this.psContainerSecSidebar.scrollToTop(0, 400);
      }
    });
  }
  closeChildNav() {
    this.navService.sidebarState.childnavOpen = false;
    this.setActiveFlag();
  }

  onClickChangeActiveFlag(item: IMenuItem) {
    this.setActiveMainItem(item);
  }
  setActiveMainItem(item: IMenuItem) {
    if (this.nav && this.nav.length > 0) {
      this.nav.forEach(i => {
        i.active = false;
      });
      item.active = true;
    }
  }

  setActiveFlag() {
    if (window && window.location) {
      const activeRoute = window.location.hash || window.location.pathname;
      if (this.nav && this.nav.length > 0) {
        this.nav.forEach(item => {
          item.active = false;
          if (item.state && activeRoute.indexOf(item.state) !== -1) {
            this.navService.selectedItem = item;
            item.active = true;
          }
          if (item.sub) {
            item.sub.forEach(subItem => {
              subItem.active = false;
              if (subItem.state && activeRoute.indexOf(subItem.state) !== -1) {
                this.navService.selectedItem = item;
                item.active = true;
              }
              if (subItem.sub) {
                subItem.sub.forEach(subChildItem => {
                  if (subChildItem.state && activeRoute.indexOf(subChildItem.state) !== -1) {
                    this.navService.selectedItem = item;
                    item.active = true;
                    subItem.active = true;
                  }
                });
              }
            });
          }
        });
      }
    }
  }

  updateSidebar() {
    if (Utils.isMobile()) {
      this.navService.sidebarState.sidenavOpen = false;
      this.navService.sidebarState.childnavOpen = false;
    } else {
      this.navService.sidebarState.sidenavOpen = true;
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.updateSidebar();
  }
}
