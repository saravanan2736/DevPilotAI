import type { LucideIcon } from "lucide-react";
import { motion } from "framer-motion";

type FeatureCardProps = {
  icon: LucideIcon;
  title: string;
  description: string;
  delay: number;
};

function FeatureCard({
  icon: Icon,
  title,
  description,
  delay,
}: FeatureCardProps) {
  return (
      <motion.div
  className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6 transition hover:border-zinc-700"
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.5, delay }}
>
      <Icon className="h-6 w-6 text-blue-500" />

      <h3 className="mt-5 text-lg font-semibold text-white">
        {title}
      </h3>

      <p className="mt-2 leading-7 text-zinc-400">
        {description}
      </p>
    </motion.div>
  );
}

export default FeatureCard;
