import User, { Medication } from "../repositories/models/user";
import {
  AddMedicationRequestBody,
  UpdateMedicationDetailsRequestBody,
} from "../routes/models/requests/requestBodies";

export const getMedicationList = async (id: string): Promise<Medication[]> => {
  try {
    const user = await User.findById(id);

    return user.getMedicationList();
  } catch (error: any) {
    throw new Error(`Error in getMedicationList: ${error}`);
  }
};

export const updateMedicationDetails = async (
  id: string,
  requestBody: UpdateMedicationDetailsRequestBody
): Promise<boolean> => {
  try {
    const {
      originalMedicationName,
      editedMedicationName,
      editedDosage,
      editedTime,
    } = requestBody;

    const user = await User.findById(id);
    const medicationDetailsUpdated = user.updateMedicationDetails(
      originalMedicationName,
      editedMedicationName,
      editedDosage,
      editedTime
    );

    return medicationDetailsUpdated;
  } catch (error: any) {
    throw new Error(`Error in updateMedicationDetails: ${error}`);
  }
};

export const addMedication = async (
  requestBody: AddMedicationRequestBody,
  id: string
): Promise<string> => {
  const medication: Medication = {
    medicationName: requestBody.medicationName,
    dosage: requestBody.dosage,
    time: requestBody.time,
  };
  const medicationName = medication.medicationName;
  try {
    const user = await User.findById(id);

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
