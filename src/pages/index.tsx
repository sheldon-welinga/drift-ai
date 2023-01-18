import React, { FormEvent, Fragment, useRef, useState } from 'react';
import { NextPage } from 'next';
import { v4 as uuid } from 'uuid';

import { x } from '@xstyled/emotion';
import Chat, { loaderMessage } from '@/components/Chat';

interface Props {}

interface Message {
  id: string;
  question: string;
  answer: string;
}

const HomePage: NextPage<Props> = () => {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [message, setMessage] = useState<string>('');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();

      const id = uuid();

      const prompt = message;
      setMessage('');

      setMessages((prevMessages) => [
        ...prevMessages,
        {
          id,
          question: message,
          answer: loaderMessage,
        },
      ]);

      if (scrollRef.current) {
        scrollRef.current.scrollTop = scrollRef.current?.scrollHeight;
      }

      // scrollRef.current?.scrollIntoView({
      //   behavior: 'smooth',
      //   block: 'end',
      //   inline: 'nearest',
      // });

      const response = await fetch('/api/ai', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt,
        }),
      });

      scrollRef.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'end',
        inline: 'center',
      });

      if (!response.ok) {
        throw Error(response.statusText);
      }

      const responseData = await response.json();

      let answer = responseData.response_data.bot.trim();

      setMessages((prevMessages) =>
        prevMessages.map((prevMessage) => ({
          ...prevMessage,
          answer: prevMessage.id === id ? answer : prevMessage.answer,
        })),
      );
    } catch (err: any) {
      console.error(err.message);
    } finally {
      setMessage('');
    }
  };

  return (
    <x.div
      display='flex'
      flexDirection='column'
      alignItems='center'
      justifyContent='space-between'
      h='99vh'
      p='1rem'
      maxWidth='1280px'
      mx='auto'
    >
      <x.div my='1rem'>
        <x.h1 fontSize='2.5rem'>Drift AI</x.h1>
        <x.p>Ask drift ai anything</x.p>
      </x.div>
      <x.div
        id='chat-container'
        flex={1}
        w='100%'
        h='100%'
        overflow='hidden'
        overflowY='auto'
        display='flex'
        flexDirection='column'
        gap='0.625rem'
        pb='1.25rem'
        ref={scrollRef}
      >
        {messages.map((message) => (
          <Fragment key={message.id}>
            <Chat message={message.question} scrollRef={scrollRef} />
            <Chat
              isAI
              message={message.answer}
              autoType
              isLoaderMessage={message.answer === loaderMessage}
              scrollRef={scrollRef}
            />
          </Fragment>
        ))}
        <x.div />
      </x.div>
      <x.form
        w='100%'
        p='0.625rem'
        bg='primary-main-dark'
        display='flex'
        flexDirection='row'
        gap='0.625rem'
        onSubmit={handleSubmit}
      >
        <x.input
          w='100%'
          color='white'
          fontSize='1.125rem'
          p='0.625rem'
          bg='transparent'
          borderRadius
          border='none'
          outline={{ _: 'none', focus: 'none' }}
          // resize='none'
          // row={1}
          // cols={1}
          placeholder='Ask DriftAI...'
          lineHeight='100%'
          display='inline-flex'
          alignContent='center'
          alignItems='center'
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <x.button
          type='submit'
          outline={0}
          border={0}
          cursor='pointer'
          bg='transparent'
        >
          <x.img src='/assets/send.svg' w='1.875rem' h='1.875rem' />
        </x.button>
      </x.form>
    </x.div>
  );
};

export default HomePage;
