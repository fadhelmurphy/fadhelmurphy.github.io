import LogoSlider from "./logo-slider";

interface Props {
    yourname?: string;
    yourRole?: JSX.Element;
  }

const emoji = "%F0%9F%91%8B%F0%9F%8F%BC"; // encode emoji manually
const Header = ({yourname, yourRole}: Props) => {
    
    return (
  <>
    <div className="h-72 md:h-[55vh] mb-6 md:mb-24 px-8 md:px-0 flex flex-col justify-end">
      <div className="inner container md:mx-auto text-left md:text-center">
      <p className="text-2xl md:text-4xl 2xl:text-6xl text-base-2 font-semibold font-header flex md:justify-center" dangerouslySetInnerHTML={{ __html: yourname }} />
      <h1 className="title text-4xl md:text-7xl 2xl:text-[7rem] md:leading-none font-semibold font-header mt-4">
        {yourRole}
      </h1>
      </div>
    </div>
    <LogoSlider />
  </>
)};

Header.defaultProps = {
  yourname: `Hi, I'm Fadhel. <span style="margin-left: 1rem"><img src="https://emojicdn.elk.sh/${emoji}?style=apple" class="animate-waving-hand inline-block origin-[70%_70%] h-8 w-8 md:h-[40px] md:w-[40px] 2xl:h-[60px] 2xl:w-[60px]" alt="dada-dada" /></span>`,
  yourRole: <>
  <span className="relative stabilo after:h-[1vh] after:md:h-[4vh]">Software</span> Engineer <br/>Based in Tangerang
  <style>
        {`
        .stabilo {
        transition: all 0.3s ease, background-position 1ms;
        }
        .stabilo::after {
            content: "";
            width: 100%;
            transform: rotate(-2deg) skew(5deg);
            background-color: rgb(254 202 202);
            background-image: linear-gradient(to right,#f9d2af, #fdf2f8);
            position: absolute;
            right: 0;
            bottom: 18%;
            z-index: -1;
        }
        `}
    </style>
  </>,
};
export default Header;
