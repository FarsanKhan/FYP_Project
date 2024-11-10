import React, { useState } from "react";
import { TypographyH4, TypographyP } from "../ui/typography";
import JobPreviewCard from "./JobPreviewCard";
import { useStore } from "../../lib/store";
import { Button, LoaderButton } from "../ui/button";
import { iconProps } from "../../lib/utils";
import { FaLock } from "react-icons/fa";
import BraintreeDropIn from "../ui/BraintreeDropIn";
import BaseTooltip from "../ui/BaseTooltip";

const JobPromote = ({ isLoading, onSubmit, values }) => {
  const user = useStore((state) => state.user);
  const [processing, setProcessing] = useState(false);

  const handleSubmit = () => {
    onSubmit({ paid: false });
  };

  const onPaymentMethodAdd = async () => {
    setProcessing(true);
    const paymentMethod = await window.dropinInstance.requestPaymentMethod();

    setTimeout(() => {
      setProcessing(false);
      if (paymentMethod) {
        onSubmit({ paid: true });
        // handleSubmit(paymentMethod.nonce);
      }
    }, 1500);
  };

  return (
    <div className="w-full py-8 gap-8 flex max-w-[77%]">
      <div className="flex-1">
        <div className="gap-4 flex flex-col bg-white rounded-md lined-box-shadow">
          <div className="flex flex-col px-5 py-4">
            <TypographyH4 className="mb-8">
              Promote your job post to get 3x more qualified applicants
            </TypographyH4>
            <div className="pb-5 border-b border-b-neutral-200">
              <div className="flex items-center gap-3">
                <TypographyH4>Add Payment method</TypographyH4>
                <BaseTooltip
                  tooltip={
                    <p>
                      Your security is important to us. We encrypt your <br />
                      payment and personal information when sending <br /> it
                      over the internet or storing it.
                    </p>
                  }
                >
                  <span>
                    <FaLock {...iconProps} size="1.125em" />
                  </span>
                </BaseTooltip>
              </div>
              <BraintreeDropIn onPaymentMethodNonce={console.log} />
            </div>
            <div className="mt-3 flex items-center justify-between">
              <TypographyP>Order Summary</TypographyP>
              <TypographyP>Rs. 1500</TypographyP>
            </div>
          </div>
          <div className="flex justify-between items-center px-5 py-3  border-t border-t-neutral-200">
            <div />
            <div className="flex items-center gap-3">
              <Button
                onClick={handleSubmit}
                size="sm"
                variant="ghost"
                isLoading={isLoading}
                className="h-9 min-w-24 border border-black rounded-full"
              >
                Post without promoting
              </Button>
              <LoaderButton
                size="sm"
                onClick={onPaymentMethodAdd}
                className="h-9 min-w-24 bg-blue-500 rounded-full"
                isLoading={isLoading || processing}
              >
                Promote job
              </LoaderButton>
            </div>
          </div>
        </div>
      </div>
      <div style={{ flex: "0 0 270px" }}>
        <JobPreviewCard user={user} {...values} />
      </div>
    </div>
  );
};

export default JobPromote;
