import {
  Unstable_NumberInput as BaseNumberInput,
  NumberInputProps,
} from "@mui/base/Unstable_NumberInput";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { styled } from "@mui/system";
import { useTheme } from "next-themes";
import * as React from "react";

const NumberInput = React.forwardRef(function CustomNumberInput(
  props: NumberInputProps,
  ref: React.ForwardedRef<HTMLDivElement>,
) {
  return (
    <BaseNumberInput
      slots={{
        root: StyledInputRoot,
        input: StyledInput,
        incrementButton: StyledButton,
        decrementButton: StyledButton,
      }}
      slotProps={{
        incrementButton: {
          children: <AddIcon fontSize="small" />,
          className: "increment",
        },
        decrementButton: {
          children: <RemoveIcon fontSize="small" />,
        },
      }}
      {...props}
      ref={ref}
    />
  );
});

interface QuantityInputProps {
  setValue: React.Dispatch<React.SetStateAction<number>>;
  min?: number;
  max?: number;
  defaultValue?: number;
  step?: number;
}

export default function QuantityInput({
  setValue,
  min = 0,
  max = 100,
  defaultValue = 0,
  step = 1,
}: QuantityInputProps) {
  return (
    <NumberInput
      onChange={(_event, value) => {
        setValue(value!);
      }}
      aria-label="Quantity Input"
      min={min}
      max={max}
      step={step}
      defaultValue={defaultValue}
    />
  );
}

const grey = {
  50: "#F3F6F9",
  100: "#E5EAF2",
  200: "#DAE2ED",
  300: "#C7D0DD",
  400: "#B0B8C4",
  500: "#9DA8B7",
  600: "#6B7A90",
  700: "#434D5B",
  800: "#303740",
  900: "#1C2025",
};

const StyledInputRoot = styled("div")(() => {
  const webTheme = useTheme();

  return `
  font-family: IBM Plex Sans, sans-serif;
  font-weight: 400;
  color: ${webTheme.theme === "dark" ? grey[300] : grey[500]};
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
`;
});

const StyledInput = styled("input")(() => {
  const webTheme = useTheme();

  return `
  font-size: 0.875rem;
  font-family: inherit;
  font-weight: 400;
  line-height: 1.375;
  color: ${webTheme.theme === "dark" ? grey[300] : grey[900]};
  background: ${webTheme.theme === "dark" ? "#020817" : "#fff"};
  border: 1px solid ${webTheme.theme === "dark" ? grey[700] : grey[200]};
  box-shadow: 0px 2px 4px ${
    webTheme.theme === "dark" ? "rgba(0,0,0, 0.5)" : "rgba(0,0,0, 0.05)"
  };
  border-radius: 8px;
  margin: 0 8px;
  padding: 10px 12px;
  outline: 0;
  min-width: 0;
  width: 4rem;
  text-align: center;

  &:hover {
    border-color: ${grey[400]};
  }

  &:focus {
    border-color: ${grey[400]};
    box-shadow: 0 0 0 3px ${webTheme.theme === "dark" ? grey[700] : grey[200]};
  }

  &:focus-visible {
    outline: 0;
  }
`;
});

const StyledButton = styled("button")(() => {
  const webTheme = useTheme();
  return `
  font-family: IBM Plex Sans, sans-serif;
  font-size: 0.875rem;
  box-sizing: border-box;
  line-height: 1.5;
  border: 1px solid;
  border-radius: 999px;
  border-color: ${webTheme.theme === "dark" ? grey[800] : grey[200]};
  background: ${webTheme.theme === "dark" ? "#020817" : grey[50]};
  color: ${webTheme.theme === "dark" ? grey[200] : grey[900]};
  width: 32px;
  height: 32px;
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 120ms;

  &:hover {
    cursor: pointer;
    background: ${webTheme.theme === "dark" ? grey[700] : grey[800]};
    border-color: ${webTheme.theme === "dark" ? grey[500] : grey[900]};
    color: ${grey[50]};
  }

  &:focus-visible {
    outline: 0;
  }

  &.increment {
    order: 1;
  }
`;
});
