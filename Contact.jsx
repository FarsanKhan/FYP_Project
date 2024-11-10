import React, { useEffect } from "react";
import { TypographyMuted, TypographyP } from "../ui/typography";
import { getRandomInitailsImage } from "../../lib/utils";
import { useStore } from "../../lib/store";
import { Input } from "../ui/input";
import PhoneInput from "../ui/PhoneInput";
import { Button } from "../ui/button";

const Contact = ({ preview, phone, setPhone, onEdit }) => {
  const user = useStore((state) => state.user);

  useEffect(() => {
    if (!phone) {
      setPhone(user.phone.replace("+92", ""));
    }
  }, []);

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <TypographyP className="text-base">
          <b>Contact info</b>
        </TypographyP>
        {preview && (
          <Button onClick={onEdit} variant="ghost" className="text-blue-500">
            Edit
          </Button>
        )}
      </div>
      <div className="flex items-center gap-4">
        <img
          className="overflow-hidden rounded-full"
          src={getRandomInitailsImage(user.name)}
          alt={user.name}
          width={46}
          height={46}
        />
        <div>
          <TypographyP className="text-base leading-none">
            <b> {user.name}</b>
          </TypographyP>
          <TypographyMuted>{user.location}</TypographyMuted>
        </div>
      </div>
      <form
        className="flex flex-col gap-4 mt-1"
        onSubmit={(e) => e.preventDefault()}
      >
        <Input
          name="email"
          label="Email address*"
          required
          className={preview ? "border-0 h-6 p-0" : ""}
          readOnly={preview}
          value={user.email}
          placeholder="Email Address"
          type="email"
        />
        <PhoneInput
          label="Mobile phone number*"
          name="phone"
          required
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          preview={preview}
          className={preview ? "border-0 h-6 p-0" : ""}
          readOnly={preview}
          placeholder="Phone"
        />
        <button id="contact-form" className="hidden" type="submit" />
      </form>
    </div>
  );
};

export default Contact;
