import axios from "axios";
import { socket } from "../../socket";
import "./style.css";
import { useState, useEffect } from "react";
import { useAuth } from "../../hooks/useAuth";
import { toast } from "react-toastify";
function Chat() {
  const user = useAuth();
  const [messages, setMessages] = useState<any>([]);
  const [value, setValue] = useState<string>("");
  socket.on("new-message-client", (message) => {
    // console.log(value);
    // axios
    //   .get(`http://localhost:5000/api/get-message/1/${user.id}/`)
    //   .then((res) => {
    //     setMessages(res.data);
    //   });
    setMessages([...messages, message]);
  });
  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/get-message/1/${user.id}/`)
      .then((res) => {
        setMessages(res.data);
      });
  }, [user.id]);
  const handleSendMessageToStaff = () => {
    if (value?.trim().length === 0) toast.error("Chưa nhập nội dung");
    else {
      const myMessage = {
        content: value,
        receiver: {
          id: 1,
          role: "STAFF",
        },
        sender: {
          id: user.id,
          role: "CUSTOMER",
        },
      };
      setMessages([...messages, myMessage]);
      socket.emit("send-message-staff", myMessage);
      // clear input
      setValue("");
    }
  };

  return (
    <section style={{ backgroundColor: "#eee" }}>
      <div className="container py-5">
        <div className="row d-flex justify-content-center">
          <div className="col-md-8 col-lg-6 col-xl-4">
            <div className="card" id="chat1" style={{ borderRadius: 15 }}>
              <div
                className="card-header d-flex justify-content-between align-items-center p-3 bg-info text-white border-bottom-0"
                style={{ borderTopLeftRadius: 15, borderTopRightRadius: 15 }}
              >
                <i className="fas fa-angle-left" />
                <p className="mb-0 fw-bold">Live chat</p>
                <i className="fas fa-times" />
              </div>
              <div className="card-body">
                {messages.map((item: any, index: number) => {
                  if (
                    item.sender.id === user.id &&
                    item.sender.role === "CUSTOMER"
                  ) {
                    return <MyMessage key={index} content={item.content} />;
                  } else
                    return <StaffMessage key={index} content={item.content} />;
                })}
                <div className="form-outline">
                  <textarea
                    className="form-control"
                    id="textAreaExample"
                    rows={4}
                    defaultValue={""}
                    value={value}
                    onChange={(e) => setValue(e.currentTarget.value)}
                    onKeyDown={(e) => {
                      if (e.keyCode === 13) {
                        handleSendMessageToStaff();
                      }
                    }}
                  />
                  <label className="form-label" htmlFor="textAreaExample">
                    Type your message
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function MyMessage({ content }: any) {
  return (
    <div className="d-flex flex-row justify-content-start mb-4">
      <img
        src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp"
        alt="avatar 1"
        style={{ width: 45, height: "100%" }}
      />
      <div
        className="p-3 ms-3"
        style={{
          borderRadius: 15,
          backgroundColor: "rgba(57, 192, 237,.2)",
        }}
      >
        <p className="small mb-0">{content}</p>
      </div>
    </div>
  );
}
function StaffMessage({ content }: any) {
  return (
    <div className="d-flex flex-row justify-content-end mb-4">
      <div
        className="p-3 me-3 border"
        style={{ borderRadius: 15, backgroundColor: "#fbfbfb" }}
      >
        <p className="small mb-0">{content}</p>
      </div>
      <img
        src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava2-bg.webp"
        alt="avatar 1"
        style={{ width: 45, height: "100%" }}
      />
    </div>
  );
}

export default Chat;
