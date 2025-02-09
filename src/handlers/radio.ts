/**
 * Copyright 2021  Arnab Paryali and the Contributors - https://github.com/ArnabXD/TGVCBot/graphs/contributors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 */

import { Composer } from 'grammy';
import { commandExtractor } from '../utils';
import { tgcalls } from '../tgcalls';
import env from '../env';

const composer = new Composer();

export default composer;

composer.command(['radio', 'stream'], async (ctx) => {
  await ctx.api.sendChatAction(ctx.chat.id, 'record_voice');

  if (ctx.chat.type === 'private')
    return await ctx.reply('This Command works on Group Only');

  let { args: keyword } = commandExtractor(ctx.message!.text);
  if (!keyword) return await ctx.reply('Please provide a radio/stream link');

  if (!keyword.startsWith('http')) {
    return await ctx.reply('Invalid');
  }

  await tgcalls.streamOrQueue(
    { id: ctx.chat.id, name: ctx.chat.title },
    {
      link: keyword,
      title: 'Radio',
      image: env.THUMBNAIL,
      artist: '...',
      duration: '500',
      requestedBy: {
        id: ctx.from!.id,
        first_name: ctx.from!.first_name
      },
      mp3_link: keyword,
      provider: 'radio'
    }
  );
});
