import { CurrentUserInterface } from "../../shared/types/currentUser.interface";
import { BackendErrorsInterface } from "./backendErrors.interface";

export interface AuthStateInterface {
    // Este atributo está para suscribirse y saber si está haciendo algo el store en ese momento. Por ejemplo,
    // mientras se está haciendo una petición, poner un botón a disabled
    isSubmitting: boolean;
    currentUser: CurrentUserInterface | null | undefined;
    isLoading: boolean;
    validationErrors: BackendErrorsInterface | null;
}