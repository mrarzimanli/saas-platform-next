import type { Metadata } from "next";
import SignupPageView from "../../views/signupPageView";

export const metadata: Metadata = {
  title: "SaaS Platform - Login",
  description: "This platform allows users with different subscription plans to access various data and perform actions.",
};

export default function Page() {
  return <SignupPageView />;
}
