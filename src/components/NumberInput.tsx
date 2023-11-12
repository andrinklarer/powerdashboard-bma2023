import {
  Unstable_NumberInput as BaseNumberInput,
  NumberInputProps,
} from "@mui/base/Unstable_NumberInput";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { styled } from "@mui/system";
import { useTheme } from "next-themes";
import * as React from "react";
import { useIsMobile } from "~/lib/utils";

const NumberInput = React.forwardRef(function CustomNumberInput(
  props: NumberInputProps,
  ref: React.ForwardedRef<HTMLDivElement>,
) {
  const isMobile = useIsMobile();

  // Define slots and slotProps for mobile and non-mobile views
  const mobileSlots = {
    root: StyledInputRoot,
    input: StyledInput,
    // You might want to exclude incrementButton and decrementButton for mobile
  };

  const nonMobileSlots = {
    ...mobileSlots, // Include the same slots from mobile
    incrementButton: StyledButton,
    decrementButton: StyledButton,
  };

  const mobileSlotProps = {
    // Props for mobile view if any
  };

  const nonMobileSlotProps = {
    ...mobileSlotProps, // Include the same slotProps from mobile
    incrementButton: {
      children: <AddIcon fontSize="small" />,
      className: "increment",
    },
    decrementButton: {
      children: <RemoveIcon fontSize="small" />,
    },
  };

  // Choose the appropriate slots and slotProps based on isMobile
  const slots = isMobile ? mobileSlots : nonMobileSlots;
  const slotProps = isMobile ? mobileSlotProps : nonMobileSlotProps;

  return (
    <BaseNumberInput slots={slots} slotProps={slotProps} {...props} ref={ref} />
  );
});

interface QuantityInputProps {
  setValue: React.Dispatch<React.SetStateAction<number>>;
  min?: number;
  max?: number;
  defaultValue?: number;
}

export default function QuantityInput({
  setValue,
  min = 0,
  max = 100,
  defaultValue = 0,
}: QuantityInputProps) {
  return (
    <NumberInput
      onChange={(_event, value) => {
        setValue(value!);
      }}
      aria-label="Quantity Input"
      min={min}
      max={max}
      step={1}
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
  const { resolvedTheme } = useTheme();
  const [color, setColor] = React.useState(grey[300]);

  React.useEffect(() => {
    if (resolvedTheme) {
      setColor(resolvedTheme === "dark" ? grey[300] : grey[500]);
    }
  }, [resolvedTheme]);

  return `
  font-weight: 400;
  color: ${color};
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
`;
});

const StyledInput = styled("input")(() => {
  const { resolvedTheme } = useTheme();
  const [color, setColor] = React.useState(grey[300]);
  const [border, setBorder] = React.useState(grey[700]);
  const [background, setBackground] = React.useState("#020817");
  const [boxShadow, setBoxShadow] = React.useState("rgba(0,0,0, 0.5)");

  React.useEffect(() => {
    if (resolvedTheme) {
      setColor(resolvedTheme === "dark" ? grey[300] : grey[900]);
      setBorder(resolvedTheme === "dark" ? grey[700] : grey[200]);
      setBackground(resolvedTheme === "dark" ? "#020817" : "#fff");
      setBoxShadow(
        resolvedTheme === "dark" ? "rgba(0,0,0, 0.5)" : "rgba(0,0,0, 0.05)",
      );
    }
  }, [resolvedTheme]);

  return `
  font-size: 0.875rem;
  font-family: inherit;
  font-weight: 400;
  line-height: 1.375;
  color: ${color};
  background: ${background};
  border: 1px solid ${border};
  box-shadow: 0px 2px 4px ${boxShadow};
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
    box-shadow: 0 0 0 3px ${border};
  }

  &:focus-visible {
    outline: 0;
  }
`;
});

const StyledButton = styled("button")(() => {
  const { resolvedTheme } = useTheme();
  const [border, setBorder] = React.useState(grey[800]);
  const [background, setBackground] = React.useState("#020817");
  const [color, setColor] = React.useState(grey[200]);
  const [hoverBackground, setHoverBackground] = React.useState(grey[700]);
  const [hoverBorder, setHoverBorder] = React.useState(grey[500]);

  React.useEffect(() => {
    if (resolvedTheme) {
      setBorder(resolvedTheme === "dark" ? grey[800] : grey[200]);
      setBackground(resolvedTheme === "dark" ? "#020817" : grey[50]);
      setColor(resolvedTheme === "dark" ? grey[200] : grey[900]);
      setHoverBackground(resolvedTheme === "dark" ? grey[700] : grey[800]);
      setHoverBorder(resolvedTheme === "dark" ? grey[500] : grey[900]);
    }
  }, [resolvedTheme]);
  return `
  font-family: IBM Plex Sans, sans-serif;
  font-size: 0.875rem;
  box-sizing: border-box;
  line-height: 1.5;
  border: 1px solid;
  border-radius: 999px;
  border-color: ${border};
  background: ${background};
  color: ${color};
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
    background: ${hoverBackground};
    border-color: ${hoverBorder};
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
