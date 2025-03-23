'use client'
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";

type FormDataType = {
  email: string;
  password: string;
  companyNIP: string;
  companyName: string;
};

export default function Register() {
  const [formData, setFormData] = useState<FormDataType>({
    email: "",
    password: "",
    companyName: "",
    companyNIP: "",
  });


  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };


  const mutation = useMutation({
    mutationFn: async (formData: FormDataType) => {

      const response = await fetch("https://localhost:7015/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Form submission failed!");
      }
      return response.json();
    },
    onSuccess: () => {
      console.log("Form submitted successfully!");
      setFormData({ email: "", companyName: "", companyNIP: "", password: "" });
    },
    onError: (error) => {
      console.error("Error:", error);

    },
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    mutation.mutateAsync(formData);
  };

  return (
    <div className="grid grid-cols-2 bg-stone">

      {/* Left Side */}
      <div className="flex flex-col justify-center items-center">
 
      </div>

      {/* Right Side */}
      <div className="flex flex-col justify-center items-center p-6">
        <form onSubmit={handleSubmit} className="w-80 p-6 rounded-lg shadow-md bg-white">
          <h2 className="text-xl font-semibold text-center mb-4">Register</h2>

          <div className="flex flex-col gap-3">
            <label className="flex flex-col">
              <span>Email</span>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="border p-2 rounded-md"
                required
              />
            </label>

            <label className="flex flex-col">
              <span>Password</span>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="border p-2 rounded-md"
                required
              />
            </label>

            <label className="flex flex-col">
              <span>Company NIP</span>
              <input
                type="text"
                name="companyNIP"
                value={formData.companyNIP}
                onChange={handleChange}
                className="border p-2 rounded-md"
                required
              />
            </label>

            <label className="flex flex-col">
              <span>Company Name</span>
              <input
                type="text"
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
                className="border p-2 rounded-md"
                required
              />
            </label>

            <button
              type="submit"
              className="bg-red-400 text-white p-2 rounded-md hover:bg-red-500"
              disabled={mutation.isPending}
            >
              {mutation.isPending ? "Registering..." : "Register"}
            </button>

            {mutation.isError && (
              <p className="text-red-500 text-sm">{(mutation.error as Error).message}</p>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
