import React from "react"

const Badge = React.forwardRef(({
  className = "",
  variant = "default",
  ...props
}, ref) => {
  // Base styles
  const baseStyles = "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"

  // Variant styles
  const variantStyles = {
    default: "border-transparent bg-blue-600 text-white hover:bg-blue-600/80",
    secondary: "border-transparent bg-gray-600 text-white hover:bg-gray-600/80",
    destructive: "border-transparent bg-red-600 text-white hover:bg-red-600/80",
    outline: "border-gray-300 bg-transparent text-gray-800 hover:bg-gray-50",
  }

  return (
    <div
      ref={ref}
      className={`${baseStyles} ${variantStyles[variant] || variantStyles.default} ${className}`}
      {...props}
    />
  )
})

Badge.displayName = "Badge"

export { Badge }