import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { GoodsEntity } from '../models/goods-entity';

@Component({
  selector: 'app-goods-editor-view',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './goods-editor-view.component.html',
  styleUrls: ['./goods-editor-view.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GoodsEditorViewComponent implements OnInit {

  @Input() editedProduct: GoodsEntity | undefined

  @Output() saveEditorForm = new EventEmitter;
  @Output() closeEditorForm = new EventEmitter;

  public base64Image: string | null = null;
  public formGroup!: FormGroup

  constructor() {
    this.formGroup = new FormBuilder().group({
      name: new FormControl('', [Validators.required]),
      price: new FormControl('', [Validators.required]),
      quantity: new FormControl('', [Validators.required]),
      productId: new FormControl('', [Validators.required])
    });
  }

  ngOnInit(): void {
    if(this.editedProduct) {
      this.formGroup.patchValue({
        name: this.editedProduct.name,
        price: this.editedProduct.price,
        quantity: this.editedProduct.quantity,
        productId: this.editedProduct.productId
      })
    }
  }

  closeEditorModal() {
    this.closeEditorForm.emit()
  }

  onSaveEditorForm() {
    const product = {
      id: this.editedProduct!.id,
      name: this.formGroup.value.name,
      price: this.formGroup.value.price,
      quantity: this.formGroup.value.quantity,
      productId: this.formGroup.value.productId,
      _image: this.base64Image
    }
    this.saveEditorForm.emit(product)
    console.log('ok1', product)
  }

  onFileSelected(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files && inputElement.files.length > 0) {
      const reader = new FileReader();
      reader.onload = (e) => {

        this.base64Image = e.target?.result as string;
      };
      reader.readAsDataURL(inputElement.files[0]);
    }
  }

}
