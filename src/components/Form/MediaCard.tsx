import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import propertyApi from "../../apis/property.api";
import "./custom.css";
import { useState } from "react";
import { isFileImage } from "../../utils/utils";
function MediaCard({ media, setMedias, medias, propertyId }: any) {
  const url = URL.createObjectURL(media);
  const [isUpload, setIsUpload] = useState(false);
  const isOversize =
    media.size > (isFileImage(media) ? 10 * 1024 * 1024 : 20 * 1024 * 1024);
  const { mutate, isLoading } = useMutation({
    mutationFn: () => propertyApi.uploadMedia(media, propertyId),
    onSuccess: () => {
      toast.success("Upload media thành công");
      setIsUpload(true);
    },
  });
  const handleDelete = (id: string) => {
    const newMediasArray = medias.filter(
      (mediaItem: any) => mediaItem.name + mediaItem.lastModified !== id
    );
    setMedias(newMediasArray);
  };
  return (
    <div className="col-md-4">
      <div className="card" style={{ width: "100%" }}>
        {!isLoading ? (
          isFileImage(media) ? (
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
          ) : (
            <video
              style={{
                width: "100%",
                height: "300px",
                objectFit: "cover",
                objectPosition: "center",
              }}
              src={url}
              className="card-img-top"
              controls
            ></video>
          )
        ) : (
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
        )}

        <div
          className="card-body "
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "20px",
          }}
        >
          {!isUpload && !isOversize && (
            <>
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => mutate()}
              >
                Upload
              </button>
              <button
                onClick={() => handleDelete(media.name + media.lastModified)}
                type="button"
                className="btn btn-danger"
              >
                Delete
              </button>
            </>
          )}
        </div>
      </div>
      {isOversize && (
        <h6 style={{ color: "red", textAlign: "center" }}>File lớn hơn 10MB</h6>
      )}
    </div>
  );
}

export default MediaCard;
