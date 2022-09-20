import express from "express";
import cors from 'cors'
import { PrismaClient } from '@prisma/client';
import { convertHourToMinute } from "./utils/convert-hour-to-minutes";
import { covertMinutesToHourString } from "./utils/convert-minutes-to-hour-string";

const app = express();

app.use(express.json());
app.use(cors())
app.listen(3333, () => {
  console.log("Application running on port 3333");
});

const prisma = new PrismaClient({
  log: ['query']
});

/* Routes */

app.get('/games', async (request, response) => {

  const games = await prisma.game.findMany({
    include: {
      _count: {
        select: {
          ads: true
        }
      }
    }
  })

  return response.json(games);
});

app.post('/games/:id/ads', async (request, response) => {

  const gameId = request.params.id;
  const body = request.body;

  const ad = await prisma.ad.create({
    data: {
      gameId,
      name: body.name,
      yearsPlaying: body.yearsPlaying,
      discordId: body.discordId,
      weekDays: body.weekDays.join(','),
      hourStart: convertHourToMinute(body.hourStart),
      hourEnd: convertHourToMinute(body.hourEnd),
      useVoiceChannel: body.useVoiceChannel,
    }
  });


  return response.status(201).json(ad);
});

app.get('/games/:id/ads', async (request, response) => {
  const gameId = request.params.id;

  const ads = await prisma.ad.findMany({
    select: {
      id: true,
      name: true,
      weekDays: true,
      useVoiceChannel: true,
      yearsPlaying: true,
      hourStart: true,
      hourEnd: true,
    },
    where: {
      gameId,
    },
    orderBy: {
      createdAd: 'desc'
    }
  })

  const adsFormatted = ads.map(ad => {
    return {
      ...ad,
      weekDays: ad.weekDays.split(','),
      hourStart: covertMinutesToHourString(ad.hourStart),
      hourEnd: covertMinutesToHourString(ad.hourEnd)
    }
  })

  return response.json(adsFormatted);
});

app.get('/ads/:id/discord', async (request, response) => {
  const adId = request.params.id;

  const ad = await prisma.ad.findUniqueOrThrow({
    select: {
      discordId: true
    },
    where: {
      id: adId,
    }
  })

  return response.json({
    discord: ad.discordId
  });
});

