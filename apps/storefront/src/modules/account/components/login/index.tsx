"use client"

import { useFormState } from "react-dom"
import { LOGIN_VIEW } from "@modules/account/templates/login-template"
import { Checkbox } from "@medusajs/ui"
import Input from "@modules/common/components/input"
import ErrorMessage from "@modules/checkout/components/error-message"
import { SubmitButton } from "@modules/checkout/components/submit-button"
import { login } from "@lib/data/customer"
import { useState } from "react"

type Props = {
  setCurrentView: (view: LOGIN_VIEW) => void
}

const Login = ({ setCurrentView }: Props) => {
  const [message, formAction] = useFormState(login, null)
  const [googleAuthError, setGoogleAuthError] = useState<string | null>(null)

  const handleGoogleAuth = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setGoogleAuthError(null)
    try {
      const backendUrl = process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL || "http://localhost:9000"
      const res = await fetch(`${backendUrl}/auth/customer/google`).then((r) => r.json())
      if (res?.location) {
        if (res.location.includes("GOOGLE_CLIENT_ID_PLACEHOLDER")) {
          setGoogleAuthError("Google OAuth Credentials Required: Please set MEDUSA_AUTH_GOOGLE_CLIENT_ID & MEDUSA_AUTH_GOOGLE_CLIENT_SECRET in backend .env file.")
          return
        }
        window.location.href = res.location
      } else {
        setGoogleAuthError(res.message || "Unable to initiate Google Auth")
      }
    } catch (err: any) {
      setGoogleAuthError("Backend server (http://localhost:9000) is offline. Please run 'yarn dev' to start the server.")
    }
  }

  return (
    <div
      className="max-w-md w-full flex flex-col gap-6 bg-white p-8 rounded-3xl border border-[#E5E0D8] shadow-sm"
      data-testid="login-page"
    >
      <div className="flex flex-col gap-1">
        <span className="badge-gold self-start text-xs font-semibold uppercase tracking-wider">Welcome Back</span>
        <h2 className="font-serif text-3xl font-bold text-[#1C1917]">
          Sign In to Suddha Ghee
        </h2>
        <p className="text-xs text-[#71717A]">
          Access your orders, saved address, and wishlist.
        </p>
      </div>

      {/* Continue with Google OAuth Button */}
      <button
        type="button"
        onClick={handleGoogleAuth}
        className="w-full py-3 px-4 rounded-xl border border-[#E5E0D8] bg-[#FAF7F0] hover:bg-[#F2ECE1] transition-all flex items-center justify-center gap-3 text-sm font-medium text-[#1C1917] shadow-sm cursor-pointer"
      >
        <svg className="w-5 h-5" viewBox="0 0 24 24">
          <path
            fill="#4285F4"
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
          />
          <path
            fill="#34A853"
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
          />
          <path
            fill="#FBBC05"
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
          />
          <path
            fill="#EA4335"
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
          />
        </svg>
        Continue with Google
      </button>

      {googleAuthError && (
        <div className="p-3 bg-amber-50 border border-amber-200 text-amber-800 text-xs rounded-xl">
          {googleAuthError}
        </div>
      )}

      <div className="flex items-center gap-4 my-1">
        <div className="flex-1 h-[1px] bg-[#E5E0D8]"></div>
        <span className="text-xs text-[#A1A1AA] uppercase tracking-wider font-medium">Or email</span>
        <div className="flex-1 h-[1px] bg-[#E5E0D8]"></div>
      </div>

      <form className="w-full flex flex-col gap-4" action={formAction}>
        <Input
          label="Email Address"
          name="email"
          type="email"
          title="Enter a valid email address."
          autoComplete="email"
          required
          data-testid="email-input"
          className="!bg-[#FAF7F0] border-[#E5E0D8] rounded-xl"
        />
        <Input
          label="Password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          data-testid="password-input"
          className="!bg-[#FAF7F0] border-[#E5E0D8] rounded-xl"
        />

        <div className="flex items-center justify-between mt-1">
          <div className="flex items-center gap-2">
            <Checkbox name="remember_me" id="remember_me" data-testid="remember-me-checkbox" />
            <label htmlFor="remember_me" className="text-xs text-[#52525B] cursor-pointer">
              Remember me
            </label>
          </div>
        </div>

        <ErrorMessage error={typeof message === "string" ? message : message?.error} data-testid="login-error-message" />

        <div className="flex flex-col gap-3 mt-2">
          <SubmitButton
            data-testid="sign-in-button"
            className="w-full py-3 bg-[#173B2F] hover:bg-[#0F2820] text-[#FAF7F0] font-semibold rounded-xl transition-all shadow-md"
          >
            Sign In
          </SubmitButton>

          <p className="text-center text-xs text-[#71717A] mt-2">
            Don&apos;t have an account?{" "}
            <button
              type="button"
              onClick={() => setCurrentView(LOGIN_VIEW.REGISTER)}
              className="text-[#D69A24] font-semibold underline hover:text-[#B5811C] transition-colors"
              data-testid="register-button"
            >
              Create Account
            </button>
          </p>
        </div>
      </form>
    </div>
  )
}

export default Login
