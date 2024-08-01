import {Component} from '@angular/core'
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms'
import { Store } from '@ngrx/store'
import { authActions } from '../store/actions'
import { RegisterRequestInterface } from '../types/registerRequest.interface'
import { RouterLink } from '@angular/router'
import { AsyncPipe } from '@angular/common'
import { selectIsSubmitting, selectValidationErrors } from '../store/reducers'
import { AuthService } from '../services/auth.service'
import { combineLatest } from 'rxjs'
import { BacknedErrorMessages } from "../../shared/components/backendErrorsMessages/backendErrorMessages.component";

@Component({
    selector: 'mc-register',
    templateUrl: './register.component.html',
    standalone: true,
    imports: [ReactiveFormsModule, RouterLink, AsyncPipe, BacknedErrorMessages]
})
export class RegisterComponent {
  form = this.fb.nonNullable.group({
    username: ['', Validators.required],
    email: ['', Validators.required],
    password: ['', Validators.required],
  })
  // Con esto, lo que estamos haciendo es juntar todos los atributos del store a los que queramos suscribirnos en una
  // sola variable
  data$ = combineLatest({
    isSubmitting: this.store.select(selectIsSubmitting),
    backendErrors: this.store.select(selectValidationErrors),
  })

  constructor(
    private fb: FormBuilder, 
    private store: Store
  ) {}

  onSubmit() {
    const request: RegisterRequestInterface = {
        user: this.form.getRawValue()
    }
    // Aquí estamos lanzando la acción que hemos creado en el archivo de actions
    this.store.dispatch(authActions.register({request}));
  }
}
