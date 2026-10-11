'use client';

import React, { useEffect, useState, useRef } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

export interface CursorTrailProps {
  /**
   * Color of the trailing comet dots.
   * Defaults to the portfolio's lavender accent (#C4B5FD).
   */
  color?: string;
  /**
   * Maximum diameter of the lead dot in pixels (default: 7px).
   * Subsequent dots gradually scale down.
   */
  size?: number;
  /**
   * Number of trailing dots in the comet tail (default: 7).
   */
  count?: number;
  /**
   * Optional custom CSS class name for the wrapper.
   */
  className?: string;
}

interface DotCoordinate {
  x: number;
  y: number;
}

/**
 * CursorTrail - A refined, subtle cursor trailing effect with spring/lag comet physics.
 * 
 * Features:
 * - Smooth spring-lag interpolation across successive trailing dots
 * - Comet-tail scale & opacity falloff
 * - Automatic window leave/enter detection
 * - Seamless collision avoidance with interactive badges (e.g. footer email hover badge)
 * - Full prefers-reduced-motion accessibility support
 */
export const CursorTrail: React.FC<CursorTrailProps> = ({
  color = '#C4B5FD',
  size = 7,
  count = 7,
  className = '',
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isBadgeActive, setIsBadgeActive] = useState(false);
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  const mousePosition = useRef({ x: -100, y: -100 });
  const points = useRef<DotCoordinate[]>(
    Array.from({ length: count }, () => ({ x: -100, y: -100 }))
  );
  const [, setRenderTick] = useState(0);

  useEffect(() => {
    // 1. Respect prefers-reduced-motion
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setIsReducedMotion(mediaQuery.matches);

    const handleMediaChange = (e: MediaQueryListEvent) => {
      setIsReducedMotion(e.matches);
    };

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleMediaChange);
    }

    if (mediaQuery.matches) return;

    // 2. Track mouse coordinates
    const handleMouseMove = (e: MouseEvent) => {
      mousePosition.current = { x: e.clientX, y: e.clientY };
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    // 3. Monitor circular arrow badge active state (to avoid visual clash)
    const observer = new MutationObserver(() => {
      const badge = document.getElementById('cursor-badge');
      if (badge && badge.classList.contains('is-active')) {
        setIsBadgeActive(true);
      } else {
        setIsBadgeActive(false);
      }
    });

    const badge = document.getElementById('cursor-badge');
    if (badge) {
      observer.observe(badge, { attributes: true, attributeFilter: ['class'] });
    }

    // 4. Spring / Lag Animation Loop
    let animId: number;
    const animate = () => {
      let leaderX = mousePosition.current.x;
      let leaderY = mousePosition.current.y;

      const currentPoints = points.current;
      for (let i = 0; i < count; i++) {
        // Progressive lag: lead dot follows closely, trailing dots follow previous with progressive lerp
        const lerpFactor = Math.max(0.18, 0.48 - i * 0.045);
        currentPoints[i].x += (leaderX - currentPoints[i].x) * lerpFactor;
        currentPoints[i].y += (leaderY - currentPoints[i].y) * lerpFactor;

        leaderX = currentPoints[i].x;
        leaderY = currentPoints[i].y;
      }

      setRenderTick((prev) => (prev + 1) % 100000);
      animId = requestAnimationFrame(animate);
    };

    animId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener('change', handleMediaChange);
      }
      observer.disconnect();
      cancelAnimationFrame(animId);
    };
  }, [count, isVisible]);

  if (isReducedMotion) {
    return null;
  }

  const shouldShow = isVisible && !isBadgeActive;

  return (
    <div
      className={`fixed inset-0 pointer-events-none z-[99999] overflow-hidden select-none transition-opacity duration-300 ${
        shouldShow ? 'opacity-100' : 'opacity-0'
      } ${className}`}
      aria-hidden="true"
    >
      {points.current.map((pt, i) => {
        // Calculate progressive falloff for size & opacity
        const progress = i / (count - 1 || 1);
        const dotSize = Math.max(2, size * (1 - progress * 0.65));
        const opacity = Math.max(0.06, 0.75 * Math.pow(1 - progress, 1.2));
        const glowRadius = i === 0 ? '0 0 10px rgba(196, 181, 253, 0.45)' : 'none';

        return (
          <div
            key={i}
            className="absolute rounded-full pointer-events-none will-change-transform"
            style={{
              width: `${dotSize}px`,
              height: `${dotSize}px`,
              backgroundColor: color,
              opacity: opacity,
              boxShadow: glowRadius,
              transform: `translate3d(${pt.x - dotSize / 2}px, ${pt.y - dotSize / 2}px, 0)`,
              transition: 'opacity 0.2s ease',
            }}
          />
        );
      })}
    </div>
  );
};

export default CursorTrail;
