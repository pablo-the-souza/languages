import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { Subscription } from 'rxjs/internal/Subscription';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})

export class SidebarComponent implements OnInit, OnDestroy{
  @Output() closeSidenav = new EventEmitter<void>();
  isAuth: boolean; 
  authSubscription: Subscription;


  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authSubscription = this.authService.authChange.subscribe(authStatus => {
      this.isAuth = authStatus;
    })
  }

  onClose() {
    this.closeSidenav.emit()
  }

  onLogout() {
    this.authService.logout();
    this.onClose();
  }

  ngOnDestroy(){
      this.authSubscription.unsubscribe()
  }
}
