export const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min) + min);
};

export const getNumericFromEnv = (...envs) => {
  return envs.map((env) => {
    const value = parseFloat(process.env[env]);

    if (Number.isNaN(value)) {
      throw new Error(
        `env ${env} is invalid: ${process.env[env]}; enter a numeric expression`
      );
    }

    return value;
  });
};
