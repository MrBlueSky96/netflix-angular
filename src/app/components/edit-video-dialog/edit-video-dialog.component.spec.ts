import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditVideoDialogComponent } from './edit-video-dialog.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';

describe('EditVideoDialogComponent', () => {

  let component: EditVideoDialogComponent;
  let fixture: ComponentFixture<EditVideoDialogComponent>;

  let dialogRefSpy: jasmine.SpyObj<MatDialogRef<EditVideoDialogComponent>>;

  const mockData = {
    tipo: 'pelicula',
    video: {
      id: 1,
      titulo: 'Test Movie',
      descripcion: 'Desc',
      anio: 2020,
      imagenUrl: '',
      puntuacion: 3,
      duracion: 120
    }
  };

  beforeEach(async () => {

    dialogRefSpy = jasmine.createSpyObj('MatDialogRef', ['close']);

    await TestBed.configureTestingModule({
      imports: [EditVideoDialogComponent, ReactiveFormsModule],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: mockData },
        { provide: MatDialogRef, useValue: dialogRefSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(EditVideoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // TEST 1: debería crear el formulario correctamente
  it('debería inicializar el formulario con datos', () => {

    expect(component.form).toBeTruthy();
    expect(component.form.get('titulo')?.value).toBe('Test Movie');
    expect(component.tipo).toBe('pelicula');
  });

  // TEST 2: debería validar formulario inválido
  it('debería ser inválido si falta título', () => {

    component.form.get('titulo')?.setValue('');

    expect(component.form.invalid).toBeTrue();
  });

  // TEST 3: debería cerrar dialog con datos al guardar
  it('debería cerrar el dialog con datos válidos', () => {

    component.form.setValue({
      id: 1,
      titulo: 'Nuevo título',
      descripcion: 'Desc',
      anio: 2021,
      imagenUrl: '',
      puntuacion: 4,
      duracion: 100,
      numeroTemporadas: null
    });

    component.guardar();

    expect(dialogRefSpy.close).toHaveBeenCalledWith(component.form.value);
  });

  // TEST 4: no debería cerrar si formulario inválido
  it('no debería cerrar si el formulario es inválido', () => {

    component.form.get('titulo')?.setValue('');

    component.guardar();

    expect(dialogRefSpy.close).not.toHaveBeenCalled();
  });

  // TEST 5: setPuntuacion debería actualizar el valor
  it('debería actualizar puntuación correctamente', () => {

    component.setPuntuacion(5);

    expect(component.form.get('puntuacion')?.value).toBe(5);
  });

});