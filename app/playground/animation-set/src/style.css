@import url("https://fonts.cdnfonts.com/css/thegoodmonolith");

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  background: #000;
  color: #f0f0f0;
  font-family: "TheGoodMonolith", monospace;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 20px;
}

h1 {
  margin-bottom: 30px;
  font-size: 24px;
  letter-spacing: 1px;
  text-align: center;
}

.container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
  max-width: 1000px;
  margin: 0 auto;
}

@media (max-width: 768px) {
  .container {
    grid-template-columns: repeat(2, 1fr);
  }
}
@media (max-width: 500px) {
  .container {
    grid-template-columns: 1fr;
  }
}

.animation-container {
  position: relative;
  width: 220px;
  height: 220px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(0, 0, 0, 0.5);
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: visible;
  transition: border-color 0.3s ease;
}

.animation-container:hover {
  border-color: rgba(255, 255, 255, 0.3);
}

.animation-title {
  margin-bottom: 10px;
  font-size: 12px;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  text-align: center;
}

.circle-container {
  position: relative;
  width: 180px;
  height: 180px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.dot {
  position: absolute;
  border-radius: 50%;
  background: #fff;
}

/* Corner decorations for all animation containers */
.corner {
  position: absolute;
  width: 16px;
  height: 16px;
  color: white;
  opacity: 0;
  z-index: 10;
  pointer-events: none;
  transition: opacity 0.3s ease;
}

.animation-container:hover .corner {
  opacity: 1;
}

.top-left {
  top: -8px;
  left: -8px;
  transition-delay: 0s;
}

.top-right {
  top: -8px;
  right: -8px;
  transform: rotate(90deg);
  transition-delay: 0.1s;
}

.bottom-left {
  bottom: -8px;
  left: -8px;
  transform: rotate(-90deg);
  transition-delay: 0.2s;
}

.bottom-right {
  bottom: -8px;
  right: -8px;
  transform: rotate(180deg);
  transition-delay: 0.3s;
}

/* 1. Pulsating Circles */
.pulse-dot {
  opacity: 0;
  transform-origin: center;
  animation: pulseFadeIn 3s infinite ease-in-out;
}
@keyframes pulseFadeIn {
  0% {
    opacity: 0;
    transform: scale(0.2);
  }
  40%,
  60% {
    opacity: 1;
    transform: scale(1);
  }
  100% {
    opacity: 0;
    transform: scale(0.2);
  }
}

/* 2. Rotating Orbits */
.orbit-container {
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  transform-style: preserve-3d;
  animation: rotate 8s infinite linear;
}
@keyframes rotate {
  to {
    transform: rotateZ(360deg);
  }
}

/* 3. Sequential Rings */
@keyframes expandRing {
  0% {
    transform: scale(0);
    opacity: 0;
  }
  20% {
    transform: scale(1);
    opacity: 1;
  }
  40%,
  100% {
    transform: scale(1.1);
    opacity: 0;
  }
}

/* 4. Concentric Rotations */
.concentric-container {
  position: absolute;
  width: 100%;
  height: 100%;
  transform-style: preserve-3d;
}
.concentric-ring {
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  transform-style: preserve-3d;
  animation: rotateRing linear infinite;
}
@keyframes rotateRing {
  to {
    transform: rotate(360deg);
  }
}

/* 5. Circular Waves */
.circular-wave-dot {
  animation: circularWave 3s infinite ease-in-out;
  transform-origin: center;
}
@keyframes circularWave {
  0% {
    transform: scale(0.7);
    opacity: 0.3;
  }
  50% {
    transform: scale(1.2);
    opacity: 1;
  }
  100% {
    transform: scale(0.7);
    opacity: 0.3;
  }
}

/* 6. Expanding Lines */
.line-container {
  position: absolute;
  width: 100%;
  height: 100%;
  animation: rotateLines 8s infinite linear;
  transform-origin: center;
}
@keyframes rotateLines {
  to {
    transform: rotate(360deg);
  }
}
.expanding-line {
  position: absolute;
  height: 1px;
  left: 50%;
  top: 50%;
  transform-origin: left center;
  background: rgba(255, 255, 255, 0.3);
  animation: expandLine 4s infinite ease-in-out;
}
@keyframes expandLine {
  0% {
    width: 0;
    opacity: 0;
  }
  20%,
  80% {
    width: 70px;
    opacity: 1;
  }
  100% {
    width: 0;
    opacity: 0;
  }
}

/* 7. Breathing Grid */
.breathing-dot {
  animation: breathe 4s infinite cubic-bezier(0.4, 0, 0.2, 1);
  transform-origin: center;
}
@keyframes breathe {
  0% {
    transform: scale(0.8);
    opacity: 0.3;
  }
  50% {
    transform: scale(1.3);
    opacity: 1;
  }
  100% {
    transform: scale(0.8);
    opacity: 0.3;
  }
}

/* 8. Ripple Effect */
.ripple-container {
  position: absolute;
  width: 100%;
  height: 100%;
}
.ripple-ring {
  position: absolute;
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  animation: ripple 4s infinite cubic-bezier(0, 0.5, 0.5, 1);
}
@keyframes ripple {
  0% {
    width: 0;
    height: 0;
    opacity: 1;
  }
  100% {
    width: 180px;
    height: 180px;
    opacity: 0;
  }
}

/* New ripple wave dot animation */
.ripple-wave-dot {
  position: absolute;
  border-radius: 50%;
  background: #fff;
  transform-origin: center;
}

@keyframes rippleWave {
  0%,
  100% {
    transform: scale(0.8);
    opacity: 0.3;
  }
  50% {
    transform: scale(1.8);
    opacity: 1;
  }
}

/* 9. Fibonacci Spiral (div version) */
.fibonacci-container {
  position: absolute;
  width: 100%;
  height: 100%;
  animation: rotateSlow 30s infinite linear;
  transform-origin: center;
}
@keyframes rotateSlow {
  to {
    transform: rotate(360deg);
  }
}
.fibonacci-dot {
  position: absolute;
  border-radius: 50%;
  background: #fff;
  animation: fibPulse 3s infinite ease-in-out;
}
@keyframes fibPulse {
  0%,
  100% {
    opacity: 0.2;
    transform: scale(0.8);
  }
  50% {
    opacity: 1;
    transform: scale(1.2);
  }
}

/* 10. Halftone Gradient */
.halftone-container {
  position: absolute;
  width: 100%;
  height: 100%;
  animation: rotateSlow 20s infinite linear;
  transform-origin: center;
}
.halftone-dot {
  position: absolute;
  border-radius: 50%;
  background: #fff;
  animation: halftoneFade 4s infinite ease-in-out;
}
@keyframes halftoneFade {
  0%,
  100% {
    opacity: 0.3;
    transform: scale(0.5);
  }
  50% {
    opacity: 1;
    transform: scale(1);
  }
}

/* 11. Silver Spiral */
.silver-container {
  position: absolute;
  width: 100%;
  height: 100%;
  animation: rotateSlow 25s infinite reverse linear;
  transform-origin: center;
}
.silver-dot {
  position: absolute;
  border-radius: 50%;
  background: #fff;
  animation: silverPulse 3s infinite ease-in-out;
}
@keyframes silverPulse {
  0%,
  100% {
    opacity: 0.2;
    transform: scale(0.7);
  }
  50% {
    opacity: 1;
    transform: scale(1.3);
  }
}
