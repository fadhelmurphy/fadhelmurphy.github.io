/* eslint-disable react/no-children-prop */
/* eslint-disable max-len */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/no-array-index-key */
import React from "react";
import { TemplateType } from "Consts/types/template.type";
const Default = React.lazy(() => import("./default"));
const Education = React.lazy(() => import("./education"));

const Template: TemplateType[] = [
  {
    id: "default",
    component: Default,
  },
  {
    id: "education",
    component: Education,
  },
];

const Sections = ({
  type,
  ...props
}: {
  [key: string]: any;
}): React.ReactNode[] =>
  Template.filter((item) => item.id === type).map(
    (style: TemplateType, idx: number) => (
      <style.component key={`${String(idx + 1)}`} {...props} />
    ),
  );

Sections.defaultProps = {
  type: "default",
};

export default Sections;
