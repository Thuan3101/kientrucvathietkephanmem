import { Image } from "antd";
import { Link } from "react-router-dom";
type Props = {
  id: string;
  imgUrl: string;
  name: string;
  price: number;
  countInStock: number;
  countOrdered: number;
};

const ProductItemXs = ({ id, imgUrl, name, price, countInStock, countOrdered }: Props) => {
  return (
    <div className="py-2 flex gap-4">
      <div className="w-[48px] h-[48px] relative">
        <Image src={imgUrl} alt={name} className="rounded-xl" sizes="100%" />
      </div>

      <div className="flex justify-between items-center flex-grow max-w-[560px]  min-w-[0] ">
        <div className="truncate">
          <Link to={`/products/${id}`} className="text-sm font-semibold">
            {name}
          </Link>
          <div className="flex items-center">
            <span className="text-text-soft mr-2 ">{price}</span>
          </div>
        </div>
      </div>

      <div className="w-[100px]">
        <p className="text-[16px] font-medium">Lượt bán</p>
        <p className="text-text-soft mr-2">{countOrdered}</p>
      </div>
    </div>
  );
};

export default ProductItemXs;
