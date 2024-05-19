import { IUser } from "@/types/model";
import { Switch } from "antd";
import { MdCameraAlt } from "react-icons/md";
type Props = {
  file: any;
  onFileChange: (e: any) => void;
  user?: IUser;
};
const UpdateAvatar = ({ onFileChange, file, user }: Props) => {
  const onChange = (checked: boolean) => {
    console.log(`switch to ${checked}`);
  };

  const displayAvatar = () => {
    if (file)
      return <img src={URL.createObjectURL(file)} className="absolute w-full object-cover h-full rounded-full" />;
    else if (user && user.photo)
      return <img src={user.photo} className="absolute w-full object-cover h-full rounded-full" />;
    else return <></>;
  };

  return (
    <>
      <div className="text-center">
        <div className="p-2 m-auto w-36 h-36 cursor-pointer rounded-full border-dashed border border-[rgba(145,_158,_171,_0.2)]">
          <input
            accept="image/*"
            type="file"
            tabIndex={-1}
            style={{ display: "none" }}
            id="upload_img"
            name="upload_img"
            onChange={onFileChange}
          />
          <div className="img-upload rounded-full w-full h-full bg-slate-100 relative">
            {displayAvatar()}
            <label
              htmlFor="upload_img"
              className="items-center justify-center flex-col w-full flex h-full cursor-pointer overlay"
            >
              <MdCameraAlt fontSize={32} />
              <span className="inline-block mt-1">Chọn ảnh</span>
            </label>
          </div>
        </div>
        {/* <Button onClick={handleUpload}>Tải ảnh</Button> */}

        <span className="text-text-soft mt-2 inline-block max-w-56">
          Chấp nhận file *.jpeg, *.jpg, *.png, *.gif dung lượng tối đa 3 Mb
        </span>
      </div>
      <h3 className="font-semibold mt-7">Xác thực mail</h3>
      <div className="flex mt-2">
        <p className="flex-[6]">Tự động gửi mail yêu cầu xác thực nếu tắt tính năng này</p>
        <div className="flex-[2] text-end">
          <Switch defaultChecked onChange={onChange} />
        </div>
      </div>
    </>
  );
};

export default UpdateAvatar;
