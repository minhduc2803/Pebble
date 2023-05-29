export const required = (fieldLabel: string) => (value?: string) => {
  return value ? undefined : `${fieldLabel} is required`;
};
