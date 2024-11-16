import { useEffect, useState } from "react";
import { cn } from "../../lib/utils";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./dialog";

const BaseModal = ({
  onClose,
  title,
  description,
  children,
  contentClassname,
  footer,
}) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setOpen(true);
    }, 0);
  }, []);

  const handleClose = (o) => {
    if (!o)
      setTimeout(() => {
        onClose();
      }, 100);
    setOpen(o);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent
        className={cn(
          "sm:max-w-[425px] max-h-full overflow-auto",
          contentClassname
        )}
      >
        <DialogHeader className="border-b border-b-neutral-200 pb-2">
          <DialogTitle className="text-xl">{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <div className="px-2">{children}</div>
        {footer && <DialogFooter>{footer}</DialogFooter>}
      </DialogContent>
    </Dialog>
  );
};

export default BaseModal;
