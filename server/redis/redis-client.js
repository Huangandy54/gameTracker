import redis from 'redis';
import dotenv from 'dotenv'
dotenv.config();


export const client = redis.createClient({
    password: process.env.REDISPASSWORD,
    socket: {
        host: 'redis-18374.c60.us-west-1-2.ec2.cloud.redislabs.com',
        port: 18374
    }
});
client.connect();
client.on('connect', () => console.log('Connected to Redis Server'));
client.on('error', err => console.log('Redis Client Error', err));

export const redisGet= async(gameID)=>{
    const value = await client.get(gameID, (error) => {
          console.error(error);
    });
    JSON.parse(value);
    return value;
};

export const redisSet= async(gameID, data={})=>{
    console.log('set called ')
    const value = await client.set(gameID, JSON.stringify(data), (error) => {
          console.error(error);
    });
    return value;
};

export const redisKeys= async()=>{
    const keyList = await client.keys('*', (error) => {
          console.error(error);
    });
    return keyList;
};

export const redisDelete= async (key) =>{
    await client.del(key,(error)=>{
        console.log(error)
    })
}
