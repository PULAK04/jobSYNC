import React from "react"

const Button = React.forwardRef(
  (
    {
      className = "",
      variant = "default",
      size = "default",
      asChild = false,
      ...props
    },
    ref
  ) => {
    // Base styles
    const baseStyles = "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"

    // Variant styles
    const variantStyles = {
      default: "bg-blue-600 text-white hover:bg-blue-600/90",
      destructive: "bg-red-600 text-white hover:bg-red-600/90",
      outline: "border border-gray-300 bg-white hover:bg-gray-100 text-gray-900",
      secondary: "bg-gray-600 text-white hover:bg-gray-600/80",
      ghost: "hover:bg-gray-100 text-gray-900",
      link: "text-blue-600 underline-offset-4 hover:underline",
    }

    // Size styles
    const sizeStyles = {
      default: "h-10 px-4 py-2",
      sm: "h-9 px-3 rounded-md",
      lg: "h-11 px-8 rounded-md",
      icon: "h-10 w-10",
    }

    const Comp = asChild ? React.Fragment : "button"

    const classes = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`

    return (
      <Comp
        ref={ref}
        className={asChild ? undefined : classes}
        {...props}
      >
        {asChild ? (
          React.Children.only(props.children)
        ) : (
          props.children
        )}
      </Comp>
    )
  }
)

Button.displayName = "Button"

export { Button }