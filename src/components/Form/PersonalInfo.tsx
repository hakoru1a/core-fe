import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import userApi from "../../apis/user.api";
import PropertyTextInputV2 from "../../components/Form/PropertyTextInputV2";
import { useAuth } from "../../hooks/useAuth";
import { setGlobalUser } from "../../redux/slice/user.slice";
import { User } from "../../types/user.type";
import { setProfileToLS } from "../../utils/auth";
import { Schema, UserSchema, schema, userSchema } from "../../utils/rules";
import Preloader from "../Loader";
import PropertyTextAreaV3 from "./PropertyTextAreaV3";
export type FormData = Pick<Schema, "email"> &
  Pick<UserSchema, "fullname" | "phone" | "address">;
const registerSchema = schema.pick(["email"]);
const us = userSchema.pick(["fullname", "phone", "address"]);
const combinedSchema = registerSchema.concat(us);

interface Props {
  toggleModal: () => void;
}

function PersonalInfo({ toggleModal }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(combinedSchema),
  });
  const user = useAuth();
  const dispatch = useDispatch();
  const { mutate, isLoading } = useMutation({
    mutationFn: (user: User) => userApi.updateCurrentUser(user),
    onSuccess: (res) => {
      const { data } = res;
      setProfileToLS(data.data);
      dispatch(setGlobalUser(data.data));
      toggleModal();
      toast.success("Update profile thành công");
    },
  });
  const onSubmit = handleSubmit((data) => {
    const updateData = {
      ...user,
      ...data,
    };
    mutate(updateData);
    // fetch("http://localhost:8080/api/customers/update-profile/", {
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   method: "put",
    //   body: JSON.stringify(updateData),
    // });
  });
  if (isLoading) {
    return <Preloader />;
  }
  return (
    <form
      className="ecom-wc__form-main p-0"
      action="index.html"
      method="post"
      onSubmit={onSubmit}
      noValidate
    >
      <div className="row">
        <PropertyTextInputV2
          title="Address*"
          placeholder="Ví dụ: 371 Huỳnh Tấn Phát, Quận 7, TPHCM"
          margin="-10px"
          name="address"
          register={register}
          type="text"
          errorMessage={errors.address?.message}
          value={user?.address}
        />
        <PropertyTextInputV2
          size="col-lg-6 col-md-6"
          title="Email*"
          placeholder="Jhon@gmail.com"
          margin="-10px"
          name="email"
          register={register}
          type="email"
          errorMessage={errors.email?.message}
          value={user?.email}
        />
        <PropertyTextInputV2
          size="col-lg-6 col-md-6"
          title="Fullname*"
          placeholder="Jhon"
          margin="-10px"
          name="fullname"
          register={register}
          type="text"
          errorMessage={errors.fullname?.message}
          value={user?.fullname}
        />
        <PropertyTextInputV2
          title="Phone*"
          placeholder="03344xxxx"
          margin="-10px"
          name="phone"
          register={register}
          type="text"
          errorMessage={errors.phone?.message}
          value={user?.phone}
        />
        <PropertyTextInputV2
          // size="col-lg-6 col-md-6"
          title="Occupation*"
          placeholder="Nghề nghiệp"
          margin="-10px"
          name="occupation"
          register={register}
          type="text"
          errorMessage={errors.fullname?.message}
          value={user?.occupation}
        />

        <PropertyTextAreaV3
          title="About me*"
          name="about"
          register={register}
        />
        {/* <PropertyTextInput
          title="About me*"
          placeholder=""
          margin="-10px"
          name="about"
          register={register}
          type="text"
          errorMessage={errors.phone?.message}
        /> */}
        {/* <PropertyTextInput
          size="col-lg-6 col-md-6"
          title="First Name*"
          name="firstName"
          value={input.firstName}
          handleChange={(e: any) => handleChange(e)}
          placeholder="Demo Name"
        />
        <PropertyTextInput
          size="col-lg-6 col-md-6"
          title="Last Name*"
          name="lastName"
          value={input.lastName}
          handleChange={(e: any) => handleChange(e)}
          placeholder="Demo Name"
        />
        <PropertyTextInput
          title="Phone Number*"
          name="phoneNumber"
          value={input.phoneNumber}
          handleChange={(e: any) => handleChange(e)}
          placeholder="Phone Number"
        />
        <PropertyTextInput
          title="Email Address*"
          name="emailAddress"
          value={input.emailAddress}
          handleChange={(e: any) => handleChange(e)}
          placeholder="Email Address"
        />
        <PropertyTextInput
          title="Location*"
          name="location"
          value={input.location}
          handleChange={(e: any) => handleChange(e)}
          placeholder="Your Location"
        />
        <PropertyTextAreaV2
          title="About Text*"
          value={input.aboutText}
          handleChange={handleChange}
          name="aboutText"
          placeholder="Type here"
          sizeFull={true}
        /> */}
        <h4 className="homec-modal-form__middle">Social Link</h4>
        <div className="row">
          {/* <PropertyTextInput
            size="col-lg-6 col-md-6"
            title="Facebook*"
            name="facebook"
            value={input.facebook}
            handleChange={(e: any) => handleChange(e)}
            placeholder="Facebook Link"
          />
          <PropertyTextInput
            size="col-lg-6 col-md-6"
            title="Twitter*"
            name="twitter"
            value={input.twitter}
            handleChange={(e: any) => handleChange(e)}
            placeholder="Twitter Link"
          />
          <PropertyTextInput
            size="col-lg-6 col-md-6"
            title="Instagram*"
            name="instagram"
            value={input.instagram}
            handleChange={(e: any) => handleChange(e)}
            placeholder="Instagram Link"
          />
          <PropertyTextInput
            size="col-lg-6 col-md-6"
            title="Linkedin*"
            name="linkedin"
            value={input.linkedin}
            handleChange={(e: any) => handleChange(e)}
            placeholder="Linkedin Link"
          /> */}
        </div>
      </div>
      {/* Form Group  */}
      <div className="form-group form-mg-top25">
        <div className="ecom-wc__button ecom-wc__button--bottom">
          <button className="homec-btn homec-btn__second" type="submit">
            <span>Update Profile</span>
          </button>
        </div>
      </div>
    </form>
  );
}

export default PersonalInfo;
