import { Component, Input } from "@angular/core";
import { NbDialogRef } from "@nebular/theme";
import { ShowcaseDialogComponent } from "../../pages/modal-overlays/dialog/showcase-dialog/showcase-dialog.component";

@Component({
  selector: "ngx-delete-modal",
  templateUrl: "./delete-modal.component.html",
  styleUrls: ["./delete-modal.component.scss"],
})
export class DeleteModalComponent {
  @Input() onDeleteFunction: any;

  constructor(protected ref: NbDialogRef<ShowcaseDialogComponent>) {}

  dismiss() {
    this.ref.close();
  }

  delete() {
    if (this.onDeleteFunction) {
      this.onDeleteFunction();
      this.ref.close();
    }
  }
}
