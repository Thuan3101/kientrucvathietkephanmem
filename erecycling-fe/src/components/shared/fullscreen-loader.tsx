import { Spin } from "antd";

const FullScreenLoader = () => {
  return (
    <div className="h-[95vh]">
      <div className="flex items-center justify-center h-full">
        <Spin />
      </div>
    </div>
  );
};

export default FullScreenLoader;
