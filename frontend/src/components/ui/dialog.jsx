import React, { useState } from "react"
import { X } from "lucide-react"

const DialogContext = React.createContext(null)

const Dialog = ({ children, open: propsOpen, onOpenChange, defaultOpen = false }) => {
  const [internalOpen, setInternalOpen] = useState(defaultOpen)
  const isControlled = propsOpen !== undefined
  const open = isControlled ? propsOpen : internalOpen

  const setOpen = (value) => {
    if (!isControlled) {
      setInternalOpen(value)
    }
    onOpenChange?.(value)
  }

  return (
    <DialogContext.Provider value={{ open, setOpen }}>
      {children}
    </DialogContext.Provider>
  )
}

const useDialog = () => {
  const context = React.useContext(DialogContext)
  if (!context) {
    throw new Error("Dialog components must be wrapped in <Dialog />")
  }
  return context
}

const DialogTrigger = React.forwardRef(({ children, className = "", ...props }, ref) => {
  const { setOpen } = useDialog()
  return React.cloneElement(React.Children.only(children), {
    ref,
    onClick: () => setOpen(true),
    className: `${className}`,
    ...props
  })
})

const DialogOverlay = React.forwardRef(({ className = "", ...props }, ref) => {
  const { open } = useDialog()
  return (
    open && (
      <div
        ref={ref}
        className={`fixed inset-0 z-50 bg-black/80 transition-opacity ${className}`}
        {...props}
      />
    )
  )
})

const DialogContent = React.forwardRef(({ className = "", children, ...props }, ref) => {
  const { open, setOpen } = useDialog()

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <DialogOverlay onClick={() => setOpen(false)} />
      <div
        ref={ref}
        className={`fixed left-1/2 top-1/2 z-50 grid w-full max-w-lg -translate-x-1/2 -translate-y-1/2 gap-4 border bg-white p-6 shadow-lg rounded-lg ${className}`}
        {...props}
      >
        {children}
        <button
          onClick={() => setOpen(false)}
          className="absolute right-4 top-4 rounded-sm opacity-70 hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-gray-400"
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </button>
      </div>
    </div>
  )
})

const DialogHeader = ({ className = "", ...props }) => (
  <div
    className={`flex flex-col space-y-1.5 text-center sm:text-left ${className}`}
    {...props}
  />
)

const DialogFooter = ({ className = "", ...props }) => (
  <div
    className={`flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2 ${className}`}
    {...props}
  />
)

const DialogTitle = React.forwardRef(({ className = "", ...props }, ref) => (
  <h2
    ref={ref}
    className={`text-lg font-semibold leading-none tracking-tight ${className}`}
    {...props}
  />
))

const DialogDescription = React.forwardRef(({ className = "", ...props }, ref) => (
  <p
    ref={ref}
    className={`text-sm text-gray-500 ${className}`}
    {...props}
  />
))

export {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
}