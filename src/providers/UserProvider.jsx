import { useDispatch } from "react-redux";
import { setLoading, setSession } from "../store/slices/sessionSlice";
import { supabase } from "../../config/supabaseClient";
import { useEffect } from "react";
import { fetchSession } from "../utils/authHelpers";

const UserProvider = ({ children }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const initializeSession = async () => {
      // Verificar si hay un token en localStorage
      const storedToken = localStorage.getItem("access_token");
      const storedExpiresAt = localStorage.getItem("expires_at");

      if (storedToken && storedExpiresAt) {
        // Si el token y la fecha de expiración existen en el localStorage
        const isExpired = Date.now() > parseInt(storedExpiresAt) * 1000;
        if (!isExpired) {
          // Si no ha expirado, cargamos la sesión desde localStorage
          const session = {
            access_token: storedToken,
            expires_at: parseInt(storedExpiresAt),
            user: JSON.parse(localStorage.getItem("user")),
          };
          dispatch(setSession(session)); // Guardamos en Redux
        } else {
          console.warn("Token expired in localStorage");
          localStorage.removeItem("access_token");
          localStorage.removeItem("expires_at");
          localStorage.removeItem("user");
          dispatch(setSession(null)); // Limpiamos el estado
        }
      } else {
        // Si no hay token en localStorage, obtenemos la sesión de Supabase
        const session = await fetchSession();
        dispatch(setSession(session || null));
      }

      dispatch(setLoading(false));
    };

    initializeSession();

    const { data: subscription } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        dispatch(setSession(session)); // Actualiza la sesión en Redux cuando cambia
      }
    );

    return () => subscription?.unsubscribe?.();
  }, [dispatch]);

  return <>{children}</>;
};

export default UserProvider;
