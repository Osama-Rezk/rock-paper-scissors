import {
  OptionsEnum,
  resultsMapAutomaticMode,
  resultsMapPlayerMode,
} from "../../types";
import {
  chooseRandomIndexFromTheArray,
  getRoundResults,
  getCurrentResultsDescription,
  getDescriptionMapByMode,
} from "../gameUtils";

const ARRAY_LENGTH = 5;

describe("testing chooseRandomIndexFromTheArray", () => {
  it("should generate index with in range", () => {
    const value = chooseRandomIndexFromTheArray(ARRAY_LENGTH);

    expect(value).toBeGreaterThanOrEqual(0);
    expect(value).toBeLessThan(ARRAY_LENGTH);
  });
});

describe("testing getRoundResults", () => {
  it("should return 0 if player choose the same choice", () => {
    expect(getRoundResults(OptionsEnum.Paper, OptionsEnum.Paper)).toBe(0);
  });

  it("should return 1 if player one is the winner", () => {
    expect(getRoundResults(OptionsEnum.Paper, OptionsEnum.Rock)).toBe(1);
  });

  it("should return 1 if player Two is the winner", () => {
    expect(getRoundResults(OptionsEnum.Paper, OptionsEnum.Scissors)).toBe(2);
  });
});

describe("testing getCurrentResultsDescription", () => {
  it("should return The Correct String From The Automatic Mode Map", () => {
    expect(
      getCurrentResultsDescription(
        OptionsEnum.Paper,
        OptionsEnum.Scissors,
        true
      )
    ).toBe(resultsMapAutomaticMode[2]);
  });

  it("should return The Correct String From The Player Mode Map", () => {
    expect(
      getCurrentResultsDescription(
        OptionsEnum.Paper,
        OptionsEnum.Scissors,
        false
      )
    ).toBe(resultsMapPlayerMode[2]);
  });
});

describe("testing getDescriptionMapByMode", () => {
  it("should return The Automatic Mode Map", () => {
    expect(getDescriptionMapByMode(true)).toBe(resultsMapAutomaticMode);
  });

  it("should return The Player Mode Map", () => {
    expect(getDescriptionMapByMode(false)).toBe(resultsMapPlayerMode);
  });
});
