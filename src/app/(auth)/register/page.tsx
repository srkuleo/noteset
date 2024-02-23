"use client";

import { useState } from "react";
import Link from "next/link";
import { HeroSubtitle } from "@/components/login/HeroSubtitle";
import { GoogleOAuthButton } from "@/components/login/GoogleOAuthBtn";
import { Separator } from "@/components/login/Separator";
import { RegisterLink } from "@kinde-oss/kinde-auth-nextjs";
import type { UserProfile } from "@/util/types";

const userProfile: UserProfile = {
  firstName: "",
  lastName: "",
  email: "",
};

export default function RegisterPage() {
  const [user, setUser] = useState(userProfile);

  return (
    <>
      <HeroSubtitle content="Never again bring a notebook to the gym. Register today!" />
      <div className="flex flex-col px-8">
        <GoogleOAuthButton />

        <Separator />

        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-3">
            <input
              type="text"
              name="userFirstName"
              id="userFirstName"
              placeholder="First Name"
              className="login-input-field"
              required
              onChange={(e) => setUser({ ...user, firstName: e.target.value })}
            />
            <input
              type="text"
              name="userLastName"
              id="userLastName"
              placeholder="Last Name"
              className="login-input-field"
              required
              onChange={(e) => setUser({ ...user, lastName: e.target.value })}
            />
            <input
              type="email"
              name="userEmail"
              id="userEmail"
              placeholder="Email"
              className="login-input-field"
              required
              autoComplete="email"
              onChange={(e) => setUser({ ...user, email: e.target.value })}
            />
          </div>
          <RegisterLink
            authUrlParams={{
              connection_id: "conn_8366bf58a5c5457dbfbd80a0e643e04f",
              login_hint: user.email,
            }}
            className="rounded-full bg-violet-500/85 py-2 text-center font-semibold text-white shadow-md transition active:scale-95"
          >
            Register
          </RegisterLink>
          <p className="font-semibold leading-none dark:text-slate-400">
            Already a user?
            <Link className="pl-1 font-bold text-green-500" href="/">
              Login here.
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
