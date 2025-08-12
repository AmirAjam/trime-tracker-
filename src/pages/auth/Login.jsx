import logo from "../../assets/images/logo.png";
import PrimaryButton from "../../components/ui/PrimaryButton";
import AuthInput from "./AuthInput";

const Login = () => {
  return (
    <section className="h-[100vh] flex items-center flex-col">
      <img src={logo} alt="ُTechGo" className="h-38 mt-20" />
      <div className="bg-darker w-80 px-5 rounded-lg py-3 mt-5 pb-4">
        <h1 className="font-Vazirmatn-Bold text-xl text-center">ورود</h1>
        <AuthInput placeholder="نام کاربری را وارد کنید" />
        <AuthInput placeholder="رمز عبور را وارد کنید" />
        <div className="mt-5 w-34 mx-auto">
          <PrimaryButton />
        </div>
      </div>
    </section>
  )
}

export default Login