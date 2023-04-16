import { Component } from '@angular/core';
import {AppService} from "../../service-app.service";
import {Observable} from "rxjs";
import {InscriptionForPost} from "../InscriptionForPost";
import {ToastrService} from "ngx-toastr";
import {ActivatedRoute} from "@angular/router";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-form-edit-inscriptions',
  templateUrl: './form-edit-inscriptions.component.html',
  styleUrls: ['./form-edit-inscriptions.component.css']
})
export class FormEditInscriptionsComponent {
  inspectionList$!:Observable<any[]>;
  inspectionList: any[]=[];
  public IncriptionId: number;
  public inscription: InscriptionForPost;
  constructor(public service:AppService,
              private toastr: ToastrService,
              private route: ActivatedRoute) {}
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.IncriptionId = params['id'];
      this.getInscription(this.IncriptionId);
    });
    this.inspectionList$ = this.service.getInspectionList();
    this.inspectionList$.subscribe((inspectionList) => {
      this.inspectionList = inspectionList;
    });
  }
  getInscription(id: number): void {
    this.service.getInscriptionForId(id).subscribe(
      res => {
        this.inscription = res;
        this.service.formDataInscriptionPost.StudentId = res.studentId;
        this.service.formDataInscriptionPost.SubjectName = res.subjectName;
        console.log("DFJEJF" +res.toString());
        this.toastr.success("Inscripcion cargada", "Inscripciones UPTC");
      },
      err => {
        this.toastr.error(err);
        console.log(err);
      }
    );
  }
  editIsncription(form: NgForm) {
    this.service.updateInspection(this.IncriptionId).subscribe(
      res => {
        this.toastr.success('Inscripcion modificada con exito', 'Inscripciones UPTC');
        this.resetForm(form);
      },
      err => {
        this.toastr.error(err);
        console.log(err);
      }
    );
  }

  resetForm(form: NgForm) {
    form.form.reset();
    this.service.formDataInscriptionPost = new InscriptionForPost();
  }
}
