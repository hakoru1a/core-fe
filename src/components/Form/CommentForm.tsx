import { useState } from "react";
import { toast } from "react-toastify";
function CommentForm({ handleAddComment }: any) {
  const [comment, setComment] = useState<string>("");
  return (
    <div className="col-12 d-flex justify-content-center mg-top-40">
      <div className="homec-comments-form homec-comments-form--reviews w-100">
        <h2 className="homec-comments-form__title m-0">Sent Review</h2>
        <div className="row">
          <div className="col-12">
            <div className="form-group homec-form-input">
              <textarea
                value={comment}
                className="ecom-wc__form-input"
                name="f_name"
                placeholder="Write Here"
                onChange={(e) => setComment(e.currentTarget.value)}
              ></textarea>
            </div>
          </div>
          <div className="col-12 d-flex justify-content-end mg-top-20">
            <button
              type="submit"
              className="homec-btn homec-btn__second"
              onClick={() => {
                if (comment === "") {
                  toast.error("Vui lòng nhập comment");
                } else {
                  handleAddComment(comment);
                  setComment("");
                }
              }}
            >
              <span>Submit Now</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CommentForm;
