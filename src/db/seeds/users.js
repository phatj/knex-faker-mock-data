import { BatchedBuffer } from '../../lib/batched-buffer';
import { generateUser } from '../../lib/generators/user';
import { getNumericFromEnv } from '../../lib/utils';

export const seed = async function (knex) {
  await knex('user').del();

  const [numUsers, bufferSize] = getNumericFromEnv('NUM_USERS', 'BUFFER_SIZE');

  const users = generateUser(numUsers);
  const buffer = new BatchedBuffer(users, { bufferSize });

  await buffer.process(async (batch) => {
    try {
      await knex.batchInsert('user', batch, batch.length);
      console.log(`Inserted ${batch.length} users...`);
    } catch (error) {
      console.error(error);
    }
  });
};
