import { Request, Response, NextFunction } from "express";
import { Coordinates, GeoBoundingBox } from "../types/locations";


export const isValidCoordinates = (coord: any): boolean =>
  typeof coord === "object" &&
  typeof coord.lat === "number" &&
  typeof coord.lon === "number";


export const sanitizeCity = (city: any): string => (typeof city === "string" ? city : "");


export const sanitizeStates = (states: any): string[] =>
  Array.isArray(states) && states.every(state => typeof state === "string" && state.length === 2)
    ? states
    : [];


export const sanitizeGeoBoundingBox = (geoBoundingBox: any): GeoBoundingBox | undefined => {
  if (typeof geoBoundingBox !== "object" || geoBoundingBox === null) return undefined;

  const validKeys = [
    "top", "left", "bottom", "right",
    "bottom_left", "top_right", "bottom_right", "top_left"
  ];


   const sanitizedBox = Object.fromEntries(
    Object.entries(geoBoundingBox).filter(
      ([key, value]) => validKeys.includes(key) && isValidCoordinates(value)
    )
  );


   const hasBoxFormat1 = "top" in sanitizedBox && "left" in sanitizedBox && "bottom" in sanitizedBox && "right" in sanitizedBox;
   const hasBoxFormat2 = "bottom_left" in sanitizedBox && "top_right" in sanitizedBox;
   const hasBoxFormat3 = "bottom_right" in sanitizedBox && "top_left" in sanitizedBox;

  return hasBoxFormat1 || hasBoxFormat2 || hasBoxFormat3 ? sanitizedBox : undefined;
};


export const sanitizeSize = (size: any): number | undefined =>
  typeof size === "number" && size > 0 ? size : undefined;


export const sanitizeFrom = (from: any): number | undefined =>
  typeof from === "number" ? from : undefined;


export const validateLocationSearchBody = (req: Request, res: Response, next: NextFunction): void => {
  req.body = {
    city: sanitizeCity(req.body.city),
    states: sanitizeStates(req.body.states),
    geoBoundingBox: sanitizeGeoBoundingBox(req.body.geoBoundingBox),
    size: sanitizeSize(req.body.size),
    from: sanitizeFrom(req.body.from),
  };

  next();
};

export default validateLocationSearchBody;
