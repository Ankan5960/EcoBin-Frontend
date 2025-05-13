export function calculateEnvironmentalImpact(totalCO2InDustbins: number): {
  co2EmissionSaved: number;
  treesSaved: number;
} {
  if (typeof totalCO2InDustbins !== "number" || totalCO2InDustbins < 0) {
    console.error(
      "Invalid input: Total CO2 in dustbins must be a non-negative number."
    );
    return { co2EmissionSaved: 0, treesSaved: 0 }; // Return 0 for an invalid input.
  }

  const emissionSavingFactor = 2; // Assume 2kg of CO2 emission saved per 1kg of CO2 in dustbins.

  const co2EmissionSaved = totalCO2InDustbins * emissionSavingFactor;

  const co2AbsorbedByATreePerYear = 21; // kg/year
  const treesSaved = Math.floor(co2EmissionSaved / co2AbsorbedByATreePerYear);

  return { co2EmissionSaved, treesSaved };
}
