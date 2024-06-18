export const confirmSubscriptionTemplate = (url: string) => {
  return `
    <h1>Confirm Subscription</h1>
    <p>Click the link below to confirm your subscription:</p>
    <a href="${url}">Confirm Subscription</a>
  `;
};
