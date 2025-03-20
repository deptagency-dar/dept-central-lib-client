import React, { FC } from 'react'
import { useLayer, Placement } from 'react-laag'
import { motion, AnimatePresence } from 'framer-motion'

export interface PopOverProps {
  content: React.ReactNode
  trigger: React.ReactNode
  placement?: Placement
  isOpen: boolean
  setOpen: (open: boolean) => void
}

export const PopOver: FC<PopOverProps> = ({
  content,
  trigger,
  placement = 'bottom-center',
  isOpen,
  setOpen,
}) => {
  const close = () => setOpen(false)

  const { renderLayer, triggerProps, layerProps } = useLayer({
    isOpen,
    onOutsideClick: close,
    onDisappear: close,
    overflowContainer: false,
    auto: true,
    placement,
    triggerOffset: 10,
    containerOffset: 10,
    snap: true,
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
            >
              {content}
            </motion.div>
          )}
        </AnimatePresence>,
      )}
    </>
  )
}
