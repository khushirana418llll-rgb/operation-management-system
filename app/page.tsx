"use client";

import PageWrapper from "@/components/custome-components/pageWrapper";
import LoginPage from "./login/page";

export default function UsersClientPage() {

  return (
    <PageWrapper>
      <div>
        <LoginPage />
      </div>
    </PageWrapper>
  );
}