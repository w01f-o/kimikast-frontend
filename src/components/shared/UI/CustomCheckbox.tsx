import {
  useCheckbox,
  Chip,
  VisuallyHidden,
  tv,
  CheckboxProps,
} from "@nextui-org/react";
import { FC } from "react";
import { CheckIcon } from "@/components/shared/icons/CheckIcon";

const checkbox = tv({
  slots: {
    base: "border-default hover:bg-default-200",
    content: "text-default-500",
  },
  variants: {
    isSelected: {
      true: {
        base: "border-primary bg-primary hover:bg-primary-500 hover:border-primary-500",
        content: "text-primary-foreground pl-1",
      },
    },
    isFocusVisible: {
      true: {
        base: "outline-none ring-2 ring-focus ring-offset-2 ring-offset-background",
      },
    },
  },
});

export const CustomCheckbox: FC<CheckboxProps> = (props) => {
  const {
    children,
    isSelected,
    isFocusVisible,
    getBaseProps,
    getLabelProps,
    getInputProps,
  } = useCheckbox({
    ...props,
  });

  const styles = checkbox({ isSelected, isFocusVisible });

  return (
    <label {...getBaseProps()}>
      <VisuallyHidden>
        <input {...getInputProps()} />
      </VisuallyHidden>
      {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
      {/* @ts-expect-error*/}
      <Chip
        classNames={{
          base: styles.base(),
          content: styles.content(),
        }}
        color="primary"
        startContent={isSelected ? <CheckIcon className="ml-1" /> : null}
        variant="faded"
        {...getLabelProps()}
      >
        {children ? children : isSelected ? "Enabled" : "Disabled"}
      </Chip>
    </label>
  );
};