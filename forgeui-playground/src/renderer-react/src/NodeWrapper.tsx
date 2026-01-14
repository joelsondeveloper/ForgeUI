import { motion } from "framer-motion";
import { useInteractions } from "./hooks/useInteractions";

export function NodeWrapper({ node, children, style, onStateChange }: any) {
  // Passamos o handler para o hook conseguir disparar mudanças de estado
  const { handleClick } = useInteractions(node.interactions, onStateChange);

  if (node.type === 'Section') {
    return <>{children}</>;
  }

  return (
    <motion.div
      style={style}
      initial={node.motion?.initial}
      animate={node.motion?.animate}
      whileHover={node.motion?.whileHover}
      transition={node.motion?.transition}
      onClick={handleClick}
      data-forge-id={node.id}
      data-forge-type={node.type}
      className={`forge-node-${node.type.toLowerCase()}`}
    >
      {children}
    </motion.div>
  );
}