import PortoCard from "Components/portoCard";
import { SliderDataType } from "Consts/types/logo.type";

const PortoList = ({ data }: { data: SliderDataType[] }) =>
  data &&
  data.length > 0 &&
  data.map((item: SliderDataType, idx: number) => {
    const isOdd = (idx + 1) % 2 === 0;
    const customClassName = isOdd
      ? `md:rotate-[2deg]`
      : `md:rotate-[-2deg]`;
    return (
      <PortoCard
        title={item.title}
        desc={item.desc}
        image={item.image}
        linkObj={item.linkObj}
        customClassName={
            `md:transform-gpu ${customClassName}`
        }
      />
    );
  });

export default PortoList;
