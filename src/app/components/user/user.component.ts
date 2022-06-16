import { UserClaimComponent } from './../user-claim/user-claim.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { User } from './../../models/entities/user';
import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { faCog } from '@fortawesome/free-solid-svg-icons';
declare var bootstrap: any;

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {
  users: User[] = [];
  faCog = faCog;
  private tooltipList = new Array<any>();

  constructor(
    private userService: UserService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.getAllUsers();
    this.tooltipInitializition();
  }

  tooltipInitializition() {
    const tooltipTriggerList = [].slice.call(
      document.querySelectorAll('[data-bs-toggle="tooltip"]')
    );
    const tooltipListNewTooltips = tooltipTriggerList.map(
      (tooltipTriggerEl) => {
        return new bootstrap.Tooltip(tooltipTriggerEl);
      }
    );
    this.tooltipList.push(...tooltipListNewTooltips);
  }

  openEditUserModal(user: User) {
    let modalReference = this.modalService.open(UserClaimComponent, {
      size: 'xl',
    });
    modalReference.componentInstance.user = user;
  }

  getAllUsers() {
    this.userService.getAll().subscribe((response) => {
      this.users = response.data;
    });
  }
}
