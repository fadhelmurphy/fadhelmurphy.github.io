import React from 'react'
import HomepageHeader from './homepage'
import BlogHeader from './blog'
import { type HeaderProps, type variantTypes } from './types'

const headerVariant: variantTypes =
{
  homepage: HomepageHeader,
  blog: BlogHeader
}

function Header ({ variant = 'homepage', ...props }: HeaderProps): JSX.Element {
  const LoadComponent = headerVariant[variant]
  return (
    <LoadComponent {...props} />
  )
};
export default Header
