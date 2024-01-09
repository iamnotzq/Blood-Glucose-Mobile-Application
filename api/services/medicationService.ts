import User, { Medication } from "../repositories/models/user";

export const updateMedicationList = async (
  medication: Medication,
  id: string
): Promise<string> => {
  try {
    const user = await User.findById(id);

    const medicationName = medication.medicationName;

    if (user.medicationExists(medicationName)) {
      throw new Error(
        `Medication ${medicationName} exists in user medicationList`
      );
    }

    const currentMedicationList = user.getMedicationList();
    currentMedicationList.push(medication);

    await user.save();

    return `Updated user ${id} medication list`;
  } catch (error: any) {
    throw new Error(`Error in addMedication: ${error}`);
  }
};
