import generateUpdateData from "./generateUpdateData";

const defaultPerson = {
  name: "John",
  age: 30,
  hobbies: ["reading", "sports"],
};

const updatedPerson = {
  name: "John",
  age: 31,
  hobbies: ["reading", "sports"],
};

const defaultNestedAddress = {
  name: "John",
  address: {
    city: "New York",
    zip: "10001",
  },
};

const updatedNestedAddress = {
  name: "John",
  address: {
    city: "Los Angeles",
    zip: "10001",
  },
};

describe("#generateUpdateData Suite", () => {
  it("should return an empty object if both objects are identical", () => {
    const result = generateUpdateData(defaultPerson, defaultPerson);
    expect(result).toEqual({});
  });

  it("should return the updated fields if there are differences", () => {
    const result = generateUpdateData(defaultPerson, updatedPerson);
    expect(result).toEqual({ age: 31 });
  });

  it("should return the updated nested fields if there are differences", () => {
    const result = generateUpdateData(
      defaultNestedAddress,
      updatedNestedAddress
    );
    expect(result).toEqual({
      address: {
        city: "Los Angeles",
      },
    });
  });

  it("should handle array differences correctly", () => {
    const defaultHobbies = {
      hobbies: ["reading", "sports"],
    };
    const updatedHobbies = {
      hobbies: ["reading", "music"],
    };

    const result = generateUpdateData(defaultHobbies, updatedHobbies);
    expect(result).toEqual({
      hobbies: ["reading", "music"],
    });
  });

  it("should handle adding new fields", () => {
    const defaultNameOnly = {
      name: "John",
    };
    const updatedWithAge = {
      name: "John",
      age: 30,
    };

    const result = generateUpdateData(defaultNameOnly, updatedWithAge);
    expect(result).toEqual({
      age: 30,
    });
  });

  it("should handle nested objects with arrays", () => {
    const defaultUserActivities = {
      user: {
        name: "John",
        activities: ["reading", "running"],
      },
    };
    const updatedUserActivities = {
      user: {
        name: "John",
        activities: ["reading", "swimming"],
      },
    };

    const result = generateUpdateData(
      defaultUserActivities,
      updatedUserActivities
    );
    expect(result).toEqual({
      user: {
        activities: ["reading", "swimming"],
      },
    });
  });

  it("should return an empty object if there are no updates", () => {
    const defaultUserActivities = {
      user: {
        name: "John",
        activities: ["reading", "running"],
      },
    };
    const identicalUserActivities = {
      user: {
        name: "John",
        activities: ["reading", "running"],
      },
    };

    const result = generateUpdateData(
      defaultUserActivities,
      identicalUserActivities
    );
    expect(result).toEqual({});
  });
});
