import { foodTips } from "../data";

export const displayFoodTip = () => {
  const randomIndex = Math.floor(Math.random() * foodTips.length);

  return foodTips[randomIndex];
};

const getActivityMultiplier = (activityLevel) => {
  switch (activityLevel) {
    case "Sedentary":
      return 1.2;
    case "Lightly":
      return 1.375;
    case "Moderately":
      return 1.55;
    case "Very":
      return 1.725;
    case "Extra":
      return 1.9;
    default:
      return 1.2;
  }
};

export const calculateCalories = (
  height,
  weight,
  gender,
  age,
  activityLevel
) => {
  let bmr;
  if (gender === "M") {
    bmr = 10 * weight + 6.25 * height - 5 * age + 5;
  } else {
    bmr = 10 * weight + 6.25 * height - 5 * age - 161;
  }

  const activityMultiplier = getActivityMultiplier(activityLevel);
  return parseInt(Math.round(bmr * activityMultiplier));
};
