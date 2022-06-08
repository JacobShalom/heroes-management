import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA} from "@angular/material/dialog";
import { Ability } from 'src/model/ability';
import { Hero } from 'src/model/hero';


@Component({
  selector: 'app-edit-hero-dialog',
  templateUrl: './edit-hero-dialog.component.html',
  styleUrls: ['./edit-hero-dialog.component.css']
})
export class EditHeroDialogComponent implements OnInit {




  form!: FormGroup;
  description:string;
  fc_heroName:string;
  fc_power:number;
  fc_abilityId:number;
  abilities: Ability[] = [];


  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<EditHeroDialogComponent>,
    @Inject(MAT_DIALOG_DATA)  data : {hero : Hero ,abilities :Ability[]}) {
        this.description = 'Edit Hero ' + data.hero.heroName ; 
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

    this.dialog.open(EditHeroDialogComponent, dialogConfig);
    
    const dialogRef = this.dialog.open(EditHeroDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
        data => console.log("Dialog output:", data)
    );    
}*/
}
