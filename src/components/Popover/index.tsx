import React, { FC } from 'react'
import { useLayer, Placement, Arrow } from 'react-laag'
import { motion, AnimatePresence } from 'framer-motion'
import { classNames } from '../../utils'

export interface PopOverProps {
  content: React.ReactNode
  trigger: React.ReactNode
  placement?: Placement
  isOpen: boolean
  setOpen: (open: boolean) => void
  hideArrow?: boolean
  className?: string
}

export const PopOver: FC<PopOverProps> = ({
  content,
  trigger,
  placement = 'bottom-center',
  isOpen,
  setOpen,
  hideArrow = false,
  className,
}) => {
  const close = () => setOpen(false)

  const { renderLayer, triggerProps, layerProps, arrowProps } = useLayer({
    isOpen,
    onOutsideClick: close,
    onDisappear: close,
    overflowContainer: false,
    auto: true,
    placement,
    snap: true,
    triggerOffset: hideArrow ? 6 : 10,
  })

  const variants = {
    open: { opacity: 1, scale: 1 },
    closed: { opacity: 0, scale: 0.95 },
  }

  return (
    <>
      <div
        {...triggerProps}
        className="cursor-pointer"
        onClick={() => setOpen(!isOpen)}
      >
        {trigger}
      </div>
      {renderLayer(
        <AnimatePresence>
          {isOpen && (
            <motion.div
              {...layerProps}
              variants={variants}
              initial="closed"
              animate="open"
              exit="closed"
              className={classNames(
                'border-[1px] rounded-md bg-white',
                className,
              )}
            >
              {content}
              {!hideArrow && (
                <Arrow
                  {...arrowProps}
                  borderWidth={1}
                  borderColor="#e5e7eb"
                  backgroundColor="#FFF"
                />
              )}
            </motion.div>
          )}
        </AnimatePresence>,
      )}
    </>
  )
}
