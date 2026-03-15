'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { useGreeting } from '@/hooks/useGreeting';
import Avatar from '@/components/ui/Avatar';
import { formatCurrency, formatDate } from '@/lib/utils';
import { LANGUAGES, type Language } from '@/lib/translations';

function resizeImage(file: File, maxSize: number): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let { width, height } = img;

        if (width > height) {
          if (width > maxSize) {
            height = Math.round((height * maxSize) / width);
            width = maxSize;
          }
        } else {
          if (height > maxSize) {
            width = Math.round((width * maxSize) / height);
            height = maxSize;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (!ctx) { reject(new Error('Canvas context failed')); return; }
        ctx.drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL('image/jpeg', 0.8));
      };
      img.onerror = reject;
      img.src = e.target?.result as string;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export default function Header() {
  const { user, logout, updateProfilePic } = useAuth();
  const { t, language, setLanguage } = useLanguage();
  const greeting = useGreeting();
  const router = useRouter();
  const [showProfile, setShowProfile] = useState(false);
  const [showLangPicker, setShowLangPicker] = useState(false);
  const [uploadingPic, setUploadingPic] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setShowProfile(false);
        setShowLangPicker(false);
      }
    }
    if (showProfile) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [showProfile]);

  const handleLogout = () => {
    setShowProfile(false);
    logout();
    router.replace('/auth/login');
  };

  const handleLanguageSelect = (lang: Language) => {
    setLanguage(lang);
    setShowLangPicker(false);
  };

  const handleAvatarClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file');
      return;
    }

    setUploadingPic(true);
    try {
      const imageData = await resizeImage(file, 256);
      const result = await updateProfilePic(imageData);
      if (!result.success) {
        alert(result.error || 'Failed to update profile picture');
      }
    } catch {
      alert('Failed to process image');
    } finally {
      setUploadingPic(false);
      // Reset file input so same file can be selected again
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const currentLangInfo = LANGUAGES.find(l => l.code === language);

  return (
    <div className="px-4 py-4 flex items-center justify-between relative">
      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
      />

      {/* Subtle top glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-24 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

      {/* Avatar + Greeting — tap to open profile */}
      <div
        className="flex items-center gap-3 relative z-10 cursor-pointer"
        onClick={() => setShowProfile(!showProfile)}
      >
        <div className="relative">
          <Avatar name={user?.name || 'User'} src={user?.profile_pic_url} size="md" />
          {/* Small indicator dot */}
          <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-positive rounded-full border-2 border-background" />
        </div>
        <div>
          <p className="text-xs text-text-secondary">{greeting}</p>
          <p className="text-base font-semibold text-text-primary">
            {t('namaste')}, <span className="text-primary-light">{user?.name?.split(' ')[0] || 'User'}</span>
          </p>
        </div>
      </div>

      {/* Wallet balance */}
      <div className="flex items-center gap-1 bg-surface-card rounded-pill px-3 py-1.5 shadow-card border border-border/50 relative z-10">
        <svg className="w-4 h-4 text-accent" viewBox="0 0 24 24" fill="currentColor">
          <circle cx="12" cy="12" r="10" opacity="0.2" />
          <text x="12" y="16" textAnchor="middle" fontSize="12" fontWeight="bold" fill="currentColor">&#x20B9;</text>
        </svg>
        <span className="text-xs font-semibold text-text-primary">
          {formatCurrency(user?.wallet_balance || 0)}
        </span>
        <Link href="/wallet/recharge" className="ml-1 w-5 h-5 bg-gradient-to-r from-accent to-accent-light text-black rounded-full flex items-center justify-center text-xs font-bold shadow-glow-gold hover:shadow-elevated transition-all">
          +
        </Link>
      </div>

      {/* Profile Dropdown */}
      {showProfile && (
        <div
          ref={dropdownRef}
          className="absolute top-full left-4 right-4 mt-1 z-50 animate-fade-in"
        >
          <div className="bg-surface-card rounded-card border border-border/50 shadow-elevated overflow-hidden max-h-[75vh] overflow-y-auto">
            {/* User Info */}
            <div className="p-4 border-b border-border/30">
              <div className="flex items-center gap-3">
                {/* Tappable avatar with camera overlay */}
                <div className="relative group cursor-pointer" onClick={handleAvatarClick}>
                  <Avatar name={user?.name || 'User'} src={user?.profile_pic_url} size="lg" />
                  {/* Camera overlay */}
                  <div className={`absolute inset-0 rounded-full flex items-center justify-center transition-all ${
                    uploadingPic
                      ? 'bg-black/50'
                      : 'bg-black/0 group-hover:bg-black/40'
                  }`}>
                    {uploadingPic ? (
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <svg className="w-5 h-5 text-white opacity-0 group-hover:opacity-100 transition-opacity" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2v11z" />
                        <circle cx="12" cy="13" r="4" />
                      </svg>
                    )}
                  </div>
                  {/* Small camera badge */}
                  <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-primary rounded-full flex items-center justify-center border-2 border-surface-card shadow-sm">
                    <svg className="w-2.5 h-2.5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2v11z" />
                      <circle cx="12" cy="13" r="4" />
                    </svg>
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-text-primary truncate">
                    {user?.name || 'User'}
                  </p>
                  <p className="text-xs text-text-secondary">
                    {user?.phone || ''}
                  </p>
                  {user?.email && (
                    <p className="text-xs text-text-secondary truncate">
                      {user.email}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* User Details */}
            <div className="p-4 space-y-2.5 border-b border-border/30">
              <DetailRow
                icon="📅"
                label={t('dateOfBirth')}
                value={user?.dob ? formatDate(user.dob) : 'Not set'}
              />
              <DetailRow
                icon="🕐"
                label={t('timeOfBirth')}
                value={user?.tob || 'Not set'}
              />
              <DetailRow
                icon="📍"
                label={t('placeOfBirth')}
                value={user?.pob_city || 'Not set'}
              />
              <DetailRow
                icon="🌙"
                label={t('moonSign')}
                value={user?.moon_sign || 'Calculating...'}
              />
              <DetailRow
                icon="💰"
                label={t('walletBalance')}
                value={`₹${user?.wallet_balance || 0}`}
              />
            </div>

            {/* Language Selector */}
            <div className="p-2 border-b border-border/30">
              <button
                onClick={() => setShowLangPicker(!showLangPicker)}
                className="w-full flex items-center justify-between gap-3 px-3 py-2.5 rounded-lg hover:bg-primary/10 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="text-sm">🌐</span>
                  <span className="text-xs text-text-primary font-medium">{t('language')}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-primary font-semibold">{currentLangInfo?.nativeName}</span>
                  <svg className={`w-3 h-3 text-text-secondary transition-transform ${showLangPicker ? 'rotate-180' : ''}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="6,9 12,15 18,9" />
                  </svg>
                </div>
              </button>

              {/* Language Options */}
              {showLangPicker && (
                <div className="mt-1 mx-1 grid grid-cols-2 gap-1 animate-fade-in">
                  {LANGUAGES.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => handleLanguageSelect(lang.code)}
                      className={`flex items-center gap-2 px-3 py-2 rounded-lg text-left transition-all ${
                        language === lang.code
                          ? 'bg-primary/20 border border-primary/50 text-primary'
                          : 'hover:bg-surface-elevated text-text-secondary hover:text-text-primary'
                      }`}
                    >
                      <div className="flex flex-col">
                        <span className="text-[11px] font-semibold">{lang.nativeName}</span>
                        <span className="text-[9px] opacity-60">{lang.name}</span>
                      </div>
                      {language === lang.code && (
                        <svg className="w-3 h-3 ml-auto text-primary flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                          <polyline points="20,6 9,17 4,12" />
                        </svg>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="p-2">
              <Link
                href="/wallet/history"
                onClick={() => setShowProfile(false)}
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-primary/10 transition-colors"
              >
                <svg className="w-4 h-4 text-text-secondary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 8v4l3 3" />
                  <circle cx="12" cy="12" r="9" />
                </svg>
                <span className="text-xs text-text-primary font-medium">{t('transactionHistory')}</span>
              </Link>

              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-negative/10 transition-colors"
              >
                <svg className="w-4 h-4 text-negative" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" />
                  <polyline points="16,17 21,12 16,7" />
                  <line x1="21" y1="12" x2="9" y2="12" />
                </svg>
                <span className="text-xs text-negative font-medium">{t('logout')}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Detail row component
function DetailRow({ icon, label, value }: { icon: string; label: string; value: string }) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <span className="text-sm">{icon}</span>
        <span className="text-[11px] text-text-secondary">{label}</span>
      </div>
      <span className="text-[11px] font-semibold text-text-primary">{value}</span>
    </div>
  );
}
