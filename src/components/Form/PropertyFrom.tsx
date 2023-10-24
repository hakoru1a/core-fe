import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import "react-multi-carousel/lib/styles.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import propertyApi from "../../apis/property.api";
import userApi from "../../apis/user.api";
import { aminities, propertyType } from "../../data/property";
import { useAuth } from "../../hooks/useAuth";
import useQueryParams from "../../hooks/useQueryParams";
import { setGlobalUser } from "../../redux/slice/user.slice";
import { RootState } from "../../store";
import { setProfileToLS } from "../../utils/auth";
import { PropertySchema, propertySchema } from "../../utils/rules";
import { convertNameToCode } from "../../utils/utils";
import Preloader from "../Loader";
import DocumentCard from "./DocmentCard";
import MediaCard from "./MediaCard";
import PropertyTextInputV2 from "./PropertyTextInputV2";
import { Property } from "../../types/property.type";
import Places from "./SimpleMap";
// import Places from "./SimpleMap";

type FormData = PropertySchema;
const schema = propertySchema;
function PropertyFrom() {
  const user = useAuth();
  const [currentProperty, setCurrentProperty] = useState<Property>({});
  const [medias, setMedias] = useState<any>([]);
  const [isSubmitProperty, setIsSubmitProperty] = useState<boolean>(false);
  console.log(medias);
  const [documents, setDocuments] = useState<File[]>([]);
  const params = useQueryParams();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      rentPeriod: params?.purpose === "for-rent" ? undefined : "0",
    },
  });
  // const video: any = watch("video");
  const { mutate, isLoading } = useMutation({
    mutationFn: (data) => propertyApi.registerProperty(data),
    onSuccess: async (res) => {
      const { data } = await userApi.getCurrentUser();
      setProfileToLS(data.data);
      dispatch(setGlobalUser(data.data));
      setIsSubmitProperty(true);
      setCurrentProperty(res.data.data);
      toast.success("Đăng nhà thành công chờ duyệt nhà");
    },
  });
  const [description, setDescription] = useState<string>();
  const { address, lat, lng } = useSelector(
    (state: RootState) => state.location
  );
  const onSubmit = handleSubmit((data) => {
    const mySubmit = {
      ...data,
      description,
      latitude: lat || "106.6296638",
      longitude: lng || "10.8230989",
      address: address || "TPHCM",
      purpose: params?.purpose.toUpperCase().replace("-", "_"),
      customer: user.id,
    };
    // delete mySubmit.imageDetails;
    // delete mySubmit.thumbs;
    toast.success("Quá trình mất vài phút");
    console.log(mySubmit);
    mutate(mySubmit);
  });

  if (isLoading) {
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
                    />
                    {params?.purpose === "for-rent" && (
                      <PropertyTextInputV2
                        size="col-lg-6 col-md-6"
                        title="Rent Period*"
                        name="rentPeriod"
                        errorMessage={errors.rentPeriod?.message}
                        register={register}
                        placeholder="Monthly"
                        type="number"
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
                    />
                    <PropertyTextInputV2
                      size="col-lg-6 col-md-6"
                      title="Total Area (sq:Ft)*"
                      name="area"
                      placeholder="24345"
                      errorMessage={errors.area?.message}
                      register={register}
                      type="number"
                    />
                    <PropertyTextInputV2
                      size="col-lg-6 col-md-6"
                      title="Total Bedroom*"
                      name="bed"
                      errorMessage={errors.bed?.message}
                      register={register}
                      placeholder="2"
                      type="number"
                    />
                    <PropertyTextInputV2
                      size="col-lg-6 col-md-6"
                      title="Total Bathroom*"
                      name="bath"
                      errorMessage={errors.bath?.message}
                      register={register}
                      placeholder="2"
                      type="number"
                    />
                    <PropertyTextInputV2
                      size="col-lg-6 col-md-6"
                      title="Total Garage*"
                      name="garage"
                      errorMessage={errors.garage?.message}
                      register={register}
                      placeholder="1"
                      type="number"
                    />
                    <PropertyTextInputV2
                      size="col-lg-6 col-md-6"
                      title="Total Kitchen*"
                      name="kitchen"
                      errorMessage={errors.kitchen?.message}
                      register={register}
                      placeholder="1"
                      type="number"
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
                          {propertyType.map((type, index) => (
                            <option
                              value={type.id}
                              key={type.name}
                              selected={index === 0}
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
                        data={description}
                        onChange={(event: any, editor: any) => {
                          const data = editor.getData();
                          setDescription(data);
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="homec-submit-form">
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
                        return (
                          <div key={item.id} className="form-check">
                            <input
                              {...register("aminities")}
                              className="form-check-input"
                              type="checkbox"
                              value={convertNameToCode(item.name)}
                              id={item.name}
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
                        return (
                          <div key={item.id} className="form-check">
                            <input
                              {...register("aminities")}
                              className="form-check-input"
                              type="checkbox"
                              value={convertNameToCode(item.name)}
                              id={item.name}
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
              </div>
              <div className="homec-submit-form">
                <h4 className="homec-submit-form__title">Property Location</h4>
                <div className="homec-submit-form__inner">
                  <div className="row">{/* <Places /> */}</div>

                  {/* Single Form Element  */}
                </div>
              </div>

              <div className="row mb-5">
                <div className="col-12 d-flex justify-content-end mg-top-40">
                  <button
                    disabled={isSubmitProperty}
                    type="submit"
                    className="homec-btn homec-btn__second"
                  >
                    <span>Submit Property Now</span>
                  </button>
                </div>
              </div>
            </form>
            {isSubmitProperty && Object.keys(currentProperty).length > 0 && (
              <>
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
                                  media={media || null}
                                  setMedias={setMedias}
                                  medias={medias}
                                  propertyId={currentProperty.id}
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
                      Property Documents
                    </h4>
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
                                  propertyId={currentProperty.id}
                                />
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default PropertyFrom;
