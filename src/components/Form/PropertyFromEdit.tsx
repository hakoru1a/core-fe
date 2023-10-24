import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import "react-multi-carousel/lib/styles.css";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import propertyApi from "../../apis/property.api";
import { propertyType } from "../../data/property";
import { useAuth } from "../../hooks/useAuth";
import { RootState } from "../../store";
import { Document, Media, Property } from "../../types/property.type";
import { PropertySchema, propertySchema } from "../../utils/rules";
import Preloader from "../Loader";
import DocumentCardEdit from "./DocumentCardEdit";
import MediaCard from "./MediaCard";
import MediaCardEdit from "./MediaCardEdit";
import PropertyTextInputV2 from "./PropertyTextInputV2";
import DocumentCard from "./DocmentCard";
// import Places from "./SimpleMap";

type FormData = PropertySchema;
const schema = propertySchema;
function PropertyFromEdit() {
  const [property, setProperty] = useState<Property | any>({});
  const [medias, setMedias] = useState<any>([]);
  const [documents, setDocuments] = useState<File[]>([]);

  const [description, setDescription] = useState<string>("");
  const { id } = useParams();
  const { isFetching } = useQuery({
    queryFn: () => propertyApi.getPropertyById(Number(id)),
    queryKey: ["property", "edit"],
    onSuccess: (res) => {
      setProperty(res.data.data);
    },
    enabled: id !== undefined,
    cacheTime: 0,
  });
  const [state, setState] = useState<number>(1);

  const user = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      propertyName: property.propertyName,
    },
  });
  const { mutate, isLoading } = useMutation({
    mutationFn: (data) => propertyApi.updateProperty(data),
    onSuccess: (res) => {
      const p = res.data.data;
      setProperty(p);
      setDescription(p?.description || "");
      toast.success("Updare property thành công chờ duyệt nhà");
    },
  });
  const { address, lat, lng } = useSelector(
    (state: RootState) => state.location
  );
  console.log(errors);

  const onSubmit = handleSubmit((data) => {
    const mySubmit = {
      id: property?.id,
      purpose: property?.purpose,
      ...data,
      aminities: property?.aminities.map((item) => item.name) || [],
      description: description,
      latitude: lat || property?.latitude || "106.6296638",
      longitude: lng || property?.longitude || "10.8230989",
      address: address || property?.address || "TPHCM",
      customer: user.id,
    };
    mutate(mySubmit);
  });
  if (isLoading || isFetching) {
    return <Preloader />;
  }
  return (
    <section className="pd-top-80 pd-btm-80">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <form action="#" onSubmit={onSubmit}>
              <div className="homec-submit-form">
                <h4 className="homec-submit-form__title">
                  Property Information
                </h4>
                <div className="homec-submit-form__inner">
                  <div className="row">
                    <PropertyTextInputV2
                      title="Property name*"
                      placeholder="Ví dụ: Toà nhà A"
                      name="propertyName"
                      register={register}
                      type="text"
                      errorMessage={errors.propertyName?.message}
                      value={property?.propertyName}
                    />
                    {property?.purpose === "FOR_RENT" && (
                      <PropertyTextInputV2
                        size="col-lg-6 col-md-6"
                        title="Rent Period*"
                        name="rentPeriod"
                        errorMessage={errors.rentPeriod?.message}
                        register={register}
                        placeholder="Monthly"
                        type="number"
                        value={property?.rentPeriod}
                      />
                    )}

                    <PropertyTextInputV2
                      size="col-lg-6 col-md-6"
                      title="Property Price"
                      name="price"
                      placeholder="24345"
                      errorMessage={errors.price?.message}
                      register={register}
                      type="number"
                      value={property?.price}
                    />
                    <PropertyTextInputV2
                      size="col-lg-6 col-md-6"
                      title="Total Area (sq:Ft)*"
                      name="area"
                      placeholder="24345"
                      errorMessage={errors.area?.message}
                      register={register}
                      type="number"
                      value={property?.area}
                    />
                    <PropertyTextInputV2
                      size="col-lg-6 col-md-6"
                      title="Total Bedroom*"
                      name="bed"
                      errorMessage={errors.bed?.message}
                      register={register}
                      placeholder="2"
                      type="number"
                      value={property?.bed}
                    />
                    <PropertyTextInputV2
                      size="col-lg-6 col-md-6"
                      title="Total Bathroom*"
                      name="bath"
                      errorMessage={errors.bath?.message}
                      register={register}
                      placeholder="2"
                      type="number"
                      value={property?.bath}
                    />
                    <PropertyTextInputV2
                      size="col-lg-6 col-md-6"
                      title="Total Garage*"
                      name="garage"
                      errorMessage={errors.garage?.message}
                      register={register}
                      placeholder="1"
                      type="number"
                      value={property?.garage}
                    />
                    <PropertyTextInputV2
                      size="col-lg-6 col-md-6"
                      title="Total Kitchen*"
                      name="kitchen"
                      errorMessage={errors.kitchen?.message}
                      register={register}
                      placeholder="2"
                      type="number"
                      value={property?.kitchen}
                    />
                  </div>
                  <div className={`property-sidebar__single `}>
                    <div className="mt-4">
                      <h4 className="property-sidebar__title">Property type</h4>
                      <div className="form-group">
                        <select
                          className="form-select form-select-md mb-3"
                          aria-label=".form-select-lg example"
                          {...register("propertyType")}
                        >
                          {propertyType.map((type) => (
                            <option
                              value={type.id}
                              key={type.id}
                              selected={type.id === property?.propertyType}
                            >
                              {type.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Single Form Element  */}

                  <div className="mg-top-20">
                    <h4 className="homec-submit-form__heading">Description</h4>
                    <div className="form-group homec-form-input">
                      <CKEditor
                        editor={ClassicEditor}
                        data={property?.description}
                        onChange={(event: any, editor: any) => {
                          const data = editor.getData();
                          setDescription(data);
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
              {/* <div className="homec-submit-form">
                <h4 className="homec-submit-form__title">Aminities</h4>
                <div className="homec-submit-form__inner"></div>
                <div className="row justify-content-center mb-5">
                  <div
                    className="col-md-6  "
                    style={{
                      padding: "0px 60px",
                    }}
                  >
                    {aminities
                      .slice(0, Math.ceil(aminities.length / 2))
                      .map((item) => {
                        const isChecked = property?.aminities?.some(
                          (propertyAminity) =>
                            propertyAminity.name ===
                            convertNameToCode(item.name)
                        );

                        return (
                          <div key={item.id} className="form-check">
                            <input
                              {...register("aminities")}
                              className="form-check-input"
                              type="checkbox"
                              value={convertNameToCode(item.name)}
                              id={item.name}
                              defaultChecked={isChecked}
                            />
                            <label
                              className="form-check-label"
                              htmlFor={item.name}
                            >
                              {item.name}
                            </label>
                          </div>
                        );
                      })}
                  </div>
                  <div
                    className="col-md-6"
                    style={{
                      padding: "0px 60px",
                    }}
                  >
                    {aminities
                      .slice(Math.ceil(aminities.length / 2))
                      .map((item) => {
                        const isChecked = property?.aminities?.some(
                          (propertyAminity) =>
                            propertyAminity.name ===
                            convertNameToCode(item.name)
                        );
                        return (
                          <div key={item.id} className="form-check">
                            <input
                              {...register("aminities")}
                              className="form-check-input"
                              type="checkbox"
                              value={convertNameToCode(item.name)}
                              id={item.name}
                              checked={isChecked}
                            />
                            <label
                              className="form-check-label"
                              htmlFor={item.name}
                            >
                              {item.name}
                            </label>
                          </div>
                        );
                      })}
                  </div>
                </div>
              </div> */}
              <div className="homec-submit-form">
                <h4 className="homec-submit-form__title">Property Location</h4>
                <div className="homec-submit-form__inner">
                  <div className="row">{/* <Places /> */}</div>
                </div>
              </div>
              <div className="row mb-5">
                <div className="col-12 d-flex justify-content-end mg-top-40">
                  <button
                    type="submit"
                    className="homec-btn homec-btn__second"
                    onClick={() => setState(state + 1)}
                  >
                    <span>Edit Property Now</span>
                  </button>
                </div>
              </div>
            </form>
            <form>
              <div className="homec-submit-form">
                <h4 className="homec-submit-form__title">
                  Property Media Previous
                </h4>
                <div className="homec-submit-form__inner">
                  <div className="row">
                    {property?.medias.map((media: Media) => {
                      return <MediaCardEdit media={media} />;
                    })}
                  </div>
                </div>
              </div>
            </form>
            <form>
              <div className="homec-submit-form">
                <h4 className="homec-submit-form__title">Property Media</h4>
                <div className="homec-submit-form__inner">
                  <div className="row">
                    <div className="mb-3">
                      <input
                        className="form-control"
                        type="file"
                        id="imageDetails"
                        multiple
                        value={""}
                        content=""
                        accept=".png, .jpg, .jpeg, .mp4, .mov, .avi, .mkv, video/*"
                        onChange={(e) => {
                          const files = Array.from(e.currentTarget.files);
                          setMedias([...medias, ...files]);
                        }}
                      />
                      <div className="row mt-5">
                        {medias?.map((media: File) => {
                          return (
                            <MediaCard
                              key={media.name + media.lastModified}
                              media={media}
                              setMedias={setMedias}
                              medias={medias}
                              propertyId={property.id}
                            />
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </form>
            <form>
              <div className="homec-submit-form">
                <h4 className="homec-submit-form__title">
                  Property Documents Previous
                </h4>
                <div className="homec-submit-form__inner">
                  <div className="row">
                    {property?.documents.map((doc: Document) => {
                      return <DocumentCardEdit document={doc} />;
                    })}
                  </div>
                </div>
              </div>
            </form>
            <form>
              <div className="homec-submit-form">
                <h4 className="homec-submit-form__title">Property Documents</h4>
                <div className="homec-submit-form__inner">
                  <div className="row">
                    <div className="mb-3">
                      <input
                        className="form-control"
                        type="file"
                        id="imageDetails"
                        multiple
                        value={""}
                        accept=".pdf"
                        onChange={(e) => {
                          const files = Array.from(e.currentTarget.files);
                          setDocuments([...documents, ...files]);
                        }}
                      />
                      <div className="row mt-5">
                        {documents?.map((file: File) => {
                          return (
                            <DocumentCard
                              doc={file}
                              docs={documents}
                              setDocuments={setDocuments}
                              propertyId={property.id}
                            />
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default PropertyFromEdit;
