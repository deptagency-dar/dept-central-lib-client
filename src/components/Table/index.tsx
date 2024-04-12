import { Fragment, HTMLAttributes, forwardRef } from 'react'

interface TableOwnProps {
  head: HeadProps
  body: BodyProps
}

interface HeadProps {
  headers?: Array<string>
  className?: string
  headersComponent?: Array<JSX.Element>
}

interface BodyProps {
  bodyComponent: Array<Array<JSX.Element | string | (JSX.Element & string)>>
  className?: string
}

type TablePropsRootAttributes = Pick<
  HTMLAttributes<HTMLTableElement>,
  'className' | 'style' | 'id'
>

type TableProps = TablePropsRootAttributes & TableOwnProps

export const Table = forwardRef<HTMLTableElement, TableProps>(
  ({ className = '', body, head, ...rest }, ref) => {
    return (
      <table className={`table-auto ${className}`} ref={ref} {...rest}>
        <thead>
          <tr>
            {head.headers &&
              head.headers.map((header, index) => {
                return (
                  <th
                    key={`header-${index}`}
                    className="px-4 py-6 border-b border-b-gray-200 text-left"
                  >
                    <span className="text-gray-500 font-normal ">{header}</span>
                  </th>
                )
              })}
            {head.headersComponent &&
              head.headersComponent.map((header, index) => {
                return <Fragment key={`header-${index}`}>{header}</Fragment>
              })}
          </tr>
        </thead>
        <tbody>
          {body.bodyComponent.map((items, index) => {
            return (
              <tr
                key={`tr-item-${index}`}
                className="border-b border-b-gray-200"
              >
                {items.map((item, subIndex) => {
                  return (
                    <td
                      className="px-4 py-8 text-left text-nowrap"
                      key={`item-${subIndex}`}
                    >
                      {item}
                    </td>
                  )
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
    )
  },
)

Table.displayName = 'Table'
