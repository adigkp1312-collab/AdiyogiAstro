'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import KundliWatermark from '@/components/ui/KundliWatermark';

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: '',
    dob: '',
    tob: '',
    pob_city: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const router = useRouter();

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.dob) newErrors.dob = 'Date of birth is required';
    if (!formData.pob_city.trim()) newErrors.pob_city = 'Place of birth is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    const result = await register({
      name: formData.name.trim(),
      dob: formData.dob,
      tob: formData.tob || '',
      pob_city: formData.pob_city.trim().toUpperCase(),
    });
    setLoading(false);

    if (result.success) {
      router.push('/home');
    } else {
      setErrors({ form: result.error || 'Registration failed' });
    }
  };

  const updateField = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col starfield">
      {/* Kundli watermark */}
      <KundliWatermark className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" opacity={0.035} size={480} />

      <div className="flex-1 flex flex-col items-center justify-center px-6 max-w-md mx-auto w-full py-10 relative z-10">
        {/* Cosmic glow */}
        <div className="absolute top-10 right-5 w-36 h-36 bg-primary/8 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-10 w-28 h-28 bg-accent/8 rounded-full blur-3xl" />

        {/* Header */}
        <div className="text-center mb-8 animate-fade-in">
          <div className="w-20 h-20 bg-gradient-to-br from-primary via-purple-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-glow animate-float">
            <svg className="w-10 h-10 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="currentColor" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-text-primary text-glow">Complete Your Profile</h1>
          <p className="text-sm text-text-secondary mt-1">
            We need your birth details for accurate predictions
          </p>
        </div>

        {/* Registration Form */}
        <div className="w-full glass-card p-6 animate-slide-up">
          {errors.form && (
            <div className="bg-negative/10 text-negative text-sm p-3 rounded-button mb-4 border border-negative/30">
              {errors.form}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Full Name"
              placeholder="Enter your full name"
              value={formData.name}
              onChange={(e) => updateField('name', e.target.value)}
              error={errors.name}
              icon={
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              }
            />

            <div>
              <label className="block text-sm font-medium text-text-primary mb-1.5">
                Date of Birth
              </label>
              <input
                type="date"
                value={formData.dob}
                onChange={(e) => updateField('dob', e.target.value)}
                max={new Date().toISOString().split('T')[0]}
                className={`w-full px-4 py-3 rounded-button border ${errors.dob ? 'border-negative' : 'border-border'} bg-surface-card text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all duration-300`}
              />
              {errors.dob && <p className="mt-1 text-xs text-negative">{errors.dob}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-text-primary mb-1.5">
                Time of Birth <span className="text-text-secondary font-normal">(optional)</span>
              </label>
              <input
                type="time"
                value={formData.tob}
                onChange={(e) => updateField('tob', e.target.value)}
                className="w-full px-4 py-3 rounded-button border border-border bg-surface-card text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all duration-300"
              />
              <p className="mt-1 text-xs text-text-secondary">
                Exact birth time helps improve prediction accuracy
              </p>
            </div>

            <Input
              label="Place of Birth"
              placeholder="Enter city name (e.g., DELHI)"
              value={formData.pob_city}
              onChange={(e) => updateField('pob_city', e.target.value)}
              error={errors.pob_city}
              icon={
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
              }
            />

            <div className="pt-2">
              <Button
                type="submit"
                variant="accent"
                size="lg"
                fullWidth
                disabled={loading}
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Creating your profile...
                  </span>
                ) : (
                  'Start My Cosmic Journey ✨'
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
