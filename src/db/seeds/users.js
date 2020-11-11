import { BatchedBuffer } from '../../lib/batched-buffer';
import { generateUser } from '../../lib/generators/user';

export const seed = async function (knex) {
  await knex('user').del();

  const users = generateUser(2e5);
  const buffer = new BatchedBuffer(users, { bufferSize: 5000 });

  await buffer.process(async (batch) => {
    try {
      await knex.batchInsert('user', batch, batch.length);
      console.log(`Inserted ${batch.length} users...`);
    } catch (error) {
      console.error(error);
    }
  });
};
