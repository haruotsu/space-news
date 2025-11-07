'use client';

export function Planets() {
  const planets = [
    {
      id: 1,
      size: 300,
      top: '10%',
      left: '80%',
      gradient: 'radial-gradient(circle at 30% 30%, #f97316, #ea580c 40%, #7c2d12 70%, #1a0a05)',
      shadowColor: 'rgba(249, 115, 22, 0.3)',
    },
    {
      id: 2,
      size: 200,
      top: '60%',
      left: '10%',
      gradient: 'radial-gradient(circle at 35% 35%, #06b6d4, #0891b2 40%, #164e63 70%, #0a1f2c)',
      shadowColor: 'rgba(6, 182, 212, 0.3)',
    },
    {
      id: 3,
      size: 150,
      top: '80%',
      left: '75%',
      gradient: 'radial-gradient(circle at 40% 40%, #8b5cf6, #7c3aed 40%, #4c1d95 70%, #1e0b37)',
      shadowColor: 'rgba(139, 92, 246, 0.3)',
    },
  ];

  return (
    <>
      {/* SVG Filter for Noise */}
      <svg className="absolute w-0 h-0">
        <defs>
          <filter id="noise">
            <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="4" stitchTiles="stitch" />
            <feColorMatrix type="saturate" values="0" />
            <feBlend mode="multiply" in="SourceGraphic" />
          </filter>
        </defs>
      </svg>

      <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 0 }}>
        {planets.map((planet) => (
          <div
            key={planet.id}
            className="absolute rounded-full"
            style={{
              width: `${planet.size}px`,
              height: `${planet.size}px`,
              top: planet.top,
              left: planet.left,
              background: planet.gradient,
              boxShadow: `0 0 60px ${planet.shadowColor}, inset -20px -20px 60px rgba(0, 0, 0, 0.5)`,
              transform: 'translate(-50%, -50%)',
              filter: 'url(#noise) blur(0.5px)',
              opacity: 0.8,
            }}
          />
        ))}
      </div>
    </>
  );
}
