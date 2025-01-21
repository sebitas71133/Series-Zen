import { useState } from "react";
import { supabase } from "../../../config/supabaseClient";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";

const AuthComponent = () => {
  return (
    <Auth
      supabaseClient={supabase}
      providers={["google", "facebook", "twitter"]}
      appearance={{
        theme: ThemeSupa,
      }}
    />
  );
};

export default AuthComponent;
