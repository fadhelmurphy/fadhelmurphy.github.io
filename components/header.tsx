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
      <p className="text-2xl md:text-6xl text-base-2 font-semibold font-header flex justify-center" dangerouslySetInnerHTML={{ __html: yourname }} />
      <h1 className="title text-4xl md:leading-none md:text-[7rem] font-semibold font-header mt-4">
        {yourRole}
      </h1>
      </div>
    </div>
    <LogoSlider />
  </>
)};

Header.defaultProps = {
  yourname: `Hi, I'm Fadhel. <span style="margin-left: 1rem"><img src="https://emojicdn.elk.sh/${emoji}?style=apple" class="dada-dada" alt="dada-dada" width="60" height="60" /></span>`,
  yourRole: <>
  <span className="relative stabilo after:h-[1vh] after:md:h-[4vh]">Software</span> Engineer <br/>Based in Tangerang
  <style>
        {`
        .dada-dada {
          animation-name: dada-dada-animation;  /* Refers to the name of your @keyframes element below */
          animation-duration: 2.5s;        /* Change to speed up or slow down */
          animation-iteration-count: infinite;  /* Never stop waving :) */
          transform-origin: 70% 70%;       /* Pivot around the bottom-left palm */
          display: inline-block;
        }
        @keyframes dada-dada-animation {
            0% { transform: rotate( 0.0deg) }
           10% { transform: rotate(14.0deg) }  /* The following five values can be played with to make the waving more or less extreme */
           20% { transform: rotate(-8.0deg) }
           30% { transform: rotate(14.0deg) }
           40% { transform: rotate(-4.0deg) }
           50% { transform: rotate(10.0deg) }
           60% { transform: rotate( 0.0deg) }  /* Reset for the last half to pause */
          100% { transform: rotate( 0.0deg) }
        }

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
