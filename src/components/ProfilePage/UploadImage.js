import { CursorClickIcon } from "@heroicons/react/solid";
import { useRef } from "react";
const UploadImage = (props) => {
  const newImgRef = useRef("");
  return (
    <div>
      {props.previewImg ? (
        <div className="max-w-xs max-h-80 m-3 p-3 mx-auto overflow-auto xl:max-w-xl">
          <img
            className="w-full h-full"
            src={props.previewImg}
            alt="preview"
          />
        </div>
      ) : null}
      <input
        accept="image/*"
        type="file"
        hidden
        ref={newImgRef}
        onChange={props.handleChange}
      />
      <button
        className="btn btn-sm btn-ghost btn-block text-secondary-focus h-10"
        onClick={() => newImgRef.current.click()}
      >
        <CursorClickIcon className="h-6 w-6 inline-block " /> เลือกรูปที่ต้องการ
      </button>
      <div className="flex flex-row justify-center space-x-3 pt-4">
        <button
          className="btn btn-error btn-sm md:btn-md"
          onClick={props.calcelUploadFile}
        >
          ยกเลิก
        </button>
        <button
          className="btn btn-primary btn-success btn-sm md:btn-md"
          onClick={props.uploadFile}
        >
          บันทึก
        </button>
      </div>
    </div>
  );
};
export default UploadImage;
