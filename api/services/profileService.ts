import User, { UserDocument } from "../repositories/models/user";
import { ProfileScreenAssets } from "../dtos/profileDTOs";

export const getProfileScreenAssets = async (
  id: string
): Promise<ProfileScreenAssets> => {
  try {
    const user: UserDocument | null = await User.findById(id);

    const assets: ProfileScreenAssets = {
      firstName: user.firstName,
      lastName: user.lastName,
      age: user.age,
      diabetesType: user.diabetesType,
      weightKg: user.weightKg,
      heightCm: user.heightCm,
      caloricGoalKcal: user.caloricGoalKcal,
      hypoMgDl: user.hypoMgDl,
      targetLowerMgDl: user.targetLowerMgDl,
      targetUpperMgDl: user.targetUpperMgDl,
      hyperMgDl: user.hyperMgDl,
    };
    return assets;
  } catch (error) {
    throw new Error(`Errror`);
  }
};
