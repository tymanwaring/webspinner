interface BrandKnotIconProps {
  size?: number
  className?: string
  animated?: boolean
}

export function BrandKnotIcon({
  size = 36,
  className = "",
  animated = false,
}: BrandKnotIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${animated ? "animate-untangle " : ""}${className}`}
      aria-hidden="true"
    >
      <circle
        cx="18"
        cy="18"
        r="16"
        stroke="currentColor"
        strokeWidth="1.5"
        className="text-primary"
        opacity="0.3"
      />
      <path
        d="M10 18C10 14 14 10 18 10C22 10 26 14 26 18C26 22 22 26 18 26C14 26 12 23 14 20C16 17 20 16 22 18C24 20 22 24 18 24"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        className="text-primary"
      />
    </svg>
  )
}
