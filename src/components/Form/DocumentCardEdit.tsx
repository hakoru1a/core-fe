import { Viewer, Worker } from "@react-pdf-viewer/core";
import { Document } from "../../types/property.type";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import propertyApi from "../../apis/property.api";
import { toast } from "react-toastify";
function DocumentCardEdit({ document }: { document: Document }) {
  const isLoading = false;
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: (id: number) => propertyApi.deleteDocument(id),
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
            <Viewer fileUrl={document.url || ""} />
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
        <button
          type="button"
          className="btn btn-danger"
          onClick={() => handleDelete(document.id || 0)}
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default DocumentCardEdit;
