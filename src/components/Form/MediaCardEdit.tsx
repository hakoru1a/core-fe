import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Media } from "../../types/property.type";
import "./custom.css";
import { toast } from "react-toastify";
import propertyApi from "../../apis/property.api";
interface Props {
  media: Media;
}
function MediaCardEdit({ media }: Props) {
  const url = media.url || "https://picsum.photos/seed/picsum/200/300 ";
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation({
    mutationFn: (id: number) => propertyApi.deleteMedia(id),
    onSuccess: () => {
      toast.success("Xoá thành công");
      queryClient.invalidateQueries({
        queryKey: ["property", "edit"],
        exact: true,
      });
    },
  });
  const handleDelete = (id: number) => {
    mutate(id);
  };
  return (
    <div className="col-md-4">
      <div className="card" style={{ width: "100%" }}>
        {isLoading ? (
          <button
            type="button"
            disabled
            style={{
              display: "block",
              width: "100%",
              height: "300px",
              color: "#fff",
              background: "#fff",
            }}
          >
            <span
              style={{
                width: "100px",
                height: "100px",
                color: "red",
              }}
              className="spinner-border spinner-border-sm"
              role="status"
              aria-hidden="true"
            ></span>
          </button>
        ) : (
          <img
            src={url}
            className="card-img-top"
            style={{
              width: "100%",
              height: "300px",
              objectFit: "cover",
              objectPosition: "center",
            }}
          />
        )}

        <div
          className="card-body "
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "20px",
          }}
        >
          <button
            type="button"
            className="btn btn-danger"
            onClick={() => handleDelete(media?.id || 0)}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default MediaCardEdit;
