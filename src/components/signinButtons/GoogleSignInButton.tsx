"use client";
import { signIn } from "next-auth/react";
import React from "react";

interface GoogleSignInButtonProps {
  providerId: string;
  callbackUrl: string;
}

const GoogleSignInButton = ({ providerId, callbackUrl }: GoogleSignInButtonProps) => {
  return (
    <a
      onClick={() => signIn(providerId, { callbackUrl })}
      role="button"
      className="bg-green-600 hover:bg-green-500 border-2 border-emerald-950 hover:border-green-600 text-white font-semibold py-2 px-4 rounded-md w-full flex justify-center gap-4"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        aria-label="Gmail"
        role="img"
        viewBox="0 0 512 512"
        fill="#000000"
        width={25}
      >
        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
        <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
        <g id="SVGRepo_iconCarrier">
          <rect width="512" height="512" rx="15%" fill="#ffffff"></rect>
          <path d="M158 391v-142l-82-63V361q0 30 30 30" fill="#4285f4"></path>
          <path d="M 154 248l102 77l102-77v-98l-102 77l-102-77" fill="#ea4335"></path>
          <path d="M354 391v-142l82-63V361q0 30-30 30" fill="#34a853"></path>
          <path d="M76 188l82 63v-98l-30-23c-27-21-52 0-52 26" fill="#c5221f"></path>
          <path d="M436 188l-82 63v-98l30-23c27-21 52 0 52 26" fill="#fbbc04"></path>
        </g>
      </svg>
      Entra con Google
    </a>
  );
};

export default GoogleSignInButton;
