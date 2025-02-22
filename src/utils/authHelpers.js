//Se obtiene la sesion del usuario
//Verifica si el token es valido
//Si no expiro el token retorna la session, sino retorna null
//Se pide que el usuario se loguee otra vez

import { supabase } from "../../config/supabaseClient";
import { isTokenExpired } from "./isTokenExpired";

export const fetchSession = async () => {
  const { data } = await supabase.auth.getSession();

  if (data) {
    const isExpired = isTokenExpired(data?.session?.expires_at);

    if (!isExpired) {
      return data.session;
    } else {
      console.warn("Token expired");

      return null;
    }
  }

  return null;
};
