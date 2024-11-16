import React, { useEffect, useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "./sheet";

const BaseSheet = ({
  title,
  description,
  children,
  onClose,
  className,
  headerClassName,
  hideClose,
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
    <Sheet open={open} onOpenChange={handleClose}>
      <SheetContent hideClose={hideClose} className={className}>
        <SheetHeader className={headerClassName}>
          <SheetTitle>{title}</SheetTitle>
          <SheetDescription>{description}</SheetDescription>
        </SheetHeader>
        {children}
      </SheetContent>
    </Sheet>
  );
};

export default BaseSheet;
