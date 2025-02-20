import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import logo from "../assets/logo.svg"
import React,{useState} from "react"
import {Link,useNavigate} from 'react-router-dom'
import toast from "react-hot-toast"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import LoadingScreen from "./LoadingScreen.jsx"
const API_BASE_URL=import.meta.env.VITE_API_BASE_URL;

export function LoginForm({
  className,
  ...props
}) {
  const queryClient=useQueryClient();
  const navigate=useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: ""
  });
  function isEmail(email) {
    return /^[^@]+@[^@]+\.[^@]+$/.test(email);
  }
  const {mutate,isError,isPending,error}=useMutation({
    mutationFn:async({email,username,password})=>{
        if(!isEmail(email)){
          username=email;
          email="";
        }
        const res=await fetch(`${API_BASE_URL}/auth/login`,{
          method:'POST',
          headers:{
            'Content-Type':'application/json'
          },
          credentials: 'include',
          body:JSON.stringify({email,username,password})}
        )
        console.log({email,username,password});
        const data=await res.json();
        if(!res.ok)throw new Error(data.error || "Failed to login");
        console.log(data);
        return data;
      },
    onSuccess:()=>{
      toast.success("Login successful");
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
      navigate('/app/recommendations');
    },
    onError:(error)=>{
      toast.error(error.message);
    }   
    })
  function handleSubmit(event) {
    event.preventDefault();
    mutate(formData);
  }
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  function handleGuestSignin(){
    setFormData({
      email: "Aarav26",
      password: "aarav26"});
  }
  if(isPending){
    return(
      <LoadingScreen/>
    )
  }
  return (
    <div className={cn("flex flex-col gap-8", className)} {...props}>
      <Card className="overflow-hidden bg-[#000000cc]">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form className="p-12 md:p-10" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-8">
              <div className="flex flex-col items-center text-center">
                <h1 className="text-3xl font-bold">Welcome back !</h1>
                <p className="text-muted-foreground">
                  Login to your account to enhance your learning.
                </p>
              </div>
              <div className="grid gap-3">
                <Label htmlFor="email/username">Email or Username</Label>
                <Input id="email/username" type="text" placeholder="email or username" name="email" value={formData.email} onChange={handleInputChange} required />
              </div>
              <div className="grid gap-3">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  {/* <a href="#" className="ml-auto text-sm underline-offset-2 hover:underline">
                    Forgot your password?
                  </a> implement this later
                  */}
                  
                </div>
                <Input id="password" type="password" value={formData.password} name="password" onChange={handleInputChange} required />
              </div>
              <Button type="submit"  className="w-full">
                {isPending?"Loading...":"Login"}
              </Button>
              <div className="text-center text-sm">
                Don&apos;t have an account?{" "}
                <Link to="/sign-up" className="underline underline-offset-4">
                  Sign up
                </Link>
              </div>
            </div>
          </form>
          <div className="relative md:block flex items-center justify-center border-l-2 border-[#ffffff16]">
            <Link to="/">
            <img
              src={logo}
              alt="CareerShepherds"
              className="absolute -top-10 inset-0 h-full w-full object-cover" />
            </Link>
          </div>
        </CardContent>
      </Card>
      <div
        className="text-balance text-center text-xs text-zinc-200 [&_span]:underline [&_span]:underline-offset-4 hover:[&_span]:text-primary">
        Need a quick demo?, Click to <span className="cursor-pointer" onClick={handleGuestSignin}>Sign-in with dummy data</span>.
      </div>
    </div>
  );
}
