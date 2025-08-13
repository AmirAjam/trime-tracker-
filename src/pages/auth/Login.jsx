import { useForm } from "react-hook-form";
import { loginUser } from "@/api/loginApi";
import logo from "../../assets/images/logo.png";
import PrimaryButton from "../../components/ui/PrimaryButton";
import AuthInput from "./AuthInput";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

import setLocalStorage from '../../utils/setLocalStorage'

const Login = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await loginUser(data);
      console.log(response)
      if (response.status === 200) {
        toast.success("ورود موفقیت‌آمیز بود!");
        setLocalStorage("token",response.data.accessToken)
        setTimeout(() => {
          navigate('/')
        }, 3000);
      }
      else {
        toast.error("نام کاربری یا رمز عبور اشتباه است");
      }
    } catch (error) {
      console.log(error)
      toast.error("مشکلی در سرور پیش آمده");
    }
  };

  return (
    <section className="h-[100vh] flex items-center flex-col">
      <img src={logo} alt="TechGo" className="h-38 mt-20" />
      <form
        className="bg-darker w-80 px-5 rounded-lg py-3 mt-5 pb-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className="font-Vazirmatn-Bold text-xl text-center">ورود</h1>

        <AuthInput
          placeholder="ایمیل را وارد کنید"
          name="sss"
          {...register("email", {
            required: "وارد کردن ایمیل الزامی است",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "ایمیل معتبر نیست"
            }
          })}
        />
        {errors.email && (
          <p className="text-red-500 text-sm">{errors.email.message}</p>
        )}

        <AuthInput
          type="password"
          placeholder="رمز عبور را وارد کنید"
          {...register("password", { required: " وارد کردن رمز عبور الزامی است " })}
        />
        {errors.password && (
          <p className="text-red-500 text-sm">{errors.password.message}</p>
        )}

        <div className="mt-5 w-34 mx-auto">
          <PrimaryButton type="submit" />
        </div>
      </form>
    </section>
  );
};

export default Login;
