import ChooseSignUpCard from "@/components/pages/ChooseSignup/ChooseSignUpCard";
import Provider from '../../../public/assets/user.png'

const demoData = [
  {
    name: " Provider",
    imageUrl: "/assets/provider.png", 
    href:"signup/provider"
  },
  {
    name: "User",
    imageUrl: "/assets/user.png", 
    href:"signup"
  },
  
  
];

function ChooseSignup() {
  return (
    <div className="py-20">
      <h1 className="text-center  text-2xl lg:text-3xl">Choose your preferred signup type</h1>
      <div className="flex justify-center items-center py-8  ">
        <div className="grid md:grid-cols-2  xs:grid-cols-1 gap-y-4 gap-x-6">
          {demoData?.map((data, index) => (
            <div key={index}>
              <ChooseSignUpCard data={data} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ChooseSignup;
