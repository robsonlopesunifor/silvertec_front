import { TestBed, inject } from '@angular/core/testing';

import { FormularioService } from './formulario.service';

describe('FormularioService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FormularioService]
    });
  });

  it('should be created', inject([FormularioService], (service: FormularioService) => {
    expect(service).toBeTruthy();
  }));
});
