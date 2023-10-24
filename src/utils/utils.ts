import axios, { AxiosError } from "axios";
import HttpStatusCode from "../constants/httpStatusCode";
import { ErrorResponse } from "../types/utils.type";
import config from "../constants/config";
import { useState } from "react";

export function isAxiosError<T>(error: unknown): error is AxiosError<T> {
  return axios.isAxiosError(error);
}

export function isAxiosUnprocessableEntityError<FormError>(
  error: unknown
): error is AxiosError<FormError> {
  return (
    isAxiosError(error) &&
    error.response?.status === HttpStatusCode.UnprocessableEntity
  );
}

export function isAxiosUnauthorizedError<UnauthorizedError>(
  error: unknown
): error is AxiosError<UnauthorizedError> {
  return (
    isAxiosError(error) &&
    error.response?.status === HttpStatusCode.Unauthorized
  );
}

export function isAxiosExpiredTokenError<UnauthorizedError>(
  error: unknown
): error is AxiosError<UnauthorizedError> {
  return (
    isAxiosUnauthorizedError<ErrorResponse<{ name: string; message: string }>>(
      error
    ) && error.response?.data?.data?.name === "EXPIRED_TOKEN"
  );
}

export function formatCurrency(currency: number) {
  return new Intl.NumberFormat("de-DE").format(currency);
}

export function formatNumberToSocialStyle(value: number) {
  return new Intl.NumberFormat("en", {
    notation: "compact",
    maximumFractionDigits: 1,
  })
    .format(value)
    .replace(".", ",")
    .toLowerCase();
}

export const rateSale = (original: number, sale: number) =>
  Math.round(((original - sale) / original) * 100) + "%";

const removeSpecialCharacter = (str: string) =>
  // eslint-disable-next-line no-useless-escape
  str.replace(
    /!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g,
    ""
  );

export const generateNameId = ({ name, id }: { name: string; id: string }) => {
  return removeSpecialCharacter(name).replace(/\s/g, "-") + `-i-${id}`;
};

export const getIdFromNameId = (nameId: string) => {
  const arr = nameId.split("-i-");
  return arr[arr.length - 1];
};

export const getAvatarUrl = (avatarName?: string) =>
  avatarName ? `${config.baseUrl}images/${avatarName}` : null;

export function convertNameToCode(name: string) {
  // Remove spaces and convert to lowercase
  const code = name.toLowerCase().replace(/\s/g, "_");
  return code;
}

export function useProvince() {
  const url = `https://provinces.open-api.vn/api/p`;
  const [provinces, setProvinces] = useState();
  axios.get(url).then((res) => setProvinces(res.data));
  return {
    provinces,
  };
}

export function useDistrict(provinceCode: string) {
  const url = `https://provinces.open-api.vn/api/p/${provinceCode}?depth=2`;
  const [districts, setDistricts] = useState();
  axios.get(url).then((res) => setDistricts(res.data));
  return {
    districts,
  };
}
export default function useWard(districtCode: string) {
  const url = `https://provinces.open-api.vn/api/d/${districtCode}?depth=2`;
  const [wards, setWards] = useState();
  axios.get(url).then((res) => setWards(res.data));
  return {
    wards,
  };
}

export const getUrlQuery = (params: any, page: number) => {
  params.page = String(page || 1);
  const stringParam = new URLSearchParams(params).toString();
  return `?${stringParam}`;
};

export const convertTrueTime = (time: string) => {
  // Chuỗi thời gian
  const dateTimeStr = time;

  // Tạo một đối tượng Date từ chuỗi
  const date = new Date(dateTimeStr);

  // Lấy thời gian epoch (số giây từ 1970-01-01T00:00:00Z)
  const epochSeconds = date.getTime() / 1000; // Chia cho 1000 để chuyển từ mili giây sang giây

  // Lấy phần thập phân (mili giây) và chuyển đổi nó thành phần thập phân thứ hai
  const fractionalSeconds = date.getMilliseconds() / 1000;

  // Tổng cộng hai giá trị để có được số dạng "1696572328.000000000"
  return epochSeconds + fractionalSeconds;
};

export function getNextMonday() {
  const today = new Date();
  const dayOfWeek = today.getDay(); // 0 for Sunday, 1 for Monday, ..., 6 for Saturday
  const daysUntilMonday = dayOfWeek === 0 ? 1 : 8 - dayOfWeek; // Calculate days until next Monday
  today.setDate(today.getDate() + daysUntilMonday); // Set the date to the next Monday

  // Get day, month, and year components
  const day = String(today.getDate()).padStart(2, "0");
  const month = String(today.getMonth() + 1).padStart(2, "0"); // Months are zero-based
  const year = today.getFullYear();

  return `${day}-${month}-${year}`;
}

export const getCurrentDataFromLS = () =>
  JSON.parse(localStorage.getItem("curr_data") || "");

export const setCurrentDataToLS = (data: any) => {
  localStorage.setItem("curr_data", JSON.stringify(data));
};

export const isFileImage = (file: File) => {
  return file && file["type"].split("/")[0] === "image";
};
