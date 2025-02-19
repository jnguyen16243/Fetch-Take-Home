export {}
import { Request, Response, NextFunction } from "express";

const VALID_SORT_FIELDS = ["breed", "name", "age"];

const validateSearchDogs = (req: Request, res: Response, next: NextFunction): void => {
  const query = { ...req.query };
  let { breeds, zipCodes, ageMin, ageMax, size, from, sort } = query;

//need to fix this later 
  if (Array.isArray(breeds)) {
    breeds = breeds.filter((b) => typeof b === "string").slice(0, 100);
  } else if (typeof breeds === "string") {
    breeds = [breeds];
  } else {
    breeds = undefined;
  }


  if (Array.isArray(zipCodes)) {
    zipCodes = zipCodes.filter((z) => typeof z === "string").slice(0, 50);
  } else if (typeof zipCodes === "string") {
    zipCodes = [zipCodes];
  } else {
    zipCodes = undefined;
  }


  const parsedAgeMin = Number(ageMin);
  ageMin = !isNaN(parsedAgeMin) ? String(parsedAgeMin) : undefined;

  const parsedAgeMax = Number(ageMax);
  ageMax = !isNaN(parsedAgeMax) ? String(parsedAgeMax) : undefined;

  const parsedSize = Number(size);
  size = !isNaN(parsedSize) ? String(parsedSize) : "25"; 

  const parsedFrom = Number(from);
  from = !isNaN(parsedFrom) ? String(parsedFrom) : "0"; 

  const sortRegex = new RegExp(`^(${VALID_SORT_FIELDS.join("|")}):(asc|desc)$`);
  if (typeof sort === "string" && !sortRegex.test(sort)) {
    sort = undefined;
  }

  Object.assign(req.query, {
    ...(breeds ? { breeds } : {}),
    ...(zipCodes ? { zipCodes } : {}),
    ...(ageMin !== undefined ? { ageMin } : {}),
    ...(ageMax !== undefined ? { ageMax } : {}),
    size,
    from,
    ...(sort ? { sort } : {}),
  });

  next();
};

export default validateSearchDogs;
