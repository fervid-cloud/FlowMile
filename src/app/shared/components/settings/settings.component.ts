import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../auth/auth-service/auth.service';
import { LocalUser } from '../../model/LocalUser';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  localUserInfo: LocalUser = new LocalUser();

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.updateLocalUserInfo();
  }

  private updateLocalUserInfo(): void {
    this.localUserInfo = this.authService.getLocalUserInfo();
  }

}
