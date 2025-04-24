import { Fragment, HTMLAttributes, forwardRef } from 'react'
import cn from 'classnames'

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
  bodyComponent: Array<RowProps>
  className?: string
}

interface RowProps {
  data: Array<JSX.Element | string | (JSX.Element & string)>
  onClick?: () => void
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
                    className="px-4 py-3 border-b border-b-gray-200 text-left text-nowrap"
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
          {body.bodyComponent.map(({ data, onClick, className }, index) => {
            return (
              <tr
                key={`tr-item-${index}`}
                {...(onClick && { onClick })}
                className={cn(
                  'border-b border-b-gray-200',
                  onClick && 'cursor-pointer',
                  className,
                )}
              >
                {data.map((item, subIndex) => {
                  return (
                    <td
                      className="px-4 py-5 text-left"
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
