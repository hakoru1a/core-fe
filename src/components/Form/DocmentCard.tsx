import { Viewer, Worker } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "react-toastify";
import propertyApi from "../../apis/property.api";
interface Props {
  doc: File;
  docs: File[];
  setDocuments: (newState: File[]) => void;
  propertyId: number;
}
function DocumentCard({ doc, setDocuments, docs, propertyId }: Props) {
  const url = URL.createObjectURL(doc);
  const [isUpload, setIsUpload] = useState(false);
  const isOversize = doc.size > 10 * 1024 * 1024;
  const { mutate, isLoading } = useMutation({
    mutationFn: () => propertyApi.uploadDocument(doc, propertyId),
    onSuccess: () => {
      toast.success("Upload media thành công");
      setIsUpload(true);
    },
  });
  const handleDelete = (id: string) => {
    const newMediasArray = docs.filter(
      (mediaItem: File) => mediaItem.name + mediaItem.lastModified !== id
    );
    setDocuments(newMediasArray);
  };
  return (
    <div className="card">
      {isLoading ? (
        <button
          type="button"
          disabled
          style={{
            display: "block",
            width: "100%",
            height: "100%",
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
        <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
          <div
            style={{
              border: "1px solid rgba(0, 0, 0, 0.3)",
              height: "750px",
            }}
          >
            <Viewer fileUrl={url} />
          </div>
        </Worker>
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
              type="button"
              className="btn btn-danger"
              onClick={() => handleDelete(doc.name + doc.lastModified)}
            >
              Delete
            </button>
          </>
        )}
      </div>
      {isOversize && (
        <h6 style={{ color: "red", textAlign: "center" }}>File lớn hơn 10MB</h6>
      )}
    </div>
  );
}

export default DocumentCard;
