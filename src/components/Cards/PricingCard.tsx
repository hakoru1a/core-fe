import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import paymentApi from "../../apis/payment.api";
import { useAuth } from "../../hooks/useAuth";
import { Bill } from "../../types/package.type";

interface Props {
  id?: number;
  features?: { name: string; value: number | string | boolean }[];
  title: string;
  price: string;
  isActive?: boolean;
}
function PricingCard({ id, features, title, price, isActive }: Props) {
  const [bill, setBill] = useState<Bill>({});
  const user = useAuth();

  const handleBuyTurn = () => {
    const myBill: Bill = {
      packageId: id,
      quantity: 1,
      customerId: Number(user.id || -1),
    };
    setBill(myBill);
  };
  useQuery({
    queryKey: ["payment", user.id, bill?.packageId],
    queryFn: () => paymentApi.createUrlByTurn(bill),
    enabled: Object.keys(bill).length > 0,
    onSuccess: (data) => {
      if (data?.data.data) {
        console.log(data?.data.data);
        const newWindow = window.open(data?.data.data, "_blank");
        newWindow?.focus(); // Tự động đặt trọng tâm vào cửa sổ mới (tuỳ chọn)
      }
    },
  });
  return (
    <div
      className="col-lg-4 col-md-4 col-12 mg-top-30"
      data-aos="fade-up"
      data-aos-delay="400"
    >
      <div className={`homec-psingle ${isActive && "homec-psingle__active"}`}>
        <div className="homec-psingle__head">
          <h4 className="homec-psingle__title">{title}</h4>
          <div className="homec-psingle__amount">
            <span className="homec-psingle__currency">$</span>
            <span style={{ fontSize: "40px" }}>{price}</span>
            {/* <span>/{period}</span> */}
          </div>
        </div>
        <div className="homec-psingle__body">
          <ul className="homec-psingle__list">
            {features &&
              features?.map((feature: any, index: number) => (
                <li key={feature.name + index}>
                  <span
                    className={`homec-psingle__icon ${
                      feature.value ? "homec-check-color" : "homec-remove-color"
                    } `}
                  >
                    <i
                      className={`fas ${
                        feature.value ? "fa-check" : "fa-remove"
                      } `}
                    ></i>
                  </span>
                  {feature.value && feature.value} {feature.name}
                </li>
              ))}
          </ul>
          <div className="homec-psingle__button">
            <a
              className="homec-btn homec-btn__thrid"
              onClick={() => handleBuyTurn()}
            >
              <span>Apply for Plan Now</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PricingCard;

// http://localhost:5173/pricing?vnp_Amount=200000000&vnp_BankCode=NCB&vnp_BankTranNo=VNP14135827&vnp_CardType=ATM&vnp_OrderInfo=Thanh+toan+don+hang%3A27367621%0AMua+1+G%3FI+1&vnp_PayDate=20231008200443&vnp_ResponseCode=00&vnp_TmnCode=H7TDV15V&vnp_TransactionNo=14135827&vnp_TransactionStatus=00&vnp_TxnRef=27367621&vnp_SecureHash=c531310c3944d92d945d44f44dfe4d6c5a07e68837c4a6e593a6678c9638a9f42ca012571a60110c2de2d6cf2b58f07f192793d2e3383ec8565b50ed87af5014
