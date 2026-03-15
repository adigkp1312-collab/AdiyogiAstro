'use client';

import Header from '@/components/layout/Header';
import CurrentDasha from '@/components/home/CurrentDasha';
import DailyHoroscope from '@/components/home/DailyHoroscope';
import WelcomeGiftBanner from '@/components/home/WelcomeGiftBanner';
import QuickChatInput from '@/components/home/QuickChatInput';
import ExploreMoreGrid from '@/components/home/ExploreMoreGrid';
import AstrologerCarousel from '@/components/home/AstrologerCarousel';
import PromoBanner from '@/components/home/PromoBanner';
import SectionDivider from '@/components/ui/SectionDivider';
import KundliWatermark from '@/components/ui/KundliWatermark';
import InstallPrompt from '@/components/pwa/InstallPrompt';
import { useLanguage } from '@/contexts/LanguageContext';

export default function HomePage() {
  const { t } = useLanguage();

  return (
    <div className="bg-background min-h-screen starfield">
      {/* Kundli watermark backgrounds */}
      <KundliWatermark className="top-20 -left-20" opacity={0.035} size={450} />
      <KundliWatermark className="top-[800px] -right-24" opacity={0.025} size={400} color="#F59E0B" />
      <KundliWatermark className="top-[1600px] left-1/2 -translate-x-1/2" opacity={0.02} size={500} />

      <div className="relative z-10">
        <Header />
        <CurrentDasha />
        <DailyHoroscope />
        <WelcomeGiftBanner />
        <QuickChatInput />

        <SectionDivider label={t('exploreMore')} />
        <ExploreMoreGrid />

        <SectionDivider label={t('topAstrologers')} />
        <AstrologerCarousel />

        <SectionDivider label={t('specialOffer')} />
        <PromoBanner />

        {/* Trust Footer */}
        <div className="mx-4 mt-6 mb-4 text-center">
          <div className="flex items-center justify-center gap-4 mb-3">
            <div className="text-center">
              <p className="text-sm font-bold text-primary-light">15 Lakh+</p>
              <p className="text-[10px] text-text-secondary">{t('securedChats')}</p>
            </div>
            <div className="w-px h-8 bg-border" />
            <div className="text-center">
              <p className="text-sm font-bold text-primary-light">100+</p>
              <p className="text-[10px] text-text-secondary">{t('verifiedAstrologers')}</p>
            </div>
            <div className="w-px h-8 bg-border" />
            <div className="text-center">
              <p className="text-sm font-bold text-primary-light">24/7</p>
              <p className="text-[10px] text-text-secondary">{t('aiAvailable')}</p>
            </div>
          </div>
          <p className="text-xs text-text-secondary">
            {t('madeInIndia')}
          </p>
          <p className="text-[10px] text-text-secondary mt-1 mb-2">
            Predictions are for guidance purposes only
          </p>
        </div>
      </div>

      {/* PWA Install Prompt */}
      <InstallPrompt />
    </div>
  );
}
