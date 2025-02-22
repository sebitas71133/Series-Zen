import { useDispatch } from "react-redux";
import { setLoading, setSession } from "../store/slices/sessionSlice";
import { supabase } from "../../config/supabaseClient";
import { useEffect } from "react";
import { fetchSession } from "../utils/authHelpers";
import { isTokenExpired } from "../utils/isTokenExpired";

const UserProvider = ({ children }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const initializeSession = async () => {
      // 1RO VERIFICAR SI EXISTE TOKEN ALMACENADO EN EL LOCALSTORAGE

      const storedToken = localStorage.getItem("access_token");
      const storedExpiresAt = localStorage.getItem("expires_at");

      if (storedToken && storedExpiresAt) {
        // Si el token y la fecha de expiración existen en el localStorage

        const isExpired = isTokenExpired(storedExpiresAt);
        if (!isExpired) {
          // Si no ha expirado, cargamos la sesión desde localStorage
          const session = {
            access_token: storedToken,
            expires_at: parseInt(storedExpiresAt),
            user: JSON.parse(localStorage.getItem("user")),
          };
          dispatch(setSession(session));
        } else {
          console.warn("Token expired in localStorage");
          localStorage.removeItem("access_token");
          localStorage.removeItem("expires_at");
          localStorage.removeItem("user");
          dispatch(setSession(null));
        }
      } else {
        // SI HABIA TOKEN EXPIRADO EN EL LOCALSTORAGE SE OBTIENE DE SUPABASE
        const session = await fetchSession();
        dispatch(setSession(session || null));
      }

      dispatch(setLoading(false));
    };

    initializeSession();

    const { data: subscription } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        dispatch(setSession(session));
      }
    );

    return () => subscription?.unsubscribe?.();
  }, [dispatch]);

  return <>{children}</>;
};

export default UserProvider;
