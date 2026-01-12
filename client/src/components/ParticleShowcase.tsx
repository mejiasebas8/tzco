import React, { useState } from 'react';
import ImprovedParticleFlower from './ImprovedParticleFlower';
import ImprovedParticleAnimation from './ImprovedParticleAnimation';

type ParticleType = 'flower' | 'vase';
type Theme = 'light' | 'dark' | 'colorful';

const ParticleShowcase: React.FC = () => {
  const [particleType, setParticleType] = useState<ParticleType>('flower');
  const [theme, setTheme] = useState<Theme>('light');
  const [interactive, setInteractive] = useState(false);
  const [showControls, setShowControls] = useState(true);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
          Improved Particle Design Showcase
        </h1>

        {/* Control Panel */}
        {showControls && (
          <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-semibold text-gray-700">Controls</h2>
              <button
                onClick={() => setShowControls(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                Hide
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Particle Type Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Particle Type
                </label>
                <div className="flex gap-2">
                  <button
                    onClick={() => setParticleType('flower')}
                    className={`flex-1 px-4 py-2 rounded-lg transition-colors ${
                      particleType === 'flower'
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    Flower (2D)
                  </button>
                  <button
                    onClick={() => setParticleType('vase')}
                    className={`flex-1 px-4 py-2 rounded-lg transition-colors ${
                      particleType === 'vase'
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    Vase (3D)
                  </button>
                </div>
              </div>

              {/* Theme Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Theme
                </label>
                <div className="flex gap-2">
                  <button
                    onClick={() => setTheme('light')}
                    className={`flex-1 px-4 py-2 rounded-lg transition-colors ${
                      theme === 'light'
                        ? 'bg-white text-gray-800 border-2 border-gray-300'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    Light
                  </button>
                  <button
                    onClick={() => setTheme('dark')}
                    className={`flex-1 px-4 py-2 rounded-lg transition-colors ${
                      theme === 'dark'
                        ? 'bg-gray-800 text-white'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    Dark
                  </button>
                  <button
                    onClick={() => setTheme('colorful')}
                    className={`flex-1 px-4 py-2 rounded-lg transition-colors ${
                      theme === 'colorful'
                        ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    Colorful
                  </button>
                </div>
              </div>

              {/* Interactive Toggle */}
              {particleType === 'flower' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Interaction
                  </label>
                  <button
                    onClick={() => setInteractive(!interactive)}
                    className={`w-full px-4 py-2 rounded-lg transition-colors ${
                      interactive
                        ? 'bg-green-500 text-white'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    {interactive ? 'Interactive (Hover)' : 'Non-Interactive'}
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {!showControls && (
          <div className="flex justify-center mb-4">
            <button
              onClick={() => setShowControls(true)}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              Show Controls
            </button>
          </div>
        )}

        {/* Particle Display */}
        <div className="bg-white rounded-lg shadow-2xl p-8">
          <div className="flex justify-center items-center" style={{ minHeight: '600px' }}>
            {particleType === 'flower' ? (
              <ImprovedParticleFlower
                theme={theme}
                interactive={interactive}
                config={{
                  targetFPS: 60,
                  flowSpeed: 1.0,
                }}
              />
            ) : (
              <div className="w-full h-full min-h-[600px]">
                <ImprovedParticleAnimation
                  config={{
                    backgroundColor: theme === 'dark' ? '#1a1a1a' : '#F8F6F0',
                    opacity: theme === 'dark' ? 0.6 : 0.4,
                  }}
                />
              </div>
            )}
          </div>
        </div>

        {/* Feature Highlights */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white rounded-lg shadow p-4">
            <h3 className="font-semibold text-gray-800 mb-2">🚀 Performance</h3>
            <p className="text-sm text-gray-600">
              Optimized rendering with FPS control and efficient memory management
            </p>
          </div>

          <div className="bg-white rounded-lg shadow p-4">
            <h3 className="font-semibold text-gray-800 mb-2">🎨 Themes</h3>
            <p className="text-sm text-gray-600">
              Multiple theme support with customizable colors and backgrounds
            </p>
          </div>

          <div className="bg-white rounded-lg shadow p-4">
            <h3 className="font-semibold text-gray-800 mb-2">🎯 Interactive</h3>
            <p className="text-sm text-gray-600">
              Mouse/touch interaction support for engaging user experiences
            </p>
          </div>

          <div className="bg-white rounded-lg shadow p-4">
            <h3 className="font-semibold text-gray-800 mb-2">📱 Responsive</h3>
            <p className="text-sm text-gray-600">
              Automatic resize handling and mobile-optimized configurations
            </p>
          </div>
        </div>

        {/* Code Example */}
        <div className="mt-8 bg-gray-800 rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold text-white mb-4">Usage Example</h2>
          <pre className="text-green-400 text-sm overflow-x-auto">
            <code>{`// Flower with custom config and interactivity
<ImprovedParticleFlower
  theme="colorful"
  interactive={true}
  config={{
    count: 25000,
    targetFPS: 60,
    flowSpeed: 1.2,
    opacity: 0.5
  }}
/>

// 3D Vase with custom appearance
<ImprovedParticleAnimation
  config={{
    particleCount: 40000,
    scale: 3.0,
    rotationSpeed: 0.3,
    backgroundColor: "#1a1a1a"
  }}
/>`}</code>
          </pre>
        </div>
      </div>
    </div>
  );
};

export default ParticleShowcase;
