import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DeleteModalComponent } from "./delete-modal/delete-modal.component";
import { ModalOverlaysRoutingModule } from "../pages/modal-overlays/modal-overlays-routing.module";
import {
  NbButtonModule,
  NbCardModule,
  NbCheckboxModule,
  NbDialogModule,
  NbInputModule,
  NbPopoverModule,
  NbSelectModule,
  NbTabsetModule,
  NbTooltipModule,
  NbWindowModule,
} from "@nebular/theme";

@NgModule({
  declarations: [DeleteModalComponent],
  imports: [
    CommonModule,
    ModalOverlaysRoutingModule,
    NbDialogModule.forChild(),
    NbWindowModule.forChild(),
    NbCardModule,
    NbCheckboxModule,
    NbTabsetModule,
    NbPopoverModule,
    NbButtonModule,
    NbInputModule,
    NbSelectModule,
    NbTooltipModule,
  ],
  exports: [DeleteModalComponent],
})
export class SharedModule {}
