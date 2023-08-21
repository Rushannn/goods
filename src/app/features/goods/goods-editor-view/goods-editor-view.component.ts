import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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

  @Input() productForChange: GoodsEntity | undefined

  @Output() editProduct = new EventEmitter;
  @Output() addProduct = new EventEmitter<NewProduct>;
  @Output() closeEditorForm = new EventEmitter;

  public base64Image: string | null = null;
  public formGroup!: FormGroup
  public submitAttempted = false;

  constructor() {
    this.formGroup = new FormBuilder().group({
      name: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]),
      price: new FormControl('', [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)]),
      quantity: new FormControl(0, [Validators.required, Validators.min(1)]),
      productId: new FormControl(0, [Validators.required, Validators.pattern(/^[a-zA-Z0-9]+$/)])
    });
  }

  ngOnInit(): void {
    if (this.productForChange) {
      this.formGroup.patchValue({
        name: this.productForChange.name,
        price: this.productForChange.price,
        quantity: this.productForChange.quantity,
        productId: this.productForChange.productId
      })
    }
  }

  closeEditorModal() {
    this.closeEditorForm.emit()
  }

  onSubmit() {
    this.submitAttempted = true;
    if (this.productForChange) {
      this.sendEditedProduct()
    } else {
      this.sendNewProduct()
    }
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

  private sendEditedProduct() {
    const product = {
      id: this.productForChange!.id,
      name: this.formGroup.value.name,
      price: this.formGroup.value.price,
      quantity: this.formGroup.value.quantity,
      productId: this.formGroup.value.productId
    }
    this.editProduct.emit(product)
    console.log('ok1', product)
  }

  private sendNewProduct() {
    if (this.base64Image) {
      const newProduct = {
        name: this.formGroup.value.name,
        price: this.formGroup.value.price,
        quantity: this.formGroup.value.quantity,
        productId: this.formGroup.value.productId,
        basae64Image: this.base64Image
      }
      this.addProduct.emit(newProduct)
    }
  }

}

export interface Product {
  name: string,
  price: string,
  quantity: number,
  productId: number
}

export interface NewProduct {
  name: string,
  price: string,
  quantity: number,
  productId: number,
  basae64Image: string
}
