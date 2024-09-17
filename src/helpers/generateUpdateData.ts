type AnyObject = { [key: string]: any };

function isEqual(value1: any, value2: any): boolean {
  if (Array.isArray(value1) && Array.isArray(value2)) {
    return JSON.stringify(value1) === JSON.stringify(value2);
  } else if (typeof value1 === "object" && typeof value2 === "object") {
    return JSON.stringify(value1) === JSON.stringify(value2);
  } else {
    return value1 === value2;
  }
}

function generateUpdateData(
  defaultValue: AnyObject,
  updateValue: AnyObject
): AnyObject {
  const differences: AnyObject = {};

  for (const key in updateValue) {
    if (updateValue.hasOwnProperty(key)) {
      const value1 = defaultValue[key];
      const value2 = updateValue[key];

      if (Array.isArray(value1) && Array.isArray(value2)) {
        if (!isEqual(value1, value2)) {
          differences[key] = value2;
        }
      } else if (typeof value1 === "object" && typeof value2 === "object") {
        const nestedDifferences = generateUpdateData(value1, value2);
        if (Object.keys(nestedDifferences).length > 0) {
          differences[key] = nestedDifferences;
        }
      } else if (!isEqual(value1, value2)) {
        differences[key] = value2;
      }
    }
  }

  return differences;
}

export default generateUpdateData;
