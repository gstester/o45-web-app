import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { IFlat } from '../../../shared/models/flat.dto';
import { MatSelectChange } from '@angular/material';

@Component({
  selector: 'flat-assignment',
  templateUrl: './flat-assignment.component.html',
  styleUrls: ['./flat-assignment.component.scss']
})
export class FlatAssignmentComponent implements OnInit {
  @Input() tenantId: string;
  @Input() flats: Array<IFlat>;

  @Output() flatChange: EventEmitter<IFlat> = new EventEmitter<IFlat>();

  selectedFlat: IFlat;

  constructor() { }

  ngOnInit() {
    this.selectedFlat = this.flats.find(f => f.tenants.some(t => t.id === this.tenantId));
  }

  selectionChange($event: MatSelectChange) {
    this.flatChange.next($event.value);
  }

  flatCompare(a: IFlat, b: IFlat) {
    if (a && b)
      return a.id === b.id;

      return false;
  }

}
