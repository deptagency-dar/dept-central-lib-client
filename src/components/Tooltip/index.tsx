import React, { FC, ReactNode, ReactElement } from 'react'
import { useLayer, useHover, Arrow, Placement } from 'react-laag'
import { motion, AnimatePresence } from 'framer-motion'

interface TooltipProps {
  children: ReactNode
  textComponent: ReactNode
  placement?: Placement
  maxWidth?: number
}

export const Tooltip: FC<TooltipProps> = ({
  children,
  textComponent,
  placement = 'top-center',
  maxWidth = 320,
}) => {
  const [isOver, hoverProps] = useHover({ delayEnter: 100, delayLeave: 300 })

  const { triggerProps, layerProps, arrowProps, renderLayer } = useLayer({
    isOpen: isOver,
    placement,
    triggerOffset: 8,
    auto: true,
    overflowContainer: false,
  })

  const variants = {
    visible: { opacity: 1, scale: 1 },
    hidden: { opacity: 0, scale: 0.9 },
  }

  if (!textComponent) return <>{children}</>

  const trigger =
    React.isValidElement(children) && typeof children !== 'string' ? (
      React.cloneElement(children as ReactElement, {
        ...triggerProps,
        ...hoverProps,
      })
    ) : (
      <span {...triggerProps} {...hoverProps}>
        {children}
      </span>
    )

  return (
    <>
      {trigger}
      {renderLayer(
        <AnimatePresence>
          {isOver && (
            <motion.div
              {...layerProps}
              style={{ maxWidth, ...layerProps.style }}
              className="bg-[#344054] text-white px-3 py-2 text-sm rounded shadow-lg"
              variants={variants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              transition={{ duration: 0.1 }}
            >
              {textComponent}
              <Arrow {...arrowProps} backgroundColor="#344054" size={6} />
            </motion.div>
          )}
        </AnimatePresence>,
      )}
    </>
  )
}
