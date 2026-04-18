import { UserClaimComponent } from './../user-claim/user-claim.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { User } from './../../models/entities/user';
import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { CheckinFirebaseService } from 'src/app/services/checkin-firebase.service';
import {
  faCircle,
  faClipboardCheck,
  faClipboardList,
  faCog,
  faDotCircle,
  faRedoAlt,
} from '@fortawesome/free-solid-svg-icons';
import { allTranslates } from 'src/app/services/translation.service';
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
  userPointsMap: Record<string, any> = {};

  private tooltipList = new Array<any>();

  constructor(
    private userService: UserService,
    private modalService: NgbModal,
    private checkinService: CheckinFirebaseService
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
    this.userService.getAll().subscribe(async (response) => {
      this.users = response.data;
      
      // Fetch points
      try {
          this.userPointsMap = await this.checkinService.getAllUsersData();
      } catch (e) {
          console.error("Firebase puanlari alinamadi:", e);
      }

      this.dataLoaded = true;
    });
  }

  getTranslate(key: string) {
    return allTranslates.get(key);
  }
}
