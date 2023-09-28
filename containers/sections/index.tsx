import React from 'react'
import { type TemplateType } from 'Consts/types/template.type'

const Default = React.lazy(async () => await import('./default'))
const Education = React.lazy(async () => await import('./education'))
const Portfolio = React.lazy(async () => await import('./portfolio'))

const Template: TemplateType[] = [
  {
    id: 'default',
    component: Default
  },
  {
    id: 'education',
    component: Education
  },
  {
    id: 'portfolio',
    component: Portfolio
  }
]

const Sections = ({
  type,
  ...props
}: Record<string, any>): React.ReactNode[] =>
  Template.filter((item) => item.id === type).map(
    (style: TemplateType, idx: number) => (
      <style.component key={`${String(idx + 1)}`} {...props} />
    )
  )

Sections.defaultProps = {
  type: 'default'
}

export default Sections
