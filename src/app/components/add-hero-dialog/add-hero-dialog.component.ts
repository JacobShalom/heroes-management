import { Component, Inject, OnInit, ViewEncapsulation} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
import { Hero } from 'src/model/hero';
import { Ability } from 'src/model/ability';
//import * as moment from 'moment';


@Component({
  selector: 'app-add-hero-dialog',
  templateUrl: './add-hero-dialog.component.html',
  styleUrls: ['./add-hero-dialog.component.css']
})
export class AddHeroDialogComponent implements OnInit {



  form!: FormGroup;
  description:string;
  fc_heroName:string;
  fc_power:number;
  fc_abilityId:number;
  abilities: Ability[] = [];


  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AddHeroDialogComponent>,
    @Inject(MAT_DIALOG_DATA)  data : {hero : Hero ,abilities :Ability[]}) {
        this.description = 'Add a New Hero!';
        this.fc_heroName = data.hero.heroName;
        this.fc_power = data.hero.power;
        this.fc_abilityId = data.hero.abilityId;
        this.abilities = data.abilities
    }
    ngOnInit() {
      this.form = this.fb.group({
        fc_heroName: this.fc_heroName,
        fc_power: this.fc_power,
        fc_abilityId : this.fc_abilityId
      });
    }
    save() {
      this.dialogRef.close(this.form.value);
    }

    close() {
      this.dialogRef.close();
    }






  /* constructor(private dialog: MatDialog) {} */


/*   openDialog() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    dialogConfig.data = {
        id: 1,
        title: 'Angular For Beginners'
    };

    this.dialog.open(AddHeroDialogComponent, dialogConfig);
    
    const dialogRef = this.dialog.open(AddHeroDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
        data => console.log("Dialog output:", data)
    );    
}

 */
}
