import PortoCard from "Components/portoCard";
import { SliderDataType } from "Consts/types/logo.type";

const PortoList = ({ data }: { data: SliderDataType[] }) =>
  data &&
  data.length > 0 &&
  data.map((item: SliderDataType, idx: number) => {
    const isOdd = (idx + 1) % 2 === 0;
    const customClassName = isOdd
      ? `transform-gpu rotate-[2deg]`
      : `transform-gpu rotate-[-2deg]`;
    return (
      <PortoCard
        title={item.title}
        desc={item.desc}
        image={item.image}
        linkObj={item.linkObj}
        customClassName={
            customClassName
        }
      />
    );
  });

export default PortoList;
