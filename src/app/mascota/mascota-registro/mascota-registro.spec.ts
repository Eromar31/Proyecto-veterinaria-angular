import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MascotaRegistro } from './mascota-registro';

describe('MascotaRegistro', () => {
  let component: MascotaRegistro;
  let fixture: ComponentFixture<MascotaRegistro>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MascotaRegistro]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MascotaRegistro);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
