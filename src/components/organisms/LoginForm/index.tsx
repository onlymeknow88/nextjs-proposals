import { Button, Input } from "@nextui-org/react";
import Link from "next/link";
import Cookies from "js-cookie";
import { setLogin } from "../../../services/auth";
import { useRouter } from "next/router";
import { useState } from "react";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e:any) => {
    e.preventDefault();
    const data = {
      email,
      password,
    };

    if (!email || !password) {
      alert("Email dan Password tidak boleh kosong");
    } else {
      const response = await setLogin(data);
      if (response.error) {
        alert(response.message);
      } else {
        alert("Login Berhasil");
        const token  = response.data.result.access_token;
        const user = response.data.result.user;
        const userBase64 = btoa(JSON.stringify(user));
        const tokenBase64 = btoa(token);
        Cookies.set("token", tokenBase64, { expires: 1 });
        Cookies.set("user", userBase64, { expires: 1 });
        router.push("/");
      }
    }
  };

  return (
    <form className="mt-6" onSubmit={handleSubmit}>
      <div className="mb-12 ">
        <Input
          key="outside"
          type="email"
          label="Email"
          labelPlacement="outside"
          placeholder="Enter your email"
          variant="bordered"
          radius="sm"
          size="md"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
      </div>
      <div className="mb-2">
        <Input
          key="outside"
          type="password"
          label="Password"
          labelPlacement="outside"
          placeholder="Enter your password"
          variant="bordered"
          radius="sm"
          size="md"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
      </div>
      <Link href="/forget" className="text-xs text-blue-600 hover:underline">
        Forget Password?
      </Link>
      <div className="mt-2">
        <Button className="w-full bg-success-400 text-md" type="submit">
          Login
        </Button>
      </div>
    </form>
  );
}
