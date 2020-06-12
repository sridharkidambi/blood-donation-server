import BloodGroup from "../models/blood-group";

const {
    A_POSITIVE,
    O_POSITIVE,
    B_POSITIVE,
    AB_POSITIVE,
    A_NEGATIVE,
    O_NEGATIVE,
    B_NEGATIVE,
    AB_NEGATIVE,
    ANY
} = BloodGroup;

const bloodMatchMap = {
    [A_POSITIVE]: [A_POSITIVE, A_NEGATIVE, O_POSITIVE, O_NEGATIVE],
    [O_POSITIVE]: [O_POSITIVE, O_NEGATIVE],
    [B_POSITIVE]: [B_POSITIVE, B_NEGATIVE, O_POSITIVE, O_NEGATIVE],
    [AB_POSITIVE]: [A_POSITIVE, O_POSITIVE, B_POSITIVE, AB_POSITIVE, A_NEGATIVE, O_NEGATIVE, B_NEGATIVE, AB_NEGATIVE],
    [A_NEGATIVE]: [A_NEGATIVE, O_NEGATIVE],
    [O_NEGATIVE]: [O_NEGATIVE],
    [B_NEGATIVE]: [B_NEGATIVE, O_NEGATIVE],
    [AB_NEGATIVE]: [AB_NEGATIVE, A_NEGATIVE, B_NEGATIVE, O_NEGATIVE],
    [ANY]: [A_POSITIVE, O_POSITIVE, B_POSITIVE, AB_POSITIVE, A_NEGATIVE, O_NEGATIVE, B_NEGATIVE, AB_NEGATIVE],
}

export const getMatchingBloodGroups = (type: BloodGroup) => bloodMatchMap[type];

export const isMatch = (required: BloodGroup, target: BloodGroup) => {
    const matchingGroups = getMatchingBloodGroups(required);
    return matchingGroups.find(bg => bg === target);
}