import {
  Dialog as DialogHeadlessUi,
  DialogProps as DialogPropsHeadlessUi,
  DialogPanel,
} from "@headlessui/react";

interface DialogProps extends DialogPropsHeadlessUi {
  children?: React.ReactNode;
}

export const Dialog: React.FC<DialogProps> = ({
  open,
  onClose,
  children,
  ...props
}) => {
  return (
    <DialogHeadlessUi
      open={open}
      onClose={onClose}
      {...props}
      transition
      className="fixed inset-0 flex w-screen items-center justify-center backdrop-blur-xs bg-black/30 p-4 transition duration-200 ease-out data-[closed]:opacity-0"
    >
      <DialogPanel
        transition
        className="duration-200 ease-out data-[closed]:opacity-0 data-[closed]:scale-90"
      >
        {children}
      </DialogPanel>
    </DialogHeadlessUi>
  );
};
