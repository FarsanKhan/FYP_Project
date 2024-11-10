import React from "react";
import BaseModal from "../ui/BaseModal";
import { Label } from "../ui/label";
import { Button, LoaderButton } from "../ui/button";
import { jobFeedback } from "../../api/job";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

const FeedbackModal = ({ id, onClose }) => {
  const jobFeedbackMutation = useMutation({
    mutationFn: jobFeedback,
    onSuccess: () => {
      onClose();
      toast.success("Thanks for the feedback!", { position: "bottom-right" });
    },
  });

  const sendFeedback = () => {
    const form = document.getElementById("feedback-form");
    form.click();
    if (form.parentElement.checkValidity()) {
      const formData = Object.fromEntries(new FormData(form.parentElement));
      jobFeedbackMutation.mutate({ id, ...formData });
    }
  };

  return (
    <BaseModal
      onClose={onClose}
      contentClassname="!max-w-[500px]"
      title="Send feedback"
      footer={
        <div>
          <Button
            onClick={onClose}
            size="sm"
            variant="ghost"
            className="h-9 w-28 text-blue-500"
          >
            Cancel
          </Button>
          <LoaderButton
            isLoading={jobFeedbackMutation.isPending}
            onClick={sendFeedback}
            size="sm"
            className="h-9 min-w-28 bg-blue-500 rounded-full"
          >
            Send
          </LoaderButton>
        </div>
      }
    >
      <form onSubmit={(e) => e.preventDefault()}>
        <Label>Enter your comment here…</Label>
        <textarea
          required
          name="comment"
          className="flex
          h-40
          w-full
          rounded-md
          border
          border-input
          bg-background
          px-3
          py-2
          text-sm
          file:border-0
          file:bg-transparent
          file:text-sm
          file:font-medium
          placeholder:text-muted-foreground
          focus-visible:outline-none
          disabled:cursor-not-allowed
          disabled:opacity-50"
        ></textarea>
        <button id="feedback-form" className="hidden" type="submit" />
      </form>
    </BaseModal>
  );
};

export default FeedbackModal;
