import {SliderDataType} from "Consts/types/logo.type";
import {TopHeaderMenuConst} from "Consts/logo";

function TopHeaderMenu() {
  return (
    <div className='hidden md:flex top-header-menu container mx-auto justify-end font-semibold text-base-2 px-8 md:px-0 py-12'>
        {
            TopHeaderMenuConst.map((item: SliderDataType) => (
                <a href={item.href} className='flex items-center ml-6 md:ml-12' target="_blank" >
                    <span className='mr-2 md:mr-4' dangerouslySetInnerHTML={{__html: item.icon}}></span>
                    {item.text}
                </a>
            ))
        }
    </div>
  )
}

export default TopHeaderMenu