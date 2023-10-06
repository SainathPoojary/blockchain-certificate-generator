import React, { useState } from "react";
import { Button, Input } from "../components";
import { useUserContext } from "../context/UserContext";

export default function Generator() {
  const [name, setName] = useState("");
  const [course, setCourse] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const { createCertificate } = useUserContext();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setLoading(true);
      const url = await createCertificate(
        name.trim(),
        email.trim(),
        course.trim()
      );
      setName("");
      setCourse("");
      setEmail("");
      setLoading(false);
      window.open(`http://localhost:4000/uploads/${url}`);
    } catch (e) {
      console.log(e);
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-900 flex-[4] p-10 text-white h-full w-full flex justify-center items-center">
      <form
        className="flex flex-col items-center space-y-4 w-1/2"
        onSubmit={handleSubmit}
      >
        <Input
          type="text"
          placeholder={"Name"}
          value={name}
          onChange={(event) => setName(event.target.value)}
          required={true}
          className="bg-black"
        />
        <Input
          type="email"
          placeholder={"Email"}
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required={true}
        />
        <Input
          type={"text"}
          placeholder={"Course"}
          value={course}
          onChange={(event) => setCourse(event.target.value)}
          required={true}
        />
        <Button text={"Generate"} loading={loading} />
      </form>
    </div>
  );
}
