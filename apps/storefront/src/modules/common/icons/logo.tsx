import { SVGProps } from "react"

const LogoIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="28"
    height="28"
    viewBox="0 0 28 28"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <rect width="28" height="28" rx="8" fill="#1D2B9A" />
    <path
      d="M14 5C9 5 7 9.5 7 14.5C7 19.5 10.1 23 14 23C17.9 23 21 19.5 21 14.5C21 12 20 9.5 18 7.5C18 10.5 16 12 14 12C12 12 11 10.5 11 9C11 7 12.5 5.5 14 5Z"
      fill="#FFE500"
    />
    <circle cx="14" cy="15" r="2.5" fill="#1D2B9A" />
  </svg>
)

export default LogoIcon
