import { createActionGroup, props } from '@ngrx/store';
import { RegisterRequestInterface } from '../types/registerRequest.interface';
import { CurrentUserInterface } from '../../shared/types/currentUser.interface';
import { BackendErrorsInterface } from '../types/backendErrors.interface';

// export const register = createAction('[Auth] Register', props<{request: RegisterRequestInterface}>())
// Esto que ponemos aquí, es como crear tres acciones como las de arriba, pero lo hemos hecho en grupo
export const authActions = createActionGroup({
    source: 'auth',
    events: {
        Register: props<{request: RegisterRequestInterface}>(),
        'Register Success': props<{currentUser: CurrentUserInterface}>(),
        'Register failure': props<{errors: BackendErrorsInterface}>()
    }
})