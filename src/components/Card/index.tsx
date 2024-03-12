// Card.tsx
import { Children, forwardRef, HTMLAttributes, JSX, ReactNode } from 'react'
import styles from './index.module.css'

interface CardOwnProps {
  children: ValidCardChildren
}

type CardPropsRootAttributes = Pick<
  HTMLAttributes<HTMLDivElement>,
  'className' | 'style' | 'id'
>

type CardChild = JSX.Element & { type: { displayName: string } }

type ValidCardChildren = CardChild | CardChild[]

export type CardProps = CardPropsRootAttributes & CardOwnProps

const isCardChild = (child: ReactNode): child is CardChild =>
  ['CardHeader', 'CardBody', 'CardFooter'].includes(
    (child as CardChild).type.displayName || '',
  )

const CardHeader = forwardRef<HTMLDivElement, CardProps>(
  ({ className = '', children, ...rest }, ref) => {
    return (
      <div ref={ref} className={`${styles.header} ${className}`} {...rest}>
        {children}
      </div>
    )
  },
)

CardHeader.displayName = 'CardHeader'

const CardBody = forwardRef<HTMLDivElement, CardProps>(
  ({ className = '', children, ...rest }, ref) => {
    return (
      <div ref={ref} className={`${styles.body} ${className}`} {...rest}>
        {children}
      </div>
    )
  },
)

CardBody.displayName = 'CardBody'

const CardFooter = forwardRef<HTMLDivElement, CardProps>(
  ({ className = '', children, ...rest }, ref) => {
    return (
      <div ref={ref} className={`${styles.footer} ${className}`} {...rest}>
        {children}
      </div>
    )
  },
)

CardFooter.displayName = 'CardFooter'

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className = '', children, ...rest }, ref) => {
    const validChildren = Children.toArray(children).filter(isCardChild)
    return (
      <div ref={ref} className={`${styles.card} ${className}`} {...rest}>
        {validChildren}
      </div>
    )
  },
)

Card.displayName = 'Card'

export { Card, CardHeader, CardBody, CardFooter }
