'use client';

import { useEffect, useState } from 'react';

interface Star {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  layer: number;
}

export function StarField() {
  const [stars, setStars] = useState<Star[]>([]);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    // 星を生成
    const generateStars = () => {
      const newStars: Star[] = [];
      // 3つのレイヤーで異なる速度の視差効果を実現
      const layers = [
        { count: 50, sizeRange: [1, 2], speed: 0.1 },
        { count: 30, sizeRange: [2, 3], speed: 0.3 },
        { count: 20, sizeRange: [3, 4], speed: 0.5 },
      ];

      let id = 0;
      layers.forEach((layer, layerIndex) => {
        for (let i = 0; i < layer.count; i++) {
          newStars.push({
            id: id++,
            x: Math.random() * 100,
            y: Math.random() * 100,
            size: Math.random() * (layer.sizeRange[1] - layer.sizeRange[0]) + layer.sizeRange[0],
            opacity: Math.random() * 0.5 + 0.3,
            layer: layerIndex,
          });
        }
      });

      setStars(newStars);
    };

    generateStars();

    // スクロールイベントのハンドラ
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 0 }}>
      {stars.map((star) => {
        const layerSpeeds = [0.1, 0.3, 0.5];
        const translateY = scrollY * layerSpeeds[star.layer];

        return (
          <div
            key={star.id}
            className="absolute rounded-full bg-white animate-pulse"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              opacity: star.opacity,
              transform: `translateY(-${translateY}px)`,
              transition: 'transform 0.1s linear',
            }}
          />
        );
      })}
    </div>
  );
}
