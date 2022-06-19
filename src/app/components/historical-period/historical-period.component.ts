import { HistoricalPeriodUpdateComponent } from './../historical-period-update/historical-period-update.component';
import { HistoricalPeriodDeleteComponent } from './../historical-period-delete/historical-period-delete.component';
import { HistPeriod } from './../../models/entities/histPeriod';
import { HistPeriodService } from './../../services/hist-period.service';
import { HistoricalPeriodAddComponent } from './../historical-period-add/historical-period-add.component';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-historical-period',
  templateUrl: './historical-period.component.html',
  styleUrls: ['./historical-period.component.css'],
})
export class HistoricalPeriodComponent implements OnInit {
  faEdit = faEdit;
  faTrash = faTrash;
  histPeriods: HistPeriod[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private modalService: NgbModal,
    private histPeriodService: HistPeriodService
  ) {}

  ngOnInit(): void {
    this.getAll();
  }

  getAll() {
    this.histPeriodService.getAll().subscribe((response) => {
      this.histPeriods = response.data;
    });
  }

  openAddForm() {
    var modalReferance = this.modalService.open(HistoricalPeriodAddComponent, {
      size: 'm',
    });
  }

  openDeleteForm(histPeriod: HistPeriod) {
    var modalReferance = this.modalService.open(
      HistoricalPeriodDeleteComponent,
      {
        size: 'm',
        modalDialogClass: 'modal-dialog-centered',
      }
    );
    modalReferance.componentInstance.histPeriod = histPeriod;
  }

  openUpdateForm(histPeriod: HistPeriod) {
    var modalReferance = this.modalService.open(
      HistoricalPeriodUpdateComponent,
      {
        size: 'm',
        modalDialogClass: 'modal-dialog-centered',
      }
    );
    modalReferance.componentInstance.histPeriod = histPeriod;
  }
}
