export let asyncTools = {
  delay: (ms: number) => new Promise((res) => setTimeout(res, ms)),
};
