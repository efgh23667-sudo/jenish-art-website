# TODO.md - Particle Animation Fix

## Task: Fix particle animation in HERO section

### Steps Completed:
- [x] Analyze current implementation
- [x] Identify z-index and visibility issues
- [x] Update CSS z-index for canvas (0.5 → 1)
- [x] Improve particle visibility in JavaScript
- [x] Test the implementation

### Changes Made:
1. **CSS**: Changed `#hero-particles` z-index from 0.5 to 1 (above blur shapes, below hero content)
2. **JavaScript**: 
   - Added brighter color palette (#00e5ff, #40e0ff, #00bfff, #87cefa, #1e90ff)
   - Increased particle count from 60 to 80
   - Increased connection distance from 120 to 150
   - Increased mouse interaction distance from 150 to 200
   - Increased base opacity from 0.6-1.0 to 0.7-1.0
   - Enabled pulse effect on 50% of particles (was 40%)

