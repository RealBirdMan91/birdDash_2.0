import React from "react";
import VerifyForm from "@/components/auth/VerifyPageForm";

type TVerifyRequestPage = {
  searchParams: {
    token: string;
  };
};

function VerifyRequestPage(params: TVerifyRequestPage) {
  const token = params.searchParams.token;
  console.log(token);
  return <VerifyForm />;
}

export default VerifyRequestPage;
