import { CanDeactivateFn } from '@angular/router';
import { FormGroup, FormGroupDirective, NgForm } from '@angular/forms';

export const canguardFormGuard: CanDeactivateFn<unknown> = (
  component :  any,
  currentRoute,
  currentState,
  nextState
) => {
  let hasChanges = false;

  // Detectar formularios template-driven (NgForm)
  const ngForms: NgForm[] = Object.values(component).filter(
    (c) => c instanceof NgForm
  ) as NgForm[];

  // Detectar formularios reactivos (FormGroupDirective)
  const reactiveForms: FormGroupDirective[] = Object.values(component).filter(
    (c) => c instanceof FormGroupDirective
  ) as FormGroupDirective[];

  // Revisar si algún NgForm está sucio
  if (ngForms.some(f => f.dirty)) {
    hasChanges = true;
  }

  // Revisar si algún FormGroupDirective está sucio
  if (reactiveForms.some(f => f.dirty)) {
    hasChanges = true;
  }

  // Si hay cambios, preguntar al usuario
  if (hasChanges) {
    return confirm('Tienes cambios sin guardar. ¿Seguro que quieres salir?');
  }

  return true; // Permitir navegación si no hay cambios
};
