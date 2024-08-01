import { Actions, createEffect, ofType } from '@ngrx/effects'
import { AuthService } from '../services/auth.service'
import { inject } from '@angular/core'
import { authActions } from './actions'
import { catchError, map, of, switchMap } from 'rxjs'
import { CurrentUserInterface } from '../../shared/types/currentUser.interface'
import { HttpErrorResponse } from '@angular/common/http'
import { PersistanceService } from '../../shared/services/persistance.service'

export const registerEffect = createEffect(
    // Esto sería el primer parámetro del createEffect, que es una función
    (actions$ = inject(Actions), authService = inject(AuthService), persistanceService = inject(PersistanceService)) => {
        // Esto lo que hace es estar a la escucha de las actions (Todas ellas).
        return actions$.pipe(
            // Aquí le decimos que este effect solo escuche a las actions de tipo register
            ofType(authActions.register),
            switchMap(({request}) => {
                // Y cuando se ejecute el action de register, le decimos que haga la siguiente llamada http
                return authService.register(request).pipe(
                    // En caso de que funcione, ejecutamos la acción registerSuccess
                    map((currentUser: CurrentUserInterface) => {
                        persistanceService.set('accessToken', currentUser.token);
                        return authActions.registerSuccess({currentUser})
                    }),
                    // En caso de que falle, ejecutamos la acción registerFailure
                    catchError((errorResponse: HttpErrorResponse) => {
                        return of(authActions.registerFailure({
                            errors: errorResponse.error.errors
                        }))
                    })
                )
            })
        )
    },
    // Este es el segundo parámetro, que es un objeto
    {functional: true}
)
