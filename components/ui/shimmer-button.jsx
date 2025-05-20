'use client';
import React from "react";
import styles from './ShimmerButton.module.css';
import { cn } from "@/lib/utils";

const ShimmerButton = React.forwardRef((
  {
    shimmerColor = "#ffffff",
    shimmerSize = "0.05em",
    shimmerDuration = "3s",
    borderRadius = "100px",
    background = "rgba(0, 0, 0, 1)",
    className,
    children,
    ...props
  },
  ref
) => {
  return (
    <button
      ref={ref}
      {...props}
      style={{
        "--spread": "90deg",
        "--shimmer-color": shimmerColor,
        "--radius": borderRadius,
        "--speed": shimmerDuration,
        "--cut": shimmerSize,
        "--bg": background
      }}
      className={cn(styles.button, className)}
    >
      <div className={styles.sparkContainer}>
        <div className={styles.spark}>
          <div className={styles.sparkBefore} />
        </div>
      </div>

      {children}

      <div className={styles.highlight} />
      <div className={styles.backdrop} />
    </button>
  );
});

ShimmerButton.displayName = "ShimmerButton";
export { ShimmerButton };
