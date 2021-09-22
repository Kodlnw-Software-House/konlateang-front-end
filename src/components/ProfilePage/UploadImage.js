import { CursorClickIcon } from "@heroicons/react/solid";
import { useRef } from "react";
const UploadImage = (props) => {
  const newImgRef = useRef("");
  return (
    <div>
      {props.previewImg ? (
        <div className="w-52 min-h-16 max-h-full m-3 p-3 mx-auto">
          <img className="max-w-full max-h-full" src={props.previewImg} />
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
        className="btn btn-sm btn-ghost btn-block text-secondary-focus"
        onClick={() => newImgRef.current.click()}
      >
        <CursorClickIcon className="h-6 w-6 inline-block " /> เลือกรูปที่ต้องการ
      </button>
      <div className="flex flex-row justify-end space-x-3 pt-4">
        <button
          className="btn btn-error btn-sm"
          onClick={props.calcelUploadFile}
        >
          ยกเลิก
        </button>
        <button
          className="btn btn-primary btn-success btn-sm"
          onClick={props.uploadFile}
        >
          บันทึก
        </button>
      </div>
    </div>
  );
};
export default UploadImage;
