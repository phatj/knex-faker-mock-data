import { BatchedBuffer } from '../../lib/batched-buffer';
import { generateUser } from '../../lib/generators/user';

export const seed = async function (knex) {
  await knex('user').del();

  await new Promise((resolve, reject) => {
    const numUsers = 2e3;
    let totalInserted = 0;

    const users = generateUser(numUsers);
    const buffer = new BatchedBuffer(users, { bufferSize: 250 });

    buffer.on('flush', async (batch) => {
      try {
        await knex.batchInsert('user', batch, batch.length);
        console.log(`Inserted ${batch.length} users...`);

        totalInserted += batch.length;

        if (totalInserted >= numUsers) {
          resolve(totalInserted);
        }
      } catch (error) {
        console.error(error);
        reject(error);
      }
    });

    buffer.process();
  });
};
