import SignupPage from "@/components/pages/SignupPage";
import { Metadata } from 'next';


export const metadata: Metadata = {
  title: "HC | Signup",
};

const Signup = () => {

  return (
    <div className='main'>
     <SignupPage/>
    </div>
  );
};

export default Signup;
