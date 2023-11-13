interface Money {
  amount: number;
  currency: string;
  __typename: string;
}

interface ProductionBudget {
  budget: Money;
  __typename: string;
}

interface BoxOfficeGross {
  total: Money;
  __typename: string;
}

interface OpeningWeekendGross {
  gross: BoxOfficeGross;
  weekendEndDate: string;
  __typename: string;
}

interface Results {
  _id: string;
  id: string;
  productionBudget: ProductionBudget;
  lifetimeGross: BoxOfficeGross;
  openingWeekendGross: OpeningWeekendGross;
  worldwideGross: BoxOfficeGross;
}

export interface BudgetMovie {
  results: Results;
}
