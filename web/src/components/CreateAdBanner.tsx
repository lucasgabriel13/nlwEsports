import { MagnifyingGlassPlus } from "phosphor-react";
import * as  Dialog from '@radix-ui/react-dialog';

export function CreateAdBanner() {
  return (
    <div className="pt-1 mt-8 bg-nlw-gradient self-stretch rounded-lg overflow-hidden">
      <div className="bg-[#2a2634] py-6 px-8 flex justify-between items-center">
        <div>
          <strong className="text-2xl text-white front-black block">Não encontrou o seu duo?</strong>
          <span className="text-zinc-400 block">Publique um anúncio para encontrar novos players!</span>
        </div>

        <Dialog.Trigger>
          <div className="py-3 px-4 font-medium bg-violet-500 hover:bg-violet-600 transition-colors text-white rounded flex items-center gap-3">
            <MagnifyingGlassPlus size={24} />
            Publicar anúncio
          </div>
        </Dialog.Trigger>
      </div>
    </div>
  )
}