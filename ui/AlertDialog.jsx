import React, { useEffect, useState } from "react";
import {
  AlertDialog as ShadCnAlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "./alert-dialog";

const AlertDialog = ({ title, description, onClose, onAction, isLoading }) => {
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
    <ShadCnAlertDialog open={open} onOpenChange={handleClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            className="min-w-[93px] bg-red-600"
            onClick={onAction}
          >
            {isLoading ? <div className="loader"></div> : "Continue"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </ShadCnAlertDialog>
  );
};

export default AlertDialog;
