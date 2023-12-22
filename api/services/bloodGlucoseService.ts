import BloodGlucoseEntry from "../repositories/models/bloodGlucoseEntry";

import { AddBloodGlucoseEntryRequestBody } from "../routes/models/requests/requestBodies";

export const addBloodGlucoseEntry = async (
  requestBody: AddBloodGlucoseEntryRequestBody
): Promise<string> => {
  const newEntry = new BloodGlucoseEntry(requestBody);

  try {
    await newEntry.save();

    return newEntry._id;
  } catch (error: any) {
    console.error(`Error in adding glucose entry`);
    throw new Error(error.message);
  }
};
