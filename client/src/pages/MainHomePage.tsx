import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { toast, Toaster } from "sonner";
import { useDispatch } from "react-redux";
import { login, set_loading } from "../Store/AuthSlice";
import api from "../api/axios";
import Loading from "../components/Loading";
import Home from "./Home";
import About from "./About";
import CardPage from "./CardPage";
import ContactUsPage from "./ContactUsPage";

export default function MainHomePage() {
  const dispatch = useDispatch();

  const { data, isPending, isError, error, isSuccess } = useQuery({
    queryKey: ["current_user"],
    queryFn: async () => {
      const response = await api.get(`${import.meta.env.VITE_BACKEND_URL}/user/current-user`);
      return response.data;
    },
    retry : false
  });

  useEffect(() => {
    if (isSuccess && data) {
      toast.success("Welcome Back!");
      dispatch(login(data));
      dispatch(set_loading(false));
    }
    if (isError) {
      console.error("there is a error ");
      toast.error("please login to your account ");
      dispatch(set_loading(false));
    }
  }, [isSuccess, isError, data, error, dispatch]);

 useEffect(() => {
    if (isPending) {
      dispatch(set_loading(true));
    }
  }, [isPending, dispatch]);

  if (isPending) {
    return <Loading />;
  }

  return (
    <>
      <Toaster position="top-center" />
      <Home />
      <About />
      <CardPage />
      <ContactUsPage />
    </>
  );
}
