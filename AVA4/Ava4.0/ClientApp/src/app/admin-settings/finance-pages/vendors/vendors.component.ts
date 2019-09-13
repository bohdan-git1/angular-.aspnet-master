import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-vendors',
  templateUrl: './vendors.component.html',
  styleUrls: ['./vendors.component.css']
})
export class VendorsComponent implements OnInit {

  rotateOnY = 0;
  showDropdown = false;

  vendorArr: any[] = [
    {
      'vendorname': 'ClearCorrect', 'phone': '(888) 555-5555', 'code': 'CLEAR LAB', 'ext': '400', 'add1': '1904 grand ave San Diego, CA 92109', 'addr2': 'Suite 143', 'city': 'Orem', 'state': 'UT', 'zipcode': '84058', 'phoneNo': '(858) 490-2840', 'phExt': '986', 'rep': 'Samuel Adams', 'repphone': '(902) 898-5555', 'email': 'sam@dentech.com', 'website': 'www.dentech.com', 'login': 'admin@stonehaven.com', 'password': 'Teeth54322', 'note': 'Call in the AM only. Ask for Amanda. bla bla bla bla bla bla bla bla bla bla'
    },
    {
      'vendorname': 'DENTSPLY Sirona', 'phone': '(555) 555-5555', 'code': 'DENTSPLY', 'ext': '400', 'add1': '1904 grand ave San Diego, CA 92109', 'addr2': 'Suite 143', 'rep': 'Amanda Jones', 'repphone': '(902) 898-5555', 'email': 'ajones@dentsplysirona.com', 'website': 'dentsplysirona.com', 'login': 'stonehavenortho', 'password': 'Teeth54322', 'note': 'Call in the AM only. Ask for Amanda. bla bla bla bla bla bla bla bla bla bla'
    },
    {
      'vendorname': 'Ormco', 'phone': '(111) 555-5555', 'code': 'ORMCO', 'ext': '400', 'add1': '1904 grand ave San Diego, CA 92109', 'addr2': 'Suite 143', 'rep': 'Amanda Jones', 'repphone': '(902) 898-5555', 'email': 'ajones@ormco.com', 'website': 'ormco.com', 'login': 'stonehavenortho', 'password': 'Teeth54322', 'note': 'Call in the AM only. Ask for Amanda. bla bla bla bla bla bla bla bla bla bla'
    },
    {
      'vendorname': 'Align Technology', 'phone': '(800) 555-5555', 'code': 'aligntechnology', 'ext': '400', 'add1': '1904 grand ave San Diego, CA 92109', 'addr2': 'Suite 143', 'rep': 'Amanda Jones', 'repphone': '(902) 898-5555', 'email': 'ajones@aligntechnology.com', 'website': 'aligntechnology.com', 'login': 'stonehavenortho', 'password': 'Teeth54322', 'note': 'Call in the AM only. Ask for Amanda. bla bla bla bla bla bla bla bla bla bla'
    },
  ];

  constructor() { }

  ngOnInit() {
    this.initalizeVendor();
  }

  initalizeVendor() {
    this.vendorArr.map(item => {
      item.selected = false;
    });
  }

  flipCard() {
    this.rotateOnY -= 180;
  }

  selectDropdown(indx) {
    this.vendorArr.map((item, i) => {
      if (i == indx) {
        if (item.selected == true) {
          item.selected = false;
        } else {
          item.selected = true;
        }
      } else {
        item.selected = false;
      }


    });
  }


}
