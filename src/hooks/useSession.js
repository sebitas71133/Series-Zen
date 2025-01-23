import { useState, useEffect } from "react";
import { supabase } from "../../config/supabaseClient";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setSession } from "../store/slices/sessionSlice";
import { fetchSession } from "../utils/authHelpers";

const useSession = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const initializeSession = async () => {
      dispatch(setLoading(true));
      const session = await fetchSession();
      dispatch(setSession(session || null));
      dispatch(setLoading(false));
    };

    initializeSession();

    const { data: subscription } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (session) {
          const isExpired = Date.now() >= session.expires_at * 1000;

          if (!isExpired) {
            dispatch(setSession(session));
          } else {
            console.warn("Token expired in onAuthStateChange.");
            dispatch(setSession(null));
          }
        } else {
          dispatch(setSession(null));
        }
      }
    );

    return () => subscription?.unsubscribe?.();
  }, []);
};

export default useSession;
