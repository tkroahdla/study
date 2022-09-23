import type { NextPage } from "next";
import Button from "@components/button";
import Input from "@components/input";
import Layout from "@components/layout";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import useUser from "@libs/client/useUser";
import useMutation from "@libs/client/userMutation";

const EditProfile: NextPage = () => {
  const { register, handleSubmit, watch, setValue, setError } = useForm();
  const { user } = useUser();
  const [updateUser, { loading, data }] = useMutation(`/api/users/me`);
  const onValid = async ({ email, phone, name, avatar }: any) => {
    if (email === "" && phone === "" && name === "") {
      if (loading) return;
      return setError("formErrors", {
        message: "Email OR Phone number are required. You need to choose one.",
      });
    }
    if (avatar && avatar.length > 0 && user) {
      const { uploadURL } = await (await fetch(`/api/files`)).json();

      const form = new FormData();
      //현재는 1개만 선택할 수 있으니까 avatar[0]
      //파일이름이 3번째 인자
      form.append("file", avatar[0], user?.id + "");
      const {
        result: { id },
      } = await (
        await fetch(uploadURL, {
          method: "POST",
          body: form,
        })
      ).json();

      updateUser({
        email,
        phone,
        name,
        avatarId: id,
      });
    } else {
      updateUser({
        email,
        phone,
        name,
      });
    }
    console.log("누름");
    console.log(email, phone, name, avatar);
  };
  const [avatarPreview, setAvatarPreview] = useState("");
  const avatar = watch("avatar");

  useEffect(() => {
    if (avatar && avatar.length > 0) {
      const file = avatar[0];
      console.log(avatar);
      setAvatarPreview(URL.createObjectURL(file));
    }
  }, [avatar]);

  return (
    <Layout canGoBack title="Edit Profile">
      <form onSubmit={handleSubmit(onValid)} className="space-y-4 py-10 px-4">
        <div className="flex items-center space-x-3">
          {avatarPreview ? (
            <img
              src={avatarPreview}
              className="h-14 w-14 rounded-full bg-slate-500"
            />
          ) : (
            <div className="h-14 w-14 rounded-full bg-slate-500" />
          )}
          <label
            htmlFor="picture"
            className="cursor-pointer rounded-md border border-gray-300 py-2 px-3 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
          >
            Change
            <input
              {...register("avatar")}
              id="picture"
              type="file"
              className="hidden"
              accept="image/*"
            />
          </label>
        </div>
        <Input
          register={register("name")}
          required
          label="name"
          name="name"
          type="text"
          kind="text"
        />
        <Input
          register={register("email")}
          required
          label="Email address"
          name="email"
          type="email"
        />
        <Input
          register={register("phone")}
          required
          label="Phone number"
          name="phone"
          type="number"
          kind="phone"
        />
        <Button text="Update profile" />
      </form>
    </Layout>
  );
};

export default EditProfile;
