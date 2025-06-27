import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FluidModule } from 'primeng/fluid';
import { ButtonModule } from 'primeng/button';
import { SelectModule } from 'primeng/select';
import { TextareaModule } from 'primeng/textarea';
import { ButtonGroupModule } from 'primeng/buttongroup';
import { SplitButtonModule } from 'primeng/splitbutton';
import { InputIcon } from 'primeng/inputicon';
import { IconField } from 'primeng/iconfield';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MessageModule } from 'primeng/message';
import { InputOtpModule } from 'primeng/inputotp';
import { InputOtp } from 'primeng/inputotp';

import { TableModule } from 'primeng/table';

import { RippleModule } from 'primeng/ripple';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { RatingModule } from 'primeng/rating';

import { RadioButtonModule } from 'primeng/radiobutton';
import { InputNumberModule } from 'primeng/inputnumber';
import { DialogModule } from 'primeng/dialog';
import { TagModule } from 'primeng/tag';
import { InputIconModule } from 'primeng/inputicon';
import { IconFieldModule } from 'primeng/iconfield';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { MultiSelectModule } from 'primeng/multiselect';
import { SliderModule } from 'primeng/slider';
import { ProgressBarModule } from 'primeng/progressbar';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { DropdownModule } from 'primeng/dropdown';
import { FileUploadModule } from 'primeng/fileupload';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { MenuModule } from 'primeng/menu';
import { TieredMenuModule } from 'primeng/tieredmenu';
import { ContextMenuModule } from 'primeng/contextmenu';
import { MegaMenuModule } from 'primeng/megamenu';
import { PanelMenuModule } from 'primeng/panelmenu';
import { MenubarModule } from 'primeng/menubar';
import { TabsModule } from 'primeng/tabs';
import { StepperModule } from 'primeng/stepper';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { MessageService } from 'primeng/api';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    InputTextModule, 
    FluidModule, 
    ButtonModule, 
    SelectModule, 
    FormsModule, 
    TextareaModule,
    ButtonGroupModule, 
    SplitButtonModule,
    InputIcon, 
    IconField,
    ReactiveFormsModule,
    MessageModule,
    InputOtpModule,
    InputOtp,
    CommonModule,
    TableModule,
    RippleModule,
    ToastModule,
    ToolbarModule,
    RatingModule,
    RadioButtonModule,
    InputNumberModule,
    DialogModule,
    TagModule,
    InputIconModule,
    IconFieldModule,
    ConfirmDialogModule,
    TableModule,
    MultiSelectModule,
    SliderModule,
    ProgressBarModule,
    ToggleButtonModule,
    DropdownModule,
    FileUploadModule,
    BreadcrumbModule,
    TieredMenuModule,
    MenuModule,
    ContextMenuModule,
    MegaMenuModule,
    PanelMenuModule,
    TabsModule,
    MenubarModule,
    TabsModule,
    StepperModule,
    TabsModule,
    OverlayPanelModule
  ],
  exports:[
    CommonModule,
    InputTextModule, 
    FluidModule, 
    ButtonModule, 
    SelectModule, 
    FormsModule, 
    TextareaModule,
    ButtonModule, 
    ButtonGroupModule, 
    SplitButtonModule,
    InputIcon, 
    IconField,
    ReactiveFormsModule,
    MessageModule,
    InputOtpModule,
    InputOtp,
    TableModule,
    RippleModule,
    ToastModule,
    ToolbarModule,
    RatingModule,
    RadioButtonModule,
    InputNumberModule,
    DialogModule,
    TagModule,
    InputIconModule,
    IconFieldModule,
    ConfirmDialogModule,
    TableModule,
    MultiSelectModule,
    SliderModule,
    ProgressBarModule,
    ToggleButtonModule,
    DropdownModule,
    FileUploadModule,
    BreadcrumbModule,
    TieredMenuModule,
    MenuModule,
    ContextMenuModule,
    MegaMenuModule,
    PanelMenuModule,
    TabsModule,
    MenubarModule,
    TabsModule,
    StepperModule,
    TabsModule,
    OverlayPanelModule
  ],
  providers:[MessageService]
})
export class PrimengModule { }
