"use client";

import { GoogleIcon } from "@/icons/login/google";
import { LoginLink } from "@kinde-oss/kinde-auth-nextjs";
import { useState } from "react";
import { Separator } from "./Separator";
import Link from "next/link";

export const LoginForm = () => {
  const [userEmail, setUserEmail] = useState("");

  return (
    <div className="flex flex-col px-8">
      <LoginLink
        authUrlParams={{
          connection_id: "conn_ac6e434edebf42099dd4371003bca270",
        }}
        className="flex items-center justify-center gap-2 rounded-xl bg-white py-2 shadow-md ring-1 ring-slate-300 transition active:scale-95 dark:bg-slate-900 dark:ring-slate-700"
      >
        {GoogleIcon}
        <p className="font-semibold">Login via Google</p>
      </LoginLink>

      <Separator />

      <div className="flex flex-col gap-10">
        <input
          type="email"
          name="userEmail"
          id="userEmail"
          placeholder="Email"
          className="login-input-field"
          required
          onChange={(e) => setUserEmail(e.target.value)}
        />
        <div className="flex flex-col gap-5">
          <LoginLink
            authUrlParams={{
              connection_id: "conn_8366bf58a5c5457dbfbd80a0e643e04f",
              login_hint: userEmail,
            }}
            className="rounded-full bg-violet-500/85 py-2 text-center font-semibold text-white shadow-md transition active:scale-95"
          >
            Login
          </LoginLink>
          <p className="font-semibold dark:text-slate-400">
            Not a user?
            <Link className="pl-1 font-bold text-green-500" href="/register">
              Register here.
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
