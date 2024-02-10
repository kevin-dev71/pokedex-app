import ReactSelect, { type Props as ReactSelectProps } from "react-select"

export type DropdownType = ReactSelectProps

const Dropdown = ({ ...delegatedProps }: DropdownType) => {
  return <ReactSelect menuPlacement="auto" {...delegatedProps} />
}

export default Dropdown
