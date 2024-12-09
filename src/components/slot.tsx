import { motion } from 'framer-motion'

interface SlotProps {
  number: string
  spinning: boolean
}

export function Slot({ number, spinning }: SlotProps) {
  return (
    <motion.div
      className="w-24 h-32 bg-yellow-400 rounded-lg flex items-center justify-center mx-1 overflow-hidden"
      animate={spinning ? { y: [0, -20, 20, 0] } : {}}
      transition={spinning ? { duration: 0.2, repeat: Infinity } : {}}
    >
      <span className="text-6xl font-bold text-purple-900">{number}</span>
    </motion.div>
  )
}