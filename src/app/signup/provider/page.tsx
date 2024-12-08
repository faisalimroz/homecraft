import ProviderSignupPage from "@/components/pages/ProviderSignUp";
import SignupPage from "@/components/pages/SignupPage";
import { Metadata } from 'next';


export const metadata: Metadata = {
  title: "HC | Provider Signup",
};

const Signup = () => {

  return (
    <>
     <ProviderSignupPage/>
    </>
  );
};

export default Signup;
