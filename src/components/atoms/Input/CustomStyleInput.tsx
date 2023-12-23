import {extendVariants, Input} from "@nextui-org/react";

const MyInput = extendVariants(Input, {
  variants: { // <- modify/add variants
    color: {
      greenAMI: { // <- add a new color variant
        inputWrapper: [ // <- Input wrapper slot
          "!border-2",
        //   "transition-colors",
          "focus-within:!border-green-300",
        //   "focus-within:",
          "data-[hover=true]:border-green-400",
        //   "data-[hover=true]:",
        //   "data-[hover=true]:bg-red-500",
          "group-data-[focus=true]:border-green-700",
          // dark theme
        //   "dark:bg-zinc-900",
        //   "dark:border-zinc-800",
        //   "dark:data-[hover=true]:bg-zinc-900",
        //   "dark:focus-within:bg-zinc-900",
        ],
        input: [  // <- Input element slot
          "text-zinc-800",
          "placeholder:text-zinc-600",
          // dark theme
          "dark:text-zinc-400",
          "dark:placeholder:text-zinc-600",
        ],
      },
    },
    size: {
      xs: {
        inputWrapper: "h-unit-6 min-h-unit-6 px-1",
        input: "text-tiny",
      },
      md: {
        inputWrapper: "h-unit-10 min-h-unit-10",
        input: "text-small",
      },
      xl: {
        inputWrapper: "h-unit-14 min-h-unit-14",
        input: "text-medium",
      },
    },
    radius: {
      xs: {
        inputWrapper: "rounded",
      },
      sm: {
        inputWrapper: "rounded-[4px]",
      },
    },
    textSize: {
      base: {
        input: "text-sm",
      },
    },
    removeLabel: {
      true: {
        label: "hidden",
      },
      false: {},
    },
  },
  defaultVariants: {
    color: "greenAMI",
    textSize: "base",
    removeLabel: true,
  },
});

export default MyInput;