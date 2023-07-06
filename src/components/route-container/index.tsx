import { Variants, motion } from 'framer-motion'
import { RouteContainerProps } from './interface'

const routeContainerVariants: Variants = {
  initial: {
    opacity: 0,
    transition: {
      duration: 1,
    },
  },
  animate: {
    opacity: 1,
    transition: {
      duration: 1,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 1,
    },
  },
}

const RouteContainer: React.FC<RouteContainerProps> = ({
  children,
  routeKey,
}) => (
  <motion.div
    className="flex flex-col items-center grow justify-between"
    initial="initial"
    animate="animate"
    exit="exit"
    variants={routeContainerVariants}
    key={routeKey}
  >
    {children}
  </motion.div>
)

export default RouteContainer
