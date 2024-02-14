import { Component } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { CurriculumService } from "../services/curriculum.service";

@Component({
  selector: "ngx-curriculum-form",
  templateUrl: "./curriculum-form.component.html",
  styleUrls: ["./curriculum-form.component.scss"],
})
export class CurriculumFormComponent {
  public curriculumForm = new FormGroup({
    name: new FormControl("", [Validators.required]),
    description: new FormControl(""),
  });

  constructor(private curriculumService: CurriculumService) {}

  onSubmit() {
    this.curriculumService
      .createCurriculum(this.curriculumForm.value)
      .subscribe();
  }
}
