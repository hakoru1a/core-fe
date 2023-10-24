import { useMutation, useQuery } from "@tanstack/react-query";
import ProtoTypes from "prop-types";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import paymentApi from "../../apis/payment.api";
import propertyApi from "../../apis/property.api";
import userApi from "../../apis/user.api";
import { useAuth } from "../../hooks/useAuth";
import useQueryParams from "../../hooks/useQueryParams";
import { setGlobalUser } from "../../redux/slice/user.slice";
import { socket } from "../../socket";
import { BookingAppointmentRequest } from "../../types/appointment";
import { setProfileToLS } from "../../utils/auth";
import {
  convertTrueTime,
  getCurrentDataFromLS,
  setCurrentDataToLS,
} from "../../utils/utils";
import Preloader from "../Loader";

interface Props {
  image: string;
  name: string;
  position: string;
}
let hasMutated = false;
function PropertyAgentsV2({ image, name, position }: Props) {
  const user = useAuth();
  const { id } = useParams();
  const [input, setInput] = useState<BookingAppointmentRequest>({});
  const [isSubmit, setIsSubmit] = useState<boolean>(false);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput({
      ...input,
      property: Number(id),
      appointmentDate: convertTrueTime(e.target.value),
    });
  };
  useQuery({
    queryKey: ["payment", user.id, input?.appointmentDate, input.property],
    queryFn: () =>
      paymentApi.createUrlBooking({
        ...input,
        customer: Number(user.id),
        property: Number(id),
      }),
    enabled: isSubmit && Object.keys(input).length > 0,
    onSuccess: (data) => {
      if (data?.data.data) {
        // Chuyển hướng trang hiện tại đến URL mới
        setCurrentDataToLS({
          property: property?.data.data,
          customer: {
            fullname: user?.fullname,
          },
          appointmentDate: input.appointmentDate,
        });
        window.location.href = data?.data.data || window.location.href;
      }
    },
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const params = useQueryParams();
  const { mutate, isLoading } = useMutation({
    mutationFn: (myPayment: BookingAppointmentRequest) =>
      paymentApi.createPaymentForBooking(myPayment),
    onSuccess: async () => {
      const { data } = await userApi.getCurrentUser();
      handleNotifyNewAppointment();
      setProfileToLS(data.data);
      dispatch(setGlobalUser(data.data));
      toast.success("Đặt lịch thành công");
      navigate("/dashboard");
    },
  });
  // Sử dụng biến flag để kiểm tra xem đã gọi mutate hay chưa

  if (Object.keys(params).length > 0) {
    const myBill = params?.vnp_OrderInfo?.split("-");
    if (myBill) {
      const myPayment: BookingAppointmentRequest = {
        appointmentDate: Number(myBill[1] || 0),
        customer: Number(myBill[2] || 0),
        property: Number(myBill[3] || 0),
      };
      if (
        myPayment.customer !== 0 &&
        myPayment.appointmentDate !== 0 &&
        myPayment.property !== 0 &&
        !hasMutated
      ) {
        mutate(myPayment);
        hasMutated = true; // Đánh dấu rằng đã gọi mutate
      }
    }
  }
  const { isFetching, data: property } = useQuery({
    queryKey: ["property", id, params],
    queryFn: () => propertyApi.getDetailPropery(Number(id)),
    enabled: !!id,
  });

  const handleNotifyNewAppointment = () => {
    const dataEmit = getCurrentDataFromLS();
    socket.emit("push-notify-new-appointment", dataEmit);
  };
  if (isLoading || isFetching) return <Preloader />;

  return (
    <div className="col-lg-4 col-12">
      {/*  Property Agent Card  */}
      <div
        className="homec-property-ag homec-property-ag--side homec-bg-cover"
        style={{ backgroundImage: "url('/img/property-ag-bg.svg')" }}
      >
        <h3 className="homec-property-ag__title">Booking appointment now !</h3>
        {/*  Property Profile  */}
        {/* End Property Profile  */}
        <form
          onSubmit={(e) => e.preventDefault()}
          className="homec-property-ag__form"
        >
          <div className="form-group">
            <input
              type="datetime-local"
              onChange={(e) => {
                handleChange(e);
              }}
            />
          </div>
        </form>
        <button
          type="submit"
          className="homec-btn homec-btn__second homec-property-ag__button"
          style={{ zIndex: "0" }}
          onClick={() => {
            if (Object.keys(input).length === 0) {
              toast.error("Bạn chưa chọn ngày hẹn");
            } else setIsSubmit(true);
          }}
        >
          <span>Setup Appointment</span>
        </button>
      </div>

      {/* End Property Agent Card */}
    </div>
  );
}

PropertyAgentsV2.propTypes = {
  image: ProtoTypes.string.isRequired,
  name: ProtoTypes.string.isRequired,
  position: ProtoTypes.string.isRequired,
};

export default PropertyAgentsV2;
