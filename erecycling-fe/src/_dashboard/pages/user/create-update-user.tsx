import Card from "@/components/shared/card";
import UpdateAvatar from "@/components/user/update-avatar";
import { usersBreadcrumb } from "@/data/component-data";
import { Breadcrumb, Col, Row, Switch } from "antd";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { storage } from "@/lib/firebase/firebase.config";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { IUser } from "@/types/model";
import dayjs from "dayjs";
import FromCreateEdit from "@/components/user/form-create-edit";
import { useAddNewResource, useEditResource, useGetResourceDetails } from "@/lib/react-query/query";
import FullScreenLoader from "@/components/shared/fullscreen-loader";

const generateUID = () => {
  if (!localStorage.getItem("new_uid")) {
    const id = uuidv4();
    localStorage.setItem("new_uid", id);
    return id;
  } else {
    return localStorage.getItem("new_uid");
  }
};

const CreateUser = () => {
  const location = useLocation();
  const mode = location.pathname.split("/").pop();
  const [imgUrl, setImgUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { mutateAsync: newFn, isPending } = useAddNewResource<IUser>("user");
  const { mutateAsync: updateFn } = useEditResource("user");
  const [file, setFile] = useState();
  const [hasChange, setHasChange] = useState(false);
  const [userId, setUserId] = useState(null);
  const { data: user, isPending: isPendingUser } = useGetResourceDetails<IUser>(userId, "user");

  const [userInfo, setUserInfo] = useState<Partial<IUser>>({
    active: true,
    // _id: (),
    email: "",
    firstName: "",
    lastName: "",
    birthDay: dayjs().toDate(),
    photo: "",
    username: "",
    phoneNumber: "",
    uuid: generateUID(),
  });

  const onchangeBanned = (checked: boolean) => {
    console.log(`switch to ${checked}`);
  };

  function onFileChange(e: any) {
    setFile(e.target.files[0]);
    e.preventDefault();
  }

  function handleUpload(mode: string, data: any) {
    const uid = mode === "edit" ? user.data.uuid : userInfo.uuid;
    if (!file) {
      setUserInfo({
        ...userInfo,
        ...data,
        birthday: dayjs(data.birthday).format("YYYY-MM-DD"),
        photo: mode !== "edit" ? null : userInfo.photo,
        id: uid,
      });
      setHasChange(true);
      return;
    }
    setIsLoading(true);
    const storageRef = ref(storage, `/users/avatar/${uid}`);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      "state_changed",
      () => {},
      (err) => {
        console.log(err);
        setIsLoading(false);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          setImgUrl(url);
          setIsLoading(false);
          setHasChange(true);
          setUserInfo({
            ...userInfo,
            ...data,
            birthday: dayjs(data.birthday).format("YYYY-MM-DD"),
            avatar: url,
            id: uid,
          });
        });
      }
    );
  }

  const hanldeCreateOrUpdate = async (data: any) => {
    handleUpload(mode, data);
  };

  useEffect(() => {
    if (mode === "edit") {
      setUserId(location.search.split("id=").at(1));
    }
  }, [location.search, mode]);

  useEffect(() => {
    if (hasChange) {
      if (mode === "new") {
        newFn({ data: userInfo, resourceName: "user" });
      } else {
        updateFn({ data: userInfo, resourceName: "user" });
      }
    }
  }, [hasChange, mode, newFn, updateFn, userInfo]);

  if (isLoading || isPending || (isPendingUser && mode == "edit")) {
    return <FullScreenLoader />;
  }

  return (
    <div>
      <h2 className="text-2xl font-semibold">{mode === "new" ? "Thêm mới người dùng" : "Chỉnh sửa thông tin"} </h2>
      <Breadcrumb className="text-base font-inter mt-4" items={usersBreadcrumb} />
      <Row gutter={24} className="mt-4">
        <Col span={8}>
          <Card className="relative">
            {mode !== "new" && (
              <div className="text-right">
                {user.data.active ? (
                  <div className="px-2 inline-block py-1 rounded-md font-medium text-[#118d57] bg-[rgba(34,_197,_94,_0.16)]">
                    Active
                  </div>
                ) : (
                  <div className="px-2 inline-block py-1 rounded-md font-medium text-[#b71d18] bg-[rgba(255,_86,_48,_0.16)]">
                    Banned
                  </div>
                )}
              </div>
            )}
            <UpdateAvatar file={file} onFileChange={onFileChange} user={user && user.data} />
            {mode !== "new" && (
              <>
                <h3 className="font-semibold mt-7">Hạn chế người dùng</h3>
                <div className="flex mt-2">
                  <p className="flex-[6]">Người dùng sẽ tạm thời không thể truy cập vào nền tảng</p>
                  <div className="flex-[2] text-end">
                    <Switch defaultValue={false} onChange={onchangeBanned} />
                  </div>
                </div>
              </>
            )}
          </Card>
        </Col>

        <Col span={16}>
          <Card>
            {mode == "edit" ? (
              <FromCreateEdit mode={mode} onReceiveData={hanldeCreateOrUpdate} user={user && user.data} />
            ) : (
              <FromCreateEdit mode={mode} onReceiveData={hanldeCreateOrUpdate} />
            )}

            <div className="text-right">
              <input
                type="submit"
                form="from-create-user"
                className="inline-block font-medium rounded-md h-[40px] bg-primary w-32 text-white mt-4 cursor-pointer hover:bg-[rgba(0,_166,_111,_0.8)]"
                value={mode.toLowerCase() === "new" ? "Thêm mới" : "Cập nhật"}
              />
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default CreateUser;
