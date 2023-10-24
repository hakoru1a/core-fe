import ProtoTypes from "prop-types";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useAuth } from "../../hooks/useAuth";
import { RootState } from "../../store";
import { Comment } from "../../types/comment.type";
import ReviewCardV3 from "../Cards/ReviewCardV3";
import CommentForm from "../Form/CommentForm";
import { useMutation } from "@tanstack/react-query";
import commentApi from "../../apis/comment.api";
import { toast } from "react-toastify";
function PropertyReview({ isActive }: any) {
  const user = useAuth();
  const currentProperty = useSelector((state: RootState) => state.property);
  const [comments, setComments] = useState<Comment[]>(
    currentProperty?.comments || []
  );
  const { mutate } = useMutation({
    mutationFn: (c: Comment) => commentApi.addComment(c, currentProperty?.id),
    onSuccess: () => {
      toast.success("Bình luận thành công");
    },
  });
  const handleAddComment = (comment: string) => {
    const c: Comment = {
      comment: comment,
      customer: user,
      property: currentProperty?.id,
    };

    mutate(c);
    setComments([...comments, c]);
  };
  return (
    <div
      className={`tab-pane fade ${isActive && "show active"}`}
      id="homec-pd-tab5"
      role="tabpanel"
    >
      <div className="homec-pdetails-tab__inner">
        <div className="homec-pdetails-tab--review">
          {comments?.map((c: Comment) => {
            return (
              <ReviewCardV3
                rating={0}
                time=""
                text={
                  c.comment ||
                  "“There are many variations of passages of Lorem Ipsum available, in majority have into the find end to suffered.”"
                }
                authorName={c.customer?.fullname || "Arnold Burner"}
                authorPosition=""
                authorImg={c.customer?.avatar || "https://placehold.co/64x64"}
              />
            );
          })}
        </div>
        {!user?.id !== currentProperty?.customer.id && (
          <CommentForm handleAddComment={handleAddComment} />
        )}
      </div>
    </div>
  );
}

PropertyReview.propTypes = {
  isActive: ProtoTypes.bool.isRequired,
};

export default PropertyReview;
