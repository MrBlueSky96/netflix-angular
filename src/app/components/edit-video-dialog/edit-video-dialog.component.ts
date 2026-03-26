import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-edit-video-dialog',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatDialogModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './edit-video-dialog.component.html'
})
export class EditVideoDialogComponent {

  form: FormGroup;
  tipo: 'pelicula' | 'serie';

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder
  ) {
    this.tipo = data.tipo;

    // Inicializamos el formulario
    this.form = this.fb.group({
      id: [data.video.id],
      titulo: [data.video.titulo, Validators.required],
      descripcion: [data.video.descripcion, Validators.required],
      anio: [data.video.anio, [Validators.required, Validators.min(1900)]],
      duracion: [data.video.duracion],
      numeroTemporadas: [data.video.numeroTemporadas]
    });

    // Validaciones dinámicas según tipo
    if (this.tipo === 'pelicula') {
      this.form.get('duracion')?.setValidators([Validators.required, Validators.min(1)]);
    }

    if (this.tipo === 'serie') {
      this.form.get('numeroTemporadas')?.setValidators([Validators.required, Validators.min(1)]);
    }

    // Actualizamos validaciones
    this.form.get('duracion')?.updateValueAndValidity();
    this.form.get('numeroTemporadas')?.updateValueAndValidity();
  }

}