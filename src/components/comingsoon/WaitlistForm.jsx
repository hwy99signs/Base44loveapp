import React, { useState } from 'react';
import { supabase } from '@/api/supabaseClient';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, User, Heart, CheckCircle2, Sparkles, AlertCircle } from 'lucide-react';

export default function WaitlistForm({ translations }) {
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    relationship_status: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      // Validate email
      if (!formData.email) {
        throw new Error('Email is required');
      }

      // Insert into Supabase database
      const { data, error: insertError } = await supabase
        .from('waitlist_signups')
        .insert([
          {
            name: formData.name || null,
            email: formData.email,
            relationship_status: formData.relationship_status || null,
          },
        ])
        .select()
        .single();

      if (insertError) {
        // Handle duplicate email error gracefully
        if (insertError.code === '23505') {
          throw new Error('This email is already on the waitlist!');
        }
        throw insertError;
      }

      // Call Edge Function to send email notifications
      const { error: emailError } = await supabase.functions.invoke('send-waitlist-notifications', {
        body: {
          name: formData.name,
          email: formData.email,
          relationship_status: formData.relationship_status,
        },
      });

      // Don't fail the form submission if email fails - user is still signed up
      if (emailError) {
        console.warn('Email notification failed:', emailError);
      }
      
      setIsSuccess(true);
      setFormData({ email: '', name: '', relationship_status: '' });
    } catch (error) {
      console.error('Error joining waitlist:', error);
      setError(error.message || 'Failed to join waitlist. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative">
      <AnimatePresence mode="wait">
        {!isSuccess ? (
          <motion.form
            key="form"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, y: -20 }}
            onSubmit={handleSubmit}
            className="space-y-5"
          >
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                type="text"
                placeholder={translations.namePlaceholder}
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="pl-12 h-14 rounded-2xl border-2 border-gray-200 focus:border-purple-400 transition-colors text-base"
              />
            </div>

            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                type="email"
                placeholder={translations.emailPlaceholder}
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                className="pl-12 h-14 rounded-2xl border-2 border-gray-200 focus:border-purple-400 transition-colors text-base"
              />
            </div>

            <div className="relative">
              <Heart className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 z-10" />
              <Select
                value={formData.relationship_status}
                onValueChange={(value) => setFormData({ ...formData, relationship_status: value })}
              >
                <SelectTrigger className="pl-12 h-14 rounded-2xl border-2 border-gray-200 focus:border-purple-400 transition-colors text-base">
                  <SelectValue placeholder={translations.statusPlaceholder} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Single">{translations.statusOptions.single}</SelectItem>
                  <SelectItem value="Dating">{translations.statusOptions.dating}</SelectItem>
                  <SelectItem value="Engaged">{translations.statusOptions.engaged}</SelectItem>
                  <SelectItem value="Married">{translations.statusOptions.married}</SelectItem>
                  <SelectItem value="Others">{translations.statusOptions.other}</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full h-14 rounded-2xl bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-semibold text-base shadow-lg hover:shadow-xl transition-all duration-300"
            >
              {isSubmitting ? (
                <span className="flex items-center gap-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  {translations.submitting}
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5" />
                  {translations.submitButton}
                </span>
              )}
            </Button>

            {error && (
              <div className="flex items-center gap-2 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
                <AlertCircle className="w-5 h-5 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <p className="text-center text-sm text-gray-500">
              {translations.disclaimer}
            </p>
          </motion.form>
        ) : (
          <motion.div
            key="success"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-8"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', duration: 0.6 }}
              className="w-20 h-20 bg-gradient-to-br from-green-400 to-green-500 rounded-full flex items-center justify-center mx-auto mb-6"
            >
              <CheckCircle2 className="w-10 h-10 text-white" />
            </motion.div>
            
            <h3 className="text-2xl font-bold text-gray-900 mb-3">
              {translations.successTitle}
            </h3>
            
            <p className="text-gray-600 leading-relaxed max-w-sm mx-auto">
              {translations.successMessage}
            </p>

            <Button
              onClick={() => setIsSuccess(false)}
              variant="outline"
              className="mt-6 rounded-full px-8"
            >
              {translations.addAnother}
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}