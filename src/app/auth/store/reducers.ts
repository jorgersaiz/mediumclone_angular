import { createFeature, createReducer, on } from "@ngrx/store";
import { AuthStateInterface } from "../types/authState.interface";
import { authActions } from "./actions";

const initialState: AuthStateInterface = {
    isSubmitting: false,
    isLoading: false,
    currentUser: undefined,
    validationErrors: null
}

const authFeature = createFeature({
    name: 'auth',
    reducer: createReducer(
        // Cada vez que actualizamos el state, hay que pasar el state inicial, crea una copia, no actualiza
        initialState,
        // Aquí le decimos que vamos a usar la register action y luego, lo que queremos actualizar en el state
        on(authActions.register, (state) => ({
            ...state, 
            isSubmitting: true,
            validationErrors: null
        })),
        on(authActions.registerSuccess, (state, action) => ({
            ...state, 
            isSubmitting: false,
            currentUser: action.currentUser
        })),
        on(authActions.registerFailure, (state, action) => ({
            ...state, 
            isSubmitting: false,
            validationErrors: action.errors
        })),
        // on(authActions.registerSuccess, (state) => ({...state, user = }))

    )
})
// Aquí lo único que estoy haciendo es renombrar las propiedades del feature para que tenga nombres únicos
// Desde la exportación del reducer, podemos exportar también el selector, ya sea de todo el estado o de una 
// única propiedad
// Aquí estoy exportando selectores de todas los atributos de esta layer del estado por separado
export const {
    name: authFeatureKey, 
    reducer: authReducer, 
    selectIsSubmitting,
    selectIsLoading,
    selectCurrentUser,
    selectValidationErrors
} = authFeature;