import { css } from 'styled-components';
import { RuleSet } from 'styled-components/dist/types';

type FontRuleSet = ({ isBold }: { isBold: boolean }) => RuleSet<object>;

export const h1Font: FontRuleSet = ({ isBold }) => css`
  font-weight: ${isBold ? 'bold' : 'normal'};
  font-size: 1.75rem;
  line-height: 2.25rem;
`;

export const h2Font: FontRuleSet = ({ isBold }) => css`
  font-weight: ${isBold ? '600' : 'normal'};
  font-size: 1.375rem;
  line-height: 2rem;
`;

export const h3Font: FontRuleSet = ({ isBold }) => css`
  font-weight: ${isBold ? '600' : 'normal'};
  font-size: 1.125rem;
  line-height: 1.625rem;
`;

export const h4Font: FontRuleSet = ({ isBold }) => css`
  font-weight: ${isBold ? '600' : 'normal'};
  font-size: 1.063rem;
  line-height: 1.5rem;
`;

export const body1Font: FontRuleSet = ({ isBold }) => css`
  font-weight: ${isBold ? '600' : 'normal'};
  font-size: 0.938rem;
  line-height: 1.5rem;
`;
