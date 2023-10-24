import * as yup from "yup";

function testPriceMinMax(this: yup.TestContext<yup.AnyObject>) {
  const { price_max, price_min } = this.parent as {
    price_min: string;
    price_max: string;
  };
  if (price_min !== "" && price_max !== "") {
    return Number(price_max) >= Number(price_min);
  }
  return price_min !== "" || price_max !== "";
}

const handleConfirmPasswordYup = (refString: string) => {
  return yup
    .string()
    .required("Nhập lại password là bắt buộc")
    .min(6, "Độ dài từ 6 - 160 ký tự")
    .max(160, "Độ dài từ 6 - 160 ký tự")
    .oneOf([yup.ref(refString)], "Nhập lại password không khớp");
};

export const schema = yup.object({
  username: yup
    .string()
    .required("Username là bắt buộc")
    .min(5, "Độ dài từ 5 - 160 ký tự")
    .max(160, "Độ dài từ 5 - 160 ký tự"),
  email: yup
    .string()
    .required("Email là bắt buộc")
    .email("Email không đúng định dạng")
    .min(5, "Độ dài từ 5 - 160 ký tự")
    .max(160, "Độ dài từ 5 - 160 ký tự"),
  previousPassword: yup
    .string()
    .required("Password là bắt buộc")
    .min(6, "Độ dài từ 6 - 160 ký tự")
    .max(160, "Độ dài từ 6 - 160 ký tự"),
  password: yup
    .string()
    .required("Password là bắt buộc")
    .min(6, "Độ dài từ 6 - 160 ký tự")
    .max(160, "Độ dài từ 6 - 160 ký tự"),
  confirm_password: handleConfirmPasswordYup("password"),
  price_min: yup.string().test({
    name: "price-not-allowed",
    message: "Giá không phù hợp",
    test: testPriceMinMax,
  }),
  price_max: yup.string().test({
    name: "price-not-allowed",
    message: "Giá không phù hợp",
    test: testPriceMinMax,
  }),
});

export const userSchema = yup.object({
  fullname: yup
    .string()
    .required("Fullname là bắt buộc")
    .max(160, "Độ dài tối đa là 160 ký tự"),
  phone: yup
    .string()
    .required("Phone là bắt buộc")
    .matches(
      /(84|0[3|5|7|8|9])+([0-9]{8})\b/g,
      "Định dạng số điện thoại không đúng"
    )
    .max(20, "Độ dài tối đa là 20 ký tự"),
  address: yup.string().max(160, "Độ dài tối đa là 160 ký tự"),
  avatar: yup.string().max(1000, "Độ dài tối đa là 1000 ký tự"),
  date_of_birth: yup.date().max(new Date(), "Hãy chọn một ngày trong quá khứ"),
  password: schema.fields["password"] as yup.StringSchema<
    string | undefined,
    yup.AnyObject,
    undefined,
    ""
  >,
  new_password: schema.fields["password"] as yup.StringSchema<
    string | undefined,
    yup.AnyObject,
    undefined,
    ""
  >,
  confirm_password: handleConfirmPasswordYup(
    "new_password"
  ) as yup.StringSchema<string | undefined, yup.AnyObject, undefined, "">,
});

export const propertySchema = yup.object({
  propertyName: yup
    .string()
    .required("Property name là bắt buộc")
    .max(160, "Độ dài tối đa là 160 ký tự"),
  description: yup.string(),
  propertyType: yup.string().required("Giá tiền của property là bắt buộc"),
  area: yup.string().required("Diện tích bắt buộc"),
  bed: yup.string().required("Số phòng ngủ bắt buộc"),
  bath: yup.string().required("Số phòng nhà vệ sinh bắt buộc"),
  garage: yup.string().required("Số bãi đổ bắt buộc"),
  kitchen: yup.string().required("Số nhà bếp bắt buộc"),
  price: yup.string().required("Giá tiền của property là bắt buộc"),
  rentPeriod: yup.string().required("Khoảng thời gian thuê bắt buộc"),
});

export type UserSchema = yup.InferType<typeof userSchema>;
export type PropertySchema = yup.InferType<typeof propertySchema>;
export type Schema = yup.InferType<typeof schema>;
