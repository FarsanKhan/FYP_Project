import React, { useState } from "react";
import BaseModal from "../ui/BaseModal";
import { LoaderButton } from "../ui/button";
import { useStore } from "../../lib/store";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUser } from "../../api";
import toast from "react-hot-toast";
import { Input } from "../ui/input";
import PhoneInput from "../ui/PhoneInput";
import { Textarea } from "../ui/textarea";
import AutocompleteInput from "../ui/AutocompleteInput";
import { Industries } from "../../lib/utils";

const IntroModal = ({ onClose }) => {
  const queryClient = useQueryClient();
  const user = useStore((state) => state.user);
  const setUser = useStore((state) => state.updateUser);
  const [values, setValues] = useState({});

  const updateUserMutation = useMutation({
    mutationFn: updateUser,
    onSuccess: () => {
      onClose();
      setUser({ ...user, ...values });
      toast.success("User updated successfully", {
        position: "bottom-right",
      });
      queryClient.invalidateQueries({ queryKey: ["user-" + user.id] });
    },
    onError: (error) => {
      toast.error(error.response.data.message);
    },
  });

  const onSave = () => {
    const form = document.getElementById("intro-form");
    form.click();
    if (form.parentElement.checkValidity()) {
      const formData = Object.fromEntries(new FormData(form.parentElement));
      setValues(formData);
      updateUserMutation.mutate({ ...formData, phone: "+92" + formData.phone });
    }
  };

  return (
    <BaseModal
      onClose={onClose}
      contentClassname="!max-w-[600px]"
      title="Edit intro"
      footer={
        <LoaderButton
          size="sm"
          isLoading={updateUserMutation.isPending}
          onClick={onSave}
          className="h-9 min-w-28 bg-blue-500 rounded-full"
        >
          Save
        </LoaderButton>
      }
    >
      <form
        onSubmit={(event) => event.preventDefault()}
        className="flex flex-col gap-7"
      >
        <div className="flex flex-col gap-5">
          <Input
            label="Name"
            name="name"
            defaultValue={user.name}
            required
            placeholder="Name"
          />
          <Textarea required name="headline" label="Headline">
            {user.headline}
          </Textarea>
          <PhoneInput
            defaultValue={user.phone.replace("+92", "")}
            label="Phone"
            name="phone"
            required
            placeholder="Phone"
          />
          {user.type === "employer" && (
            <AutocompleteInput
              freeSolo
              defaultValue={user.industry}
              required
              size="w-[550px]"
              name="industry"
              placeholder="What is your industry?"
              options={Industries}
            />
          )}
          <Input
            defaultValue={user.location}
            label="Location"
            name="location"
            required
            placeholder="Location"
          />
        </div>
        <button id="intro-form" className="hidden" type="submit" />
      </form>
    </BaseModal>
  );
};

export default IntroModal;
