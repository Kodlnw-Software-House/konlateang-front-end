import { useForm } from "react-hook-form";
import ItemCard from "../../../components/ui/ItemCard";
import Card from "../../../components/ui/Card";
import { Fragment, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { uiActions } from "../../../redux/ui-slice";
import hospitalService from "../../../components/functions/services/hospital-service";
import { useHistory } from "react-router";
import BackButton from "../../../components/ui/BackButton";
import { motion } from "framer-motion";
import Modal from "../../../components/ui/Modal";
import LoadingSpinner from "../../../components/ui/LoadingSpinner";
const compareObj = (o1, o2) => {
  for (let p in o1) {
    if (o1.hasOwnProperty(p)) {
      if (o1[p] !== o2[p]) {
        return false;
      }
    }
  }
  for (let p in o2) {
    if (o2.hasOwnProperty(p)) {
      if (o1[p] !== o2[p]) {
        return false;
      }
    }
  }
  return true;
};

const CreateEditIsolation = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    mode: "onBlur",
    defaultValues: {
      name: props.isolationData?.community_isolation_name,
      address: props.isolationData?.address,
      available_bed: props.isolationData?.available_bed,
    },
  });
  const [imageList, setImageList] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewList, setPreviewList] = useState([]);
  const [deletePicModal, setDeletePicModal] = useState(false);
  const [images, setImages] = useState(props.image_index);
  const [loading, setLoading] = useState(false);
  let image = [];

  if (props.edit) {
    images.forEach((img, i) => {
      image.push(
        <motion.img
          onClick={() => toggleRemove(img)}
          whileHover={{ scale: 0.9 }}
          whileTap={{ scale: 0.8 }}
          alt={`pic${i + 1}`}
          src={`${process.env.REACT_APP_BACKEND_MAIN_URL}hospital/getImage/${props.id}/${img}`}
          className="w-auto h-auto cursor-pointer"
        />
      );
    });
  }

  const updateIsolationData = (data) => {
    hospitalService
      .updateIsolationData(props.id, data, localStorage.getItem("user"))
      .then(() => {
        dispatch(
          uiActions.setNoti({
            status: "success",
            title: "อัพเดทข้อมูลสำเร็จ",
          })
        );
        history.push("/kon-la-tieng/community-isolation/id/" + props.id);
      })
      .catch((error) => {
        dispatch(
          uiActions.setNoti({
            status: "error",
            title: error.message,
          })
        );
      });
  };

  const uploadNewPhoto = (i) => {
    setLoading(true);
    const formData = new FormData();

    formData.append("files", imageList[i]);

    const id = props.id;
    hospitalService
      .uploadIsolationPictures(id, formData)
      .then(() => {
        dispatch(
          uiActions.setNoti({
            status: "success",
            title: "อัพโหลดรูปสำเร็จ",
          })
        );
        let imageState = [...imageList];
        imageState.splice(i, 1);
        setImageList(imageState);

        let previewState = [...previewList];
        previewState.splice(i, 1);
        setPreviewList(previewState);
      })
      .catch((error) => {
        dispatch(
          uiActions.setNoti({
            status: "error",
            title: error.message,
          })
        );
      })
      .finally(() => {
        setLoading(false);
      });
  };
  const createIsolationData = (data) => {
    const formData = new FormData();
    imageList.forEach((file) => {
      formData.append("files", file);
    });

    hospitalService
      .createNewIsolation(data, localStorage.getItem("user"))
      .then((response) => {
        const id = response.data.community_isolation_id;
        hospitalService
          .uploadIsolationPictures(id, formData)
          .then(() => {
            dispatch(
              uiActions.setNoti({
                status: "success",
                title: "สร้างศูนย์พักคอยสำเร็จ",
              })
            );
            history.push("/");
          })
          .catch((error) => {
            throw new Error(error);
          });
      })
      .catch((error) => {
        dispatch(
          uiActions.setNoti({
            status: "error",
            title: error.message,
          })
        );
      });
  };

  const sumbitForm = (data) => {
    if (props.edit === true) {
      let editData = {};

      const oldData = {
        community_isolation_name: props.isolationData?.community_isolation_name,
        address: props.isolationData?.address,
        available_bed: props.isolationData?.available_bed,
      };
      const newData = {
        community_isolation_name: data.name,
        address: data.address,
        available_bed: data.available_bed,
      };
      if (compareObj(oldData, newData)) {
        history.goBack();
        return;
      }
      if (
        oldData.address !== newData.address &&
        oldData.address.length !== newData.address.length
      ) {
        editData.address = newData.address;
      }
      if (
        oldData.community_isolation_name !== newData.community_isolation_name
      ) {
        editData.community_isolation_name = newData.community_isolation_name;
      }
      if (oldData.available_bed !== newData.available_bed) {
        editData.available_bed = newData.available_bed;
      }
      updateIsolationData(editData);
      return;
    }

    const newData = {
      community_isolation_name: data.name,
      address: data.address,
      available_bed: data.available_bed,
    };

    createIsolationData(newData);
    return;
  };

  const removeImage = (id) => {
    let imageState = [...imageList];
    imageState.splice(id, 1);
    setImageList(imageState);

    let previewState = [...previewList];
    previewState.splice(id, 1);
    setPreviewList(previewState);

    if (imageState.length === 0 && previewList.length === 0) {
      document.getElementById("my-file").value = null;
    }
  };

  const previewMultiImage = (e) => {
    let input = e.target;
    let count = input.files.length;
    let index = 0;
    if (input.files) {
      while (count--) {
        let reader = new FileReader();
        reader.onload = (e) => {
          setPreviewList((prev) => [...prev, e.target.result]);
        };
        setImageList((prev) => [...prev, input.files[0]]);
        reader.readAsDataURL(input.files[index]);
        index++;
      }
    }
  };

  const toggleRemove = (index) => {
    setSelectedImage(index);
    modalHandler();
  };

  const modalHandler = () => {
    setDeletePicModal((prev) => !prev);
  };

  const deletePicApi = (index) => {
    hospitalService
      .deleteIsolationImage(props.id, index, localStorage.getItem("user"))
      .then((response) => {
        dispatch(
          uiActions.setNoti({
            status: "success",
            title: "ลบรูปภาพสำเร็จ",
          })
        );
        let img = images;
        img.splice(selectedImage, 1);
        setImages(img);
        setSelectedImage(null);
        modalHandler();
      })
      .catch((error) => {
        dispatch(
          uiActions.setNoti({
            status: "error",
            title: "ลบรูปภาพไม่สำเร็จ",
          })
        );
        setSelectedImage(null);
      });
  };

  const nameInputClasses = errors.name
    ? "input input-sm input-error text-warning lg:h-12"
    : "input input-sm input-primary lg:h-12";
  const bedInputClasses = errors.available_bed
    ? "input input-sm input-error text-warning lg:h-12"
    : "input input-sm input-primary lg:h-12";
  const addressInputClasses = errors.address
    ? "textarea h-24 textarea-bordered textarea-error input-error text-warning lg:h-28"
    : "textarea h-24 textarea-bordered textarea-primary lg:h-28";
  let buttonDisable;
  if (!props.edit) {
    buttonDisable = !isValid || imageList.length < 1;
  } else {
    buttonDisable = !isValid;
  }
  return (
    <Fragment>
      {deletePicModal && (
        <Modal type="DECISION" closeModal={modalHandler}>
          <div
            data-theme="hospitalTheme"
            className="text-center w-full text-2xl"
          >
            ต้องการลบรูปนี้หรือไม่ ?
            <div className="flex flex-row justify-center space-x-4 my-4">
              <button
                className="btn btn-primary btn-outline btn-lg"
                onClick={modalHandler}
              >
                ยกเลิก
              </button>
              <button
                className="btn btn-secondary btn-lg"
                onClick={() => deletePicApi(selectedImage)}
              >
                ยืนยัน
              </button>
            </div>
          </div>
        </Modal>
      )}
      <Card>
        <h1 className="text-center text-2xl font-bold lg:text-3xl">
          {props.isolationData?.community_isolation_name
            ? props.isolationData?.community_isolation_name
            : "ลงทะเบียนศูนย์พักคอย"}
        </h1>
      </Card>
      <ItemCard>
        <BackButton />
        <form
          onSubmit={handleSubmit(sumbitForm)}
          className="xl:w-3/5 xl:mx-auto"
        >
          <div className="form-control">
            <label htmlFor="name" className="label ">
              <span className="label-text text-xl">ชื่อศูนย์พักคอย</span>
            </label>
            <input
              type="text"
              placeholder="ชื่อศูนย์พักคอยของท่าน.."
              className={nameInputClasses}
              maxLength="45"
              required
              {...register("name", { required: true, maxLength: 45 })}
            />
            {errors.name && (
              <label className="label">
                <span className="label-text text-error text-lg">
                  {errors.name.type === "required"
                    ? "โปรดระบุชื่อของศูนย์พักคอย"
                    : "ชื่อต้องมีความยาวไม่เกิน 45 ตัวอักษร"}
                </span>
              </label>
            )}
            <label htmlFor="address" className="label">
              <span className="label-text text-xl">ที่อยู่ปัจจุบัน</span>
            </label>
            <textarea
              className={addressInputClasses}
              placeholder="ที่อยู่..."
              maxLength="500"
              required
              {...register("address", { required: true, maxLength: 500 })}
            />
            {errors.address && (
              <label className="label">
                <span className="label-text text-error text-lg">
                  {errors.address.type === "required"
                    ? "โปรดระบุที่อยู่ศูนย์พักคอย"
                    : "ที่อยู่ต้องมีความยาวไม่เกิน 500 ตัวอักษร"}
                </span>
              </label>
            )}
            <label htmlFor="available_bed" className="label">
              <span className="label-text text-xl">จำนวนเตียงที่เปิดรับ</span>
            </label>
            <input
              type="number"
              placeholder="จำนวนเตียงที่เปิดรับ"
              className={bedInputClasses}
              required
              {...register("available_bed", { required: true })}
            />
            {errors.available_bed && (
              <label className="label">
                <span className="label-text text-error text-lg">
                  {errors.available_bed.type === "required" &&
                    "โปรดระบุจำนวนเตียงที่จะเปิดรับผู้ป่วย"}
                </span>
              </label>
            )}
          </div>
          <div className="flex justify-end pt-4">
            <button
              className={
                props.edit
                  ? "btn btn-accent  md:btn-block md:btn-lg"
                  : "btn btn-primary md:btn-block md:btn-lg"
              }
              type="submit"
              disabled={buttonDisable}
            >
              {props.edit ? "บันทึก" : "สร้างศูนย์พักคอยใหม่"}
            </button>
          </div>

          <div className="divider" />

          {/* picture */}

          <div className="my-4">
            {props.edit ? (
              <Fragment>
                {imageList.length + images.length >= 3 ? null : (
                  <div className="flex flex-col">
                    <input
                      name="multiple-input"
                      type="file"
                      accept="image/*"
                      className="form-control-file"
                      id="my-file"
                      onChange={previewMultiImage}
                      disabled={imageList.length >= 3}
                    />
                  </div>
                )}
                <label
                  className="italic font-semibold text-lg"
                  htmlFor="my-file"
                >
                  **คลิกที่รูปเพื่อลบออก <br /> ***อัพโหลดรูปภาพไม่เกิน 3 รูป
                </label>
                {previewList.length !== 0 && (
                  <div className="flex flex-row space-x-8 h-56 md:w-full md:h-full overflow-x-auto">
                    {previewList.map((pic, index) => {
                      return (
                        <div className="w-1/2 flex flex-col justify-items-stretch space-y-1">
                          <button
                            className="btn btn-info btn-sm hover:bg-sky-700"
                            onClick={(e) => {
                              e.preventDefault();
                              uploadNewPhoto(index);
                            }}
                          >
                            อัพโหลดรูปนี้
                          </button>
                          {loading ? (
                            <LoadingSpinner />
                          ) : (
                            <motion.img
                              onClick={() => removeImage(index)}
                              whileHover={{ scale: 0.9 }}
                              whileTap={{ scale: 0.8 }}
                              className="w-auto h-auto cursor-pointer"
                              key={index}
                              src={pic}
                              alt={index}
                            />
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
                <h1 className="text-center font-semibold text-lg">
                  รูปภาพปัจจุบันทั้งหมด {images.length} ใน 3 ภาพ
                </h1>
                <div className="flex flex-row my-3 space-x-8 w-full h-36 md:w-full md:h-72 overflow-x-auto">
                  {image}
                </div>
              </Fragment>
            ) : (
              <Fragment>
                {imageList.length >= 3 ? null : (
                  <div className="flex flex-col">
                    <input
                      name="multiple-input"
                      type="file"
                      accept="image/*"
                      className="form-control-file"
                      id="my-file"
                      onChange={previewMultiImage}
                      disabled={imageList.length >= 3}
                    />
                  </div>
                )}
                <label className="italic font-semibold my-1" htmlFor="my-file">
                  **คลิกที่รูปเพื่อลบออก <br /> ***อัพโหลดรูปภาพไม่เกิน 3 รูป
                </label>
                {previewList.length !== 0 && (
                  <div className="flex flex-row space-x-8 w-full h-36 md:w-full md:h-72 overflow-x-auto">
                    {previewList.map((pic, index) => {
                      return (
                        <motion.img
                          onClick={() => removeImage(index)}
                          whileHover={{ scale: 0.9 }}
                          whileTap={{ scale: 0.8 }}
                          className="w-auto h-auto cursor-pointer"
                          key={index}
                          src={pic}
                          alt={index}
                        />
                      );
                    })}
                  </div>
                )}
              </Fragment>
            )}
          </div>
        </form>
      </ItemCard>
    </Fragment>
  );
};

export default CreateEditIsolation;
