import { AnimatronicId, CameraId } from "./types";

export const MAX_POWER = 1000; // Represents 100.0%
export const HOUR_DURATION_TICKS = 450; // How many game ticks per hour (approx 45s real time)
export const TICK_RATE_MS = 100; // Game loop runs every 100ms

export const CAMERAS = [
  { id: CameraId.ShowStage, label: 'Show Stage (1A)' },
  { id: CameraId.DiningArea, label: 'Dining Area (1B)' },
  { id: CameraId.PirateCove, label: 'Pirate Cove (1C)' },
  { id: CameraId.WestHall, label: 'West Hall (2A)' },
  { id: CameraId.WestHallCorner, label: 'W. Hall Corner (2B)' },
  { id: CameraId.EastHall, label: 'East Hall (4A)' },
  { id: CameraId.EastHallCorner, label: 'E. Hall Corner (4B)' },
  { id: CameraId.Kitchen, label: 'Kitchen (6)' },
  { id: CameraId.Backstage, label: 'Backstage (5)' },
  { id: CameraId.Restrooms, label: 'Restrooms (7)' },
  { id: CameraId.SupplyCloset, label: 'Supply Closet (3)' },
];

// Lore Accurate Paths
export const AI_PATHS: Record<AnimatronicId, CameraId[]> = {
  // Freddy: 1A -> 1B -> 7 -> 6 -> 4A -> 4B -> Office
  [AnimatronicId.Freddy]: [
    CameraId.ShowStage, 
    CameraId.DiningArea, 
    CameraId.Restrooms, 
    CameraId.Kitchen, 
    CameraId.EastHall, 
    CameraId.EastHallCorner
  ],
  
  // Bonnie: 1A -> 1B -> 5 -> 3 -> 2B -> Office (Left)
  [AnimatronicId.Bonnie]: [
    CameraId.ShowStage, 
    CameraId.DiningArea, 
    CameraId.Backstage, 
    CameraId.WestHall, 
    CameraId.SupplyCloset, 
    CameraId.WestHallCorner
  ],
  
  // Chica: 1A -> 1B -> 7 -> 6 -> 4A -> 4B -> Office (Right)
  [AnimatronicId.Chica]: [
    CameraId.ShowStage, 
    CameraId.DiningArea, 
    CameraId.Restrooms, 
    CameraId.Kitchen, 
    CameraId.EastHall, 
    CameraId.EastHallCorner
  ],
  
  // Foxy: 1C -> 2A -> Office (Run)
  [AnimatronicId.Foxy]: [CameraId.PirateCove, CameraId.WestHall] 
};

export const INITIAL_AI_LEVELS = {
  [AnimatronicId.Freddy]: 0, // Inactive on Night 1
  [AnimatronicId.Bonnie]: 5, // Increased from 3 to 5
  [AnimatronicId.Chica]: 5, // Increased from 3 to 5
  [AnimatronicId.Foxy]: 2, // Slow build up
};