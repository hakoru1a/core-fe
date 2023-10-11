import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import "react-multi-carousel/lib/styles.css";
import { toast } from "react-toastify";
import propertyApi from "../../apis/property.api";
import { aminities, propertyType } from "../../data/property";
import { useAuth } from "../../hooks/useAuth";
import useQueryParams from "../../hooks/useQueryParams";
import { PropertySchema, propertySchema } from "../../utils/rules";
import { convertNameToCode } from "../../utils/utils";
import Preloader from "../Loader";
import PropertyTextInputV2 from "./PropertyTextInputV2";
import { useNavigate, useParams } from "react-router-dom";
import { Property } from "../../types/property.type";
import Places from "./SimpleMap";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
// import Places from "./SimpleMap";

type FormData = PropertySchema;
const schema = propertySchema;
function PropertyFromEdit() {
  const [property, setProperty] = useState<Property>();
  const { id } = useParams();
  const { data, isFetching } = useQuery({
    queryKey: ["properties", id],
    queryFn: () => propertyApi.getPropertyById(Number(id)),
    enabled: id !== undefined,
  });
  useEffect(() => {
    const p = data?.data.data;
    if (p) {
      setProperty(p);
    }
  }, [data]);
  const [state, setState] = useState<number>(1);

  const user = useAuth();
  const params = useQueryParams();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      //   thumbs: {},
      //   imageDetails: {},
      //   video: {},
      rentPeriod: params?.purpose === "for-rent" ? undefined : "0",
    },
  });
  // const thumbFiles: any = watch("thumbs");
  // const imageDetails: any = watch("imageDetails");
  // const video: any = watch("video");
  const navigate = useNavigate();
  const { mutate, isLoading } = useMutation({
    mutationFn: (data) => propertyApi.updateProperty(data),
    onSuccess: () => {
      navigate("/");
      toast.success("Updare property thành công chờ duyệt nhà");
    },
  });
  const [description, setDescription] = useState<string>();
  const { address, lat, lng } = useSelector(
    (state: RootState) => state.location
  );
  const onSubmit = handleSubmit((data) => {
    const mySubmit = {
      id: property?.id,
      purpose: property?.purpose,
      ...data,
      description,
      // medias: [...thumbFiles, ...imageDetails, ...video],
      latitude: lat || property?.latitude || "106.6296638",
      longitude: lng || property?.longitude || "10.8230989",
      address: address || property?.address || "TPHCM",
      customer: user.id,
    };
    // delete mySubmit.imageDetails;
    // delete mySubmit.thumbs;
    console.log(mySubmit);
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
                    {params?.purpose === "for-rent" && (
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
                              defaultValue={type.id}
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
                        data={property?.description || description}
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
                        const isChecked = property?.aminities.some(
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
                  <div
                    className="col-md-6"
                    style={{
                      padding: "0px 60px",
                    }}
                  >
                    {aminities
                      .slice(Math.ceil(aminities.length / 2))
                      .map((item) => {
                        const isChecked = property?.aminities.some(
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
              </div>
              <div className="homec-submit-form">
                <h4 className="homec-submit-form__title">Property Location</h4>
                <div className="homec-submit-form__inner">
                  <div className="row">
                    <Places />
                  </div>

                  {/* Single Form Element  */}
                </div>
              </div>
              <div className="homec-submit-form">
                <h4 className="homec-submit-form__title">Property Media</h4>
                <div className="homec-submit-form__inner">
                  {/* <div className="row">
                    <div className="mb-3">
                      <label htmlFor="thumnails" className="form-label">
                        Pick 3 files for thumnails*
                      </label>
                      <input
                        className="form-control"
                        type="file"
                        id="thumnails"
                        accept=".png, .jpg, .jpeg"
                        multiple
                        {...register("thumbs")}
                      />
                      <span style={{ color: "red" }}>
                        {errors.thumbs?.message}
                      </span>
                      <Carousel
                        swipeable={false}
                        responsive={responsiveHeroSlider}
                        ssr={true} // means to render carousel on server-side.
                        infinite={true}
                        autoPlaySpeed={1000}
                        keyBoardControl={true}
                        containerClass="carousel-container"
                        dotListClass="custom-dot-list-style"
                        arrows={true}
                        itemClass="carousel-item-padding-40-px mt-3"
                      >
                        {Object.values(thumbFiles)?.map(
                          (item: File, index: number) => {
                            const url = URL.createObjectURL(item);
                            return (
                              <div key={index}>
                                <img
                                  style={{
                                    width: "100%",
                                    objectFit: "cover",
                                    objectPosition: "center",
                                    maxHeight: "500px",
                                    height: "500px",
                                  }}
                                  src={url}
                                  alt={`Image ${index}`}
                                />
                              </div>
                            );
                          }
                        )}
                      </Carousel>
                    </div>
                    <div className="mb-3">
                      <label htmlFor="imageDetails" className="form-label">
                        Pick 10 files for details*
                      </label>
                      <input
                        className="form-control"
                        type="file"
                        id="imageDetails"
                        multiple
                        accept=".png, .jpg, .jpeg"
                        {...register("imageDetails")}
                      />
                      <span style={{ color: "red" }}>
                        {errors.imageDetails?.message}
                      </span>
                      <Carousel
                        swipeable={false}
                        responsive={responsiveCustomerReviewSlider}
                        ssr={true} // means to render carousel on server-side.
                        infinite={true}
                        autoPlaySpeed={1000}
                        keyBoardControl={true}
                        containerClass="carousel-container"
                        dotListClass="custom-dot-list-style"
                        arrows={true}
                        itemClass="carousel-item-padding-40-px mt-3"
                      >
                        {Object.values(imageDetails)?.map(
                          (item: File, index: number) => {
                            const url = URL.createObjectURL(item);
                            return (
                              <div key={index}>
                                <img
                                  style={{
                                    width: "100%",
                                    objectFit: "cover",
                                    objectPosition: "center",
                                    height: "200px",
                                  }}
                                  src={url}
                                  alt={`Image ${index}`}
                                />
                              </div>
                            );
                          }
                        )}
                      </Carousel>
                    </div>
                    <div className="mb-3">
                      <label htmlFor="video" className="form-label">
                        Pick 1 files for overview your property*
                      </label>
                      <input
                        className="form-control"
                        type="file"
                        id="video"
                        accept="video/**"
                        {...register("video")}
                      />
                      <span style={{ color: "red" }}>
                        {errors.video?.message}
                      </span>
                      {Object.keys(video).length > 0 && (
                        <video src={URL.createObjectURL(video["0"])} controls />
                      )}
                    </div>
                  </div> */}
                </div>
              </div>
              <div className="homec-submit-form">
                <h4 className="homec-submit-form__title">Property Documents</h4>
                <div className="homec-submit-form__inner">
                  {/* <div className="row">
                    <div className="mb-3">
                      <label htmlFor="documents" className="form-label">
                        Multiple files for documents
                      </label>
                      <input
                        className="form-control"
                        type="file"
                        id="documents"
                        accept="application/msword, application/vnd.ms-excel,application/pdf"
                        multiple
                        {...register("documents")}
                      />
                      <span style={{ color: "red" }}>
                        {errors.documents?.message}
                      </span>
                    </div>
                  </div> */}
                </div>
              </div>

              <div className="row">
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
          </div>
        </div>
      </div>
    </section>
  );
}

export default PropertyFromEdit;
