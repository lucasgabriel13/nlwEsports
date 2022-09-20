import { useEffect, useState } from 'react';
import { CreateAdBanner } from './components/CreateAdBanner';
import { GameBanner } from './components/GameBanner';
import { CreateAdModal } from './components/CreateAdModal';
import axios from 'axios';
import * as Dialog from '@radix-ui/react-dialog';
import logoNlw from './assets/logo-nlw-esports.svg';
import { useKeenSlider, } from 'keen-slider/react';

import 'keen-slider/keen-slider.min.css'

interface Game {
  id: string;
  title: string;
  bannerUrl: string;
  _count: {
    ads: number;
  }
}

export default function App() {
  const [games, setGames] = useState<Game[]>([]);

  const MutationPlugin = (slider: any) => {
    const observer = new MutationObserver(function (mutations) {
      mutations.forEach(function (mutation) {
        slider.update()
      })
    })
    const config = { childList: true }
    observer.observe(slider.container, config)
  }

  const [sliderRef] = useKeenSlider<HTMLDivElement>({
    loop: false,
    mode: "free-snap",
    breakpoints: {
      '(max-width: 500px)': {
        slides: {
          perView: 2,
          origin: 'auto',
        },
      },
    },
    slides: {
      perView: 5,
      origin: 'auto',
      spacing: 24,
    },
  },
    [MutationPlugin])

  useEffect(() => {
    axios.get('http://localhost:3333/games').then(({ data }) => {
      setGames(data);
    })
  }, []);

  return (
    <div className="max-w-[1344px] mx-auto flex flex-col items-center my-20">
      <img src={logoNlw} alt="" />

      <h1 className="text-6xl text-white font-black mt-20">
        Seu <span className="bg-nlw-gradient bg-clip-text text-transparent">duo</span> está aqui.
      </h1>

      <div ref={sliderRef} className="keen-slider mt-16">
        {games.map(game => (
          <GameBanner
            key={game.id}
            bannerUrl={game.bannerUrl}
            title={game.title}
            adsCount={game._count.ads}
          />
        ))}
      </div>
      <Dialog.Root>
        <CreateAdBanner />
        <CreateAdModal />
      </Dialog.Root>
    </div>
  );
}