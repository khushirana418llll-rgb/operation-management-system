import React from 'react'
import { HTMLMotionProps, motion } from 'framer-motion'

const PageWrapper = (props: HTMLMotionProps<'div'>) => {
  return (
    <motion.div
      {...props} // spread props here
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2 }} // adjust delay as needed
      className={`bg-white ${props.className ?? ''}`} // merge classes
    >
      {props.children}
    </motion.div>
  )
}

export default PageWrapper
