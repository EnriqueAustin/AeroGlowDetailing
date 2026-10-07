// Centralized image asset resolver for Vite & static deployments
// Resolves safely across Vite dev server, production builds (dist/), and standard static hosting (GitHub Pages, Vercel, Netlify)

import aeroglowLogoTransparent from '../assets/images/mainLogo.png';
import headlightClearLens from '../assets/images/headlight_clear_lens_1790548092543.webp';
import headlightOxidizedLens from '../assets/images/headlight_oxidized_lens_1790548123675.webp';
import heroCinematicAutomotive from '../assets/images/hero_cinematic_automotive_1790548077922.webp';
import interiorCleanCabin from '../assets/images/interior_clean_cabin_1790771074615.webp';
import interiorLeatherStudio from '../assets/images/interior_leather_studio_1790548112651.webp';
import paintCorrectionGloss from '../assets/images/paint_correction_gloss_1790548103040.webp';
import paintSwirledSurface from '../assets/images/paint_swirled_surface_1790548135101.webp';
import westCoastWashFoam from '../assets/images/west_coast_wash_foam_1790771057247.webp';
import workshopStudioBay from '../assets/images/workshop_studio_bay_1790590219831.webp';
import ceramicWaterBeads from '../assets/images/ceramic_water_beads_1790590234481.webp';

export const IMAGES = {
  logo: aeroglowLogoTransparent,
  headlightClear: headlightClearLens,
  headlightOxidized: headlightOxidizedLens,
  heroAutomotive: heroCinematicAutomotive,
  interiorClean: interiorCleanCabin,
  interiorLeather: interiorLeatherStudio,
  paintCorrectionGloss: paintCorrectionGloss,
  paintSwirledSurface: paintSwirledSurface,
  westCoastWashFoam: westCoastWashFoam,
  workshopBay: workshopStudioBay,
  ceramicBeads: ceramicWaterBeads,
} as const;

export default IMAGES;
