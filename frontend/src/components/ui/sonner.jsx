import React from "react"
import { Toaster as Sonner } from "sonner"

const Toaster = ({ theme = "system", ...props }) => {
  return (
    <Sonner
      theme={theme}
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast bg-white text-gray-900 border border-gray-200 shadow-lg dark:bg-gray-800 dark:text-white dark:border-gray-700",
          description: "text-gray-500 dark:text-gray-400",
          actionButton:
            "bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600",
          cancelButton:
            "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300",
        },
      }}
      {...props}
    />
  )
}

export { Toaster }