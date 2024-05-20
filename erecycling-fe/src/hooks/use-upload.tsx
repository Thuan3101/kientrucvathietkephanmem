import { useState } from "react";
import { storage } from "@/lib/firebase/firebase.config";
import { ref, uploadBytesResumable, getDownloadURL, deleteObject } from "firebase/storage";
import { toast } from "react-toastify";

export interface FileInfo {
  file: any;
  filePath: string;
}

const useFileUpload = () => {
  const [files, setFiles] = useState([]);

  const updateFiles = (updatedFiles: any[]) => {
    setFiles([...updatedFiles]);
  };

  const uploadSingleFile = async (info: FileInfo) => {
    if (files.length == 0) {
      toast.error("Vui lòng chọn ảnh từ thiết bị");
      return;
    }
    const storageRef = ref(storage, info.filePath);
    const response = await uploadBytesResumable(storageRef, info.file);
    const url = await getDownloadURL(response.ref);
    return url;
  };

  const uploadMultipleFiles = async (filesInfo: FileInfo[]) => {
    const uploadPromises = Array.from(filesInfo, (fileInfo) => uploadSingleFile(fileInfo));
    const uploadResponses = await Promise.all(uploadPromises);
    return uploadResponses;
  };

  const removeSingleImage = async (url: string) => {
    const storageRef = ref(storage, url);
    await deleteObject(storageRef);
  };

  return {
    files,
    updateFiles,
    uploadSingleFile,
    uploadMultipleFiles,
    removeSingleImage,
  };
};

export default useFileUpload;
  