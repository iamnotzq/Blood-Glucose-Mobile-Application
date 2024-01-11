import { foodTips } from "../data";

export const displayFoodTip = () => {
  const randomIndex = Math.floor(Math.random() * foodTips.length);

  return foodTips[randomIndex];
};
