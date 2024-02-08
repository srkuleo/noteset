"use client";

import { useState } from "react";
import Link from "next/link";
import { LoginLink } from "@kinde-oss/kinde-auth-nextjs";
import { GoogleOAuthButton } from "./GoogleOAuthBtn";
import { Separator } from "./Separator";

export const LoginForm = () => {
  const [userEmail, setUserEmail] = useState("");

  return (
    <div className="flex flex-col px-8">
      <GoogleOAuthButton />

      <Separator />

      <div className="flex flex-col gap-6">
        <input
          type="email"
          name="userEmail"
          id="userEmail"
          placeholder="Email"
          className="login-input-field"
          required
          autoComplete="email"
          onChange={(e) => setUserEmail(e.target.value)}
        />
        <LoginLink
          authUrlParams={{
            connection_id: "conn_8366bf58a5c5457dbfbd80a0e643e04f",
            login_hint: userEmail,
          }}
          className="rounded-full bg-violet-500/85 py-2 text-center font-semibold text-white shadow-md transition active:scale-95"
        >
          Login
        </LoginLink>
        <p className="font-semibold leading-none dark:text-slate-400">
          Not a user?
          <Link className="pl-1 font-bold text-green-500" href="/register">
            Register here.
          </Link>
        </p>
      </div>
    </div>
  );
};
