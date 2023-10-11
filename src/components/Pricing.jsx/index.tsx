import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import packageApi from "../../apis/package.api";
import paymentApi from "../../apis/payment.api";
import useQueryParams from "../../hooks/useQueryParams";
import FaqSection from "../../pages/Faq/FaqSection";
import { formatCurrency } from "../../utils/utils";
import Breadcrumbs from "../Breadcrumbs";
import HistoryLinks from "../Breadcrumbs/HistoryLinks";
import GoTopBtn from "../Button/GoTopBtn";
import PricingCard from "../Cards/PricingCard";
import DownloadApp from "../DownloadApp";
import Footer from "../Footer";
import Header from "../Header";
import Preloader from "../Loader";
import { Bill } from "../../types/package.type";
import { setProfileToLS } from "../../utils/auth";
import { setGlobalUser } from "../../redux/slice/user.slice";
import { useDispatch } from "react-redux";
import userApi from "../../apis/user.api";
import { useNavigate } from "react-router-dom";
let hasMutated = false;

function Pricing() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data, isFetching } = useQuery({
    queryFn: () => packageApi.getPackages(),
    queryKey: ["prices"],
  });
  const params = useQueryParams();
  const { mutate, isLoading } = useMutation({
    mutationFn: (myPayment: Bill) =>
      paymentApi.createPaymentForByTurn(myPayment),
    onSuccess: async (res) => {
      console.log(res);
      const { data } = await userApi.getCurrentUser();
      setProfileToLS(data.data);
      dispatch(setGlobalUser(data.data));
      toast.success("Mua gói thành công");
      navigate("/dashboard");
    },
    onError: (error) => {
      console.log(error);
      toast.error("Mua gói thất bại ");
    },
  });
  // Sử dụng biến flag để kiểm tra xem đã gọi mutate hay chưa

  if (Object.keys(params).length > 0) {
    const myBill = params?.vnp_OrderInfo?.split("-");
    if (myBill) {
      const myPayment: Bill = {
        quantity: Number(params?.vnp_OrderInfo?.split("-")[1] || 0),
        customerId: Number(params?.vnp_OrderInfo?.split("-")[2] || 0),
        packageId: Number(params?.vnp_OrderInfo?.split("-")[3] || 0),
      };

      if (
        myPayment.customerId !== 0 &&
        myPayment.packageId !== 0 &&
        myPayment.quantity !== 0 &&
        !hasMutated
      ) {
        mutate(myPayment);
        console.log("mutate");
        hasMutated = true; // Đánh dấu rằng đã gọi mutate
      }
      // console.log(myPayment);
    }
  }
  let component = undefined;
  if (isLoading || isFetching) {
    component = <Preloader />;
  } else {
    component = (
      <>
        <Header />
        <Breadcrumbs title="Our Package" titlePosition="bottom">
          <HistoryLinks link="/home" text="Home" />
          <HistoryLinks link="/pricing" text="Our Package" isActive={true} />
        </Breadcrumbs>
        <section className="pd-top-90 pd-btm-120">
          <div className="container">
            <div className="row">
              {data?.data.data.content?.map((item, idx) => {
                return (
                  <PricingCard
                    id={item.id}
                    key={item?.packageName || `Gói ${idx + 1}`}
                    title={item?.packageName || `Gói ${idx + 1}`}
                    price={`${formatCurrency(Number(item.price))}`}
                    isActive={(idx + 1) % 2 === 0}
                    features={[
                      { name: "Property Submission", value: item.times || 0 },
                      // { name: "Featured Property", value: false },
                      // { name: "Top Property", value: false },
                      // { name: "Urgent Property", value: false },
                    ]}
                  />
                );
              })}
            </div>
          </div>
        </section>
        <FaqSection />
        <DownloadApp />
        <Footer />
        <GoTopBtn />
      </>
    );
  }
  return component;
}

export default Pricing;
