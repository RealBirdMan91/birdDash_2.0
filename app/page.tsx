import LoginForm from "@/components/auth/LoginForm";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Image from "next/image";

export default function LoginPage() {
  return (
    <main className="bg-[#1a1c1e] h-full flex flex-col items-center justify-center p-4">
      <Card className="bg-[#25282c] p-2 max-w-4xl w-full  grid md:grid-cols-2 md:gap-6 border-none">
        <div className="flex flex-col justify-between">
          <CardHeader>
            <h1 className="text-3xl font-bold mb-4 text-white">
              Welcome to our page
            </h1>
            <p className="text-neutral-400 mb-4">
              Please enter your email to receive a magic link for login
            </p>
          </CardHeader>
          <CardContent>
            <LoginForm />
          </CardContent>
        </div>
        <div className="relative h-[400px] hidden md:block">
          <Image
            alt="Abstract Art"
            className="rounded-lg object-cover h-full w-full "
            fill={true}
            src="/assets/login-image.png"
          />
          <div className="absolute inset-0 bg-[#2d3134] bg-opacity-35 p-4 rounded-lg flex flex-col justify-end">
            <h2 className="text-xl font-semibold mb-4 text-white">BirdDash</h2>
            <p className="text-gray-300 mb-2">
              Welcome to our design platform! Unlock your creativity with a
              seamless and intuitive login experience – where innovative design
              begins.
            </p>
            <p className="text-gray-400">Rachel Pen</p>
            <p className="text-gray-500 text-sm">Founder & CEO</p>
          </div>
        </div>
      </Card>
    </main>
  );
}
