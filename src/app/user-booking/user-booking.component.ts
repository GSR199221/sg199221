import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../json-example/shared/api.service';

@Component({
  selector: 'app-user-booking',
  templateUrl: './user-booking.component.html',
  styleUrls: ['./user-booking.component.scss']
})
export class UserBookingComponent implements OnInit {
  listItems = [
    {
      from: 'Hyderabad',
      to: 'Delhi',
      flightNo: '12345',
      flightId: 1
    },
    {
      from: 'Hyderabad',
      to: 'Delhi',
      flightNo: '12345',
      date: new Date(),
      flightId: 1
    },
    {
      from: 'Hyderabad',
      to: 'Delhi',
      flightNo: '12345',
      date: new Date(),
      flightId: 2
    }, {
      from: 'Hyderabad',
      to: 'Delhi',
      flightNo: '12345',
      date: new Date(),
      flightId: 5
    }, {
      from: 'Hyderabad',
      to: 'Delhi',
      flightNo: '12345',
      date: new Date(),
      flightId: 3
    }, {
      from: 'Hyderabad',
      to: 'Delhi',
      flightNo: '12345',
      date: new Date(),
      flightId: 3
    }, {
      from: 'Hyderabad',
      to: 'Delhi',
      flightNo: '12345',
      date: new Date(),
      flightId: 2
    }, {
      from: 'Hyderabad',
      to: 'Delhi',
      flightNo: '12345',
      date: new Date(),
      flightId: 5
    }, {
      from: 'Hyderabad',
      to: 'Delhi',
      flightNo: '12345',
      date: new Date(),
      flightId: 5
    }, {
      from: 'Hyderabad',
      to: 'Delhi',
      flightNo: '12345',
      date: new Date(),
      flightId: 2
    }, {
      from: 'Hyderabad',
      to: 'Delhi',
      flightNo: '12345',
      date: new Date(),
      flightId: 3
    }
  ]
  isActive: any
  flightList: any[] = []
  form: FormGroup;
  selectedFlight: any = {}
  userform: FormGroup;
  bookedFlghtsList: any[] = []
  @ViewChild('one') one: ElementRef<HTMLElement>;
  @ViewChild('two') two: ElementRef<HTMLElement>;
  @ViewChild('three') three: ElementRef<HTMLElement>;
  flightBookHistory: any;


  constructor(private fb: FormBuilder,
    private _api: ApiService, private _router: Router) { }

  ngOnInit(): void {
    this.inItForm();
    this.userInit()
  }

  clickone() {
    let el: HTMLElement = this.one.nativeElement;
    el.click();
  }
  clicktwo() {
    let el: HTMLElement = this.two.nativeElement;
    el.click();
    this._api.getBookings().subscribe(res => {
      this.bookedFlghtsList = res
    })
  }
  clickthree() {
    let el: HTMLElement = this.three.nativeElement;
    el.click();
  }
  inItForm() {
    this.form = this.fb.group({
      from: [''],
      to: [''],
      date: [''],
      returnDate: [''],

    })
  }
  userInit() {
    this.userform = this.fb.group({
      useremail: [''],
      userphone: [''],
      travellerCount: ['']
    })

  }
  search() {
    this._api.getFlights().subscribe(res => {
      this.flightList = res.filter(ele => {
        return ele.flightId.toString() == this.form.value.from
      })
    })
  }
  onSelectFlight(i, row) {
    this.isActive = i
    this.selectedFlight = row
  }

  countinueBooking() {
    const paylod = {
      ...this.selectedFlight,
      ... this.userform.value,
      pending: true
    }
    this._api.postBookFlight(paylod).subscribe(res => {
    })
    this.clicktwo()
  }

  bookingHstory(row) {
    this.clickthree()
    this.flightBookHistory=row
  }

  cancelFlight(row){
    this._api.deleteBookings(row.id).subscribe(res => {
      this._api.getBookings().subscribe(res => {
        this.bookedFlghtsList = res
      })
    })
  }
}
