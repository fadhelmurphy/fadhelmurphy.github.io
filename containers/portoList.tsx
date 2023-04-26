import PortoCard from "Components/portoCard";
import { SliderDataType } from "Consts/types/logo.type";

const PortoList = ({data}: {data: SliderDataType[]}) => 
data && data.length > 0 && data.map((item: SliderDataType) =>  
<PortoCard title={item.title} desc={item.desc} image={item.image} linkObj={item.linkObj} />
)
 
export default PortoList;