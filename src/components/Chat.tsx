import React, { useCallback, useEffect, useRef } from 'react';
import { x } from '@xstyled/emotion';

interface Props {
  isAI?: boolean;
  autoType?: boolean;
  isLoaderMessage?: boolean;
  message: string;
  scrollRef: React.MutableRefObject<HTMLDivElement | null>;
}

export const loaderMessage = '....';

const Chat: React.FC<Props> = ({
  isAI,
  message,
  autoType,
  isLoaderMessage,
  scrollRef,
}) => {
  const ref = useRef<HTMLDivElement | null>(null);
  let loaderInterval = useRef<number | NodeJS.Timer>(0);

  const handleTypeText = (text: string) => {
    let index = 0;

    let interval: number | NodeJS.Timer;
    if (ref.current) {
      ref.current.innerHTML = '';
    }

    interval = setInterval(() => {
      if (scrollRef.current) {
        // scrollRef.current.scrollTop = scrollRef.current?.scrollHeight;
        scrollRef.current?.scrollIntoView({
          behavior: 'smooth',
          block: 'end',
          inline: 'nearest',
        });
      }

      if (index < text.length) {
        if (ref.current) {
          ref.current.innerHTML += text.charAt(index);
        }

        index++;
      } else {
        clearInterval(interval);
      }
    }, 20);
  };

  const handleLoader = useCallback(() => {
    if (ref.current) {
      ref.current.innerHTML = '';
    }

    loaderInterval.current = setInterval(() => {
      if (ref.current) {
        ref.current.textContent += '.';

        if (ref.current.textContent === loaderMessage) {
          ref.current.textContent = '';
        }
      }
    }, 300);
  }, []);

  useEffect(() => {
    if (ref.current) {
      if (isAI && message && autoType && isLoaderMessage) {
        handleLoader();
      } else if (isAI && message && autoType) {
        handleTypeText(message);
      } else {
        ref.current.innerHTML = message;
      }
    }

    return () => {
      clearInterval(loaderInterval.current);
    };
  }, [autoType, isAI, message, isLoaderMessage, handleLoader, loaderInterval]);

  return (
    <x.div w='100%' p='0.938rem' bg={isAI ? 'primary-main-dark' : undefined}>
      <x.div
        w='100%'
        display='flex'
        flexDirection='row'
        alignItems='flex-start'
        gap='0.625rem'
      >
        <x.div
          w='2.25rem'
          h='2.25rem'
          borderRadius
          bg={isAI ? 'emerald-300' : 'indigo-500'}
          display='flex'
          alignItems='center'
          justifyContent='center'
        >
          <x.img
            src={isAI ? '/assets/bot.svg' : '/assets/user.svg'}
            alt={isAI ? 'bot' : 'user'}
            w='60%'
            h='60%'
            objectFit='contain'
          />
        </x.div>
        <x.div
          flex={1}
          color='true-gray-300'
          fontSize='1.25rem'
          maxW='100%'
          overflowX='auto'
          whiteSpace='pre-wrap'
          className='message'
          ref={ref}
        ></x.div>
      </x.div>
    </x.div>
  );
};

export default Chat;
