import { css } from 'styled-components';
import { RuleSet } from 'styled-components/dist/types';

type FontRuleSet = ({ isBold }: { isBold: boolean }) => RuleSet<object>;

export const h1Font = () => css`
  font-size: 36px;
  font-weight: 700;
  line-height: 46px;
`;

export const h2Font = () => css`
  font-size: 28px;
  font-weight: 700;
  line-height: 38px;
`;

export const h3Font = () => css`
  font-size: 24px;
  font-weight: 700;
  line-height: 34px;
`;

export const b1Font:FontRuleSet = ({ isBold }) => css`
  font-size: 18px;
  font-weight: ${isBold ? '700' : '500'};
  line-height: 26px;
`;

export const b2Font:FontRuleSet = ({ isBold }) => css`
  font-size: 16px;
  font-weight: ${isBold ? '700' : '500'};
  line-height: 24px;
`;

export const b3Font:FontRuleSet = ({ isBold }) => css`
  font-size: 14px;
  font-weight: ${isBold ? '700' : '500'};
  line-height: 22px;
`;

export const b4Font:FontRuleSet = ({ isBold }) => css`
  font-size: 13px;
  font-weight: ${isBold ? '700' : '500'};
  line-height: 21px;
`;
