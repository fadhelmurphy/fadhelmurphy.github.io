import { type BadgeProps } from '@/Components/types/badge'

const Badge = ({
  children,
  className,
  dataAos = 'fade-up',
  dataAosDuration = '900'

}: BadgeProps): JSX.Element => (
    <span data-aos={dataAos} data-aos-duration={dataAosDuration}
    className={`mr-[16px] rounded bg-[rgba(224,242,254,0.50)] px-3.5 py-1.5 text-sm font-medium text-blue-500${
        className ? ` ${className}` : ''}`}>
        {children}
    </span>
)

export default Badge
