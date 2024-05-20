import useFileUpload, { FileInfo } from "@/hooks/use-upload";
import { Button } from "antd";
import { useEffect, useState } from "react";
import { PiTrash, PiUploadSimple } from "react-icons/pi";
type Props = {
  allowedTypes: string[];
  getResult: (data: string[]) => void;
  folderPath: string;
  existingImages: string[];
};

type ImagePreviewProps = {
  url: string;
  type: "FILE" | "URL";
  fileIndex?: number;
  onRemovePreview: (url: string, type: "FILE" | "URL", fileIndex?: number) => void;
};

const UploadArea = ({ allowedTypes, getResult, folderPath, existingImages }: Props) => {
  const { files, updateFiles, uploadMultipleFiles, removeSingleImage } = useFileUpload();
  const [imgUrls, setImgUrls] = useState<string[]>([]);

  const handleChangeFile = (event: any) => {
    if (event.target.files.length == 0) return;
    updateFiles([...files, event.target.files[0]]);
  };

  const hasAnyFile = () => {
    return files.length > 0;
  };

  const removePreview = (url: string, type: "FILE" | "URL", fileIndex?: number) => {
    if (type == "FILE") {
      updateFiles(files.filter((_, i) => i !== fileIndex));
    } else {
      console.log(url.split("/o/")[1].split("?")[0]);
      //   console.log(imgUrls)
      const decodedUrlPath = decodeURIComponent(url.split("/o/")[1].split("?")[0]);
      console.log(decodedUrlPath);
      removeSingleImage(decodedUrlPath);
      setImgUrls(imgUrls.filter((u) => u != url));
      getResult(imgUrls.filter((u) => u != url));
    }
  };

  const uploadImages = async () => {
    const uploadInfos: FileInfo[] = files.map((f, idx) => {
      const info: FileInfo = {
        file: f,
        filePath: `${folderPath}/img_${idx}`,
      };
      return info;
    });

    const result = await uploadMultipleFiles(uploadInfos);
    getResult([...imgUrls, ...result]);
  };

  useEffect(() => {
    setImgUrls([...existingImages]);
  }, [existingImages]);

  return (
    <>
      <div className="flex justify-between p-4 outline-none rounded cursor-pointer border border-muted items-center gap-3">
        <label
          htmlFor="select-file-btn"
          className={`${
            imgUrls.length + files.length >= 3 ? "cursor-not-allowed" : "cursor-pointer"
          } flex justify-center items-center gap-3 w-full`}
        >
          <img src="/images/illustration/select-img.svg" width={100} height={100} />
          {imgUrls.length + files.length >= 3 ? (
            <span className="text-slate-500">Chỉ có thể tải lên tối đa 3 ảnh cho mỗi sản phẩm</span>
          ) : (
            <span>Kéo thả hoặc chọn chọn file</span>
          )}
        </label>

        {hasAnyFile() && (
          <div className="flex gap-3 font-medium">
            <Button type="default" size="large" className="flex gap-2 items-center">
              <PiTrash fontSize={18} />
              <span>Xoá {files.length} file</span>
            </Button>

            <Button type="primary" size="large" className="flex gap-2 items-center" onClick={uploadImages}>
              <PiUploadSimple fontSize={18} />
              <span>Tải lên {files.length} file</span>
            </Button>
          </div>
        )}
      </div>

      <input
        type="file"
        onChange={handleChangeFile}
        hidden
        id="select-file-btn"
        disabled={imgUrls.length + files.length >= 3}
      />

      <div className="bg-[#919eab14]  mt-5 rounded">
        <div className="h-[250px] flex gap-4 items-center justify-center">
          {imgUrls.map((url, idx) => {
            return <ImagePreview key={idx} url={url} type="URL" onRemovePreview={removePreview} />;
          })}
          {files.map((file, idx) => {
            return (
              <ImagePreview key={idx} url={URL.createObjectURL(file)} type="FILE" onRemovePreview={removePreview} fileIndex={idx} />
            );
          })}
        </div>
        <p className="text-right pr-3 pb-3">Tối đa {files.length + imgUrls.length}/3 ảnh</p>
      </div>
    </>
  );
};

function ImagePreview({ url, type, onRemovePreview, fileIndex = -1 }: ImagePreviewProps) {
  return (
    <div>
      <div className="w-[175px] h-[175px] rounded-md relative">
        <img src={url} alt={`img-preview`} className="object-cover rounded-md absolute h-full w-full" />
      </div>
      <p
        className="text-center mt-2 text-red-500 cursor-pointer underline"
        onClick={() => {
          onRemovePreview(url, type, fileIndex);
        }}
      >
        Xoá ảnh
      </p>
    </div>
  );
}

export default UploadArea;
