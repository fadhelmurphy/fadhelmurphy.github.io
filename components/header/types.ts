interface HomepageProps {
  yourname?: string
  yourRole?: JSX.Element
}

interface BlogProps {
  label?: string[]
  postTitle?: string
  date?: string
}

export type variantTypes = Record<string, any>

export interface HeaderProps extends HomepageProps, BlogProps {
  variant?: string
};
