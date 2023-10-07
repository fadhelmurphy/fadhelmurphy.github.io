interface HomepageProps {
  yourname?: string
  yourRole?: JSX.Element
}

interface BlogProps {
  label?: string[]
  postTitle?: string
  date?: string
  bgImg?: string
  bgImgM?: string
  posts?: any[]
}

interface BlogListProps {
  title?: string
  description?: string
}

export type variantTypes = Record<string, any>

export interface HeaderProps extends HomepageProps, BlogProps, BlogListProps {
  variant?: string
};
