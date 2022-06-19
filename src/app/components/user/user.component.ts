import { UserClaimComponent } from './../user-claim/user-claim.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { User } from './../../models/entities/user';
import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import {
  faCircle,
  faClipboardCheck,
  faClipboardList,
  faCog,
  faDotCircle,
  faRedoAlt,
} from '@fortawesome/free-solid-svg-icons';
declare var bootstrap: any;

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {
  users: User[] = [];
  faCog = faCog;
  faClipboardCheck = faClipboardCheck;
  faRedoAlt = faRedoAlt;
  faDotCircle = faCircle;
  dataLoaded = false;

  private tooltipList = new Array<any>();

  constructor(
    private userService: UserService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.getAllUsers();
  }

  openEditUserModal(user: User) {
    let modalReference = this.modalService.open(UserClaimComponent, {
      size: 'xl',
    });
    modalReference.componentInstance.user = user;
  }

  openEditClaimsModal(user: User) {
    let modalReference = this.modalService.open(UserClaimComponent, {
      size: 'xl',
    });
    modalReference.componentInstance.user = user;
  }

  getAllUsers() {
    this.dataLoaded = false;
    this.userService.getAll().subscribe((response) => {
      this.users = response.data;
      this.dataLoaded = true;
    });
  }
}
