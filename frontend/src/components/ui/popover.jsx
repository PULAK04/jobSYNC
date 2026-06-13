import React, { useState, useRef, useEffect } from "react"

const PopoverContext = React.createContext()

const Popover = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <PopoverContext.Provider value={{ isOpen, setIsOpen }}>
      <div className="relative inline-block">
        {children}
      </div>
    </PopoverContext.Provider>
  )
}

const PopoverTrigger = React.forwardRef(({ children, className = "", ...props }, ref) => {
  const { setIsOpen } = React.useContext(PopoverContext)
  
  return React.cloneElement(React.Children.only(children), {
    ref,
    onClick: () => setIsOpen(prev => !prev),
    className: `${className}`,
    ...props
  })
})

const PopoverContent = React.forwardRef(({ 
  className = "", 
  align = "center", 
  sideOffset = 4, 
  children, 
  ...props 
}, ref) => {
  const { isOpen, setIsOpen } = React.useContext(PopoverContext)
  const contentRef = useRef(null)
  
  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (contentRef.current && !contentRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }
    
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside)
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isOpen, setIsOpen])

  if (!isOpen) return null

  const alignmentClasses = {
    center: "left-1/2 transform -translate-x-1/2",
    start: "left-0",
    end: "right-0"
  }

  return (
    <div
      ref={ref || contentRef}
      className={`
        z-50 w-72 rounded-md border border-gray-200 bg-white p-4 text-gray-900 shadow-md
        absolute mt-${sideOffset} ${alignmentClasses[align]}
        animate-fade-in
        ${className}
      `}
      {...props}
    >
      {children}
    </div>
  )
})

export { Popover, PopoverTrigger, PopoverContent }