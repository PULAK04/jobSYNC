import React from "react"
import { Circle } from "lucide-react"

const RadioGroupContext = React.createContext()

const RadioGroup = React.forwardRef(({ className = "", value, onValueChange, ...props }, ref) => {
  return (
    <RadioGroupContext.Provider value={{ value, onValueChange }}>
      <div
        ref={ref}
        className={`grid gap-2 ${className}`}
        role="radiogroup"
        {...props}
      />
    </RadioGroupContext.Provider>
  )
})

RadioGroup.displayName = "RadioGroup"

const RadioGroupItem = React.forwardRef(({ 
  className = "", 
  value, 
  disabled = false,
  ...props 
}, ref) => {
  const { value: groupValue, onValueChange } = React.useContext(RadioGroupContext)
  const isChecked = value === groupValue

  return (
    <button
      ref={ref}
      type="button"
      role="radio"
      aria-checked={isChecked}
      disabled={disabled}
      onClick={() => onValueChange?.(value)}
      className={`
        relative aspect-square h-4 w-4 rounded-full border border-blue-600
        focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2
        ${disabled ? 'cursor-not-allowed opacity-50' : ''}
        ${className}
      `}
      {...props}
    >
      {isChecked && (
        <div className="absolute inset-0 flex items-center justify-center">
          <Circle className="h-2.5 w-2.5 fill-current text-current" />
        </div>
      )}
    </button>
  )
})

RadioGroupItem.displayName = "RadioGroupItem"

export { RadioGroup, RadioGroupItem }