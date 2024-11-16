import React from "react";
import DropIn from "braintree-web-drop-in-react";
import { getBraintreeToken } from "../../api";
import { useQuery } from "@tanstack/react-query";

const BraintreeDropIn = ({ onPaymentMethodNonce }) => {
  const { data, isPending } = useQuery({
    queryKey: ["braintree-token"],
    refetchOnMount: true,
    queryFn: getBraintreeToken,
  });

  const handlePaymentMethodNonce = (payload) => {
    onPaymentMethodNonce(payload.nonce);
  };

  return (
    <>
      {isPending || !data ? (
        <div className="mt-2 loader-lg" />
      ) : (
        <DropIn
          options={{
            authorization: data.clientToken,
          }}
          onInstance={(instance) => (window.dropinInstance = instance)}
          onPaymentMethodNonce={handlePaymentMethodNonce}
        />
      )}
    </>
  );
};

export default BraintreeDropIn;
