import { useDispatch } from "react-redux";
import { setLoading, setSession } from "../store/slices/sessionSlice";
import { supabase } from "../../config/supabaseClient";
import { useEffect } from "react";

const UserProvider = ({ children }) => {
  const dispatch = useDispatch();
  // const { session, loading } = useSelector((state) => state.session);

  useEffect(() => {
    const fetchSession = async () => {
      const { data } = await supabase.auth.getSession();
      dispatch(setSession(data.session || null));
      dispatch(setLoading(false));
    };

    fetchSession();

    const { data: subscription } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        dispatch(setSession(session));
      }
    );

    return () => subscription?.unsubscribe?.();
  }, []);

  return <>{children}</>;
};

export default UserProvider;
