
export interface Coordinates {
    lat: number;
    lon: number;
  }
  
  export interface GeoBoundingBox {
    top?: Coordinates;
    left?: Coordinates;
    bottom?: Coordinates;
    right?: Coordinates;
    bottom_left?: Coordinates;
    top_right?: Coordinates;
    bottom_right?: Coordinates;
    top_left?: Coordinates;
  }
  