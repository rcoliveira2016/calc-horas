export default defineEventHandler(() => {
  const config = useRuntimeConfig();
  return {
    env: process.env,
    config,
  };
});
