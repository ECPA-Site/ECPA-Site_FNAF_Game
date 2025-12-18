export enum CameraId {
  ShowStage = '1A',
  DiningArea = '1B',
  PirateCove = '1C',
  WestHall = '2A',
  WestHallCorner = '2B',
  EastHall = '4A',
  EastHallCorner = '4B',
  Kitchen = '6',
  Backstage = '5',
  Restrooms = '7',
  SupplyCloset = '3'
}

export enum AnimatronicId {
  Freddy = 'freddy',
  Bonnie = 'bonnie',
  Chica = 'chica',
  Foxy = 'foxy'
}

export enum GameStatus {
  MENU = 'MENU',
  PLAYING = 'PLAYING',
  JUMPSCARE = 'JUMPSCARE',
  WON = 'WON',
  POWER_OUT = 'POWER_OUT'
}

export interface AnimatronicState {
  id: AnimatronicId;
  location: CameraId | 'OFFICE_DOOR_LEFT' | 'OFFICE_DOOR_RIGHT' | 'OFFICE_INSIDE' | 'STAGED';
  aiLevel: number; // 0-20
  movementOpportunity: number; // Counter for movement
  
  // Specific Logic Fields
  doorWaitTicks: number; // How long they have been standing at the door (10-40s)
  foxyStage: number; // 0=Hidden, 1=Peeking, 2=Stepping Out, 3=Gone (Running)
  isRunning: boolean; // Triggers the running animation event
}

export interface GameState {
  status: GameStatus;
  hour: number; // 0 = 12AM, 1 = 1AM, etc.
  timeTicks: number; // Internal counter for hour progression
  power: number; // 0-1000 (float representation)
  usage: number; // 1-5 bars
  
  // Office State
  doorLeftOpen: boolean;
  doorRightOpen: boolean;
  lightLeftOn: boolean;
  lightRightOn: boolean;
  
  // Camera State
  monitorOpen: boolean;
  currentCamera: CameraId;
  lastFoxyCheckTick: number; // When did we last look at 1C?
  
  // AI State
  animatronics: Record<AnimatronicId, AnimatronicState>;
  jumpscareTarget: AnimatronicId | null;
}