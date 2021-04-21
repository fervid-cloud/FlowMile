import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth-service/auth.service';
import { LocalUser } from '../model/LocalUser';

@Component({
  selector: 'setting-options',
  templateUrl: './setting-options.component.html',
  styleUrls: ['./setting-options.component.css']
})
export class SettingOptionsComponent implements OnInit {

  @Input() localUserInfo: LocalUser = new LocalUser();

  constructor() { }

  ngOnInit(): void {
  }



}
