import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
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
      await base44.entities.WaitlistSignup.create(formData);
      
      // Personalized email content based on relationship status
      const personalizedContent = {
        single: {
          subject: 'Your Journey to Love Starts Here 💫',
          body: `Hi ${formData.name || 'there'}!\n\nThank you for joining the One 2 One Love waitlist!\n\nAs someone who's single, you're in the perfect position to prepare for a meaningful relationship. Our platform will help you:\n\n✨ Build self-awareness and emotional intelligence\n💪 Develop healthy relationship habits before you meet someone\n💝 Understand your love language and communication style\n🎯 Set clear relationship goals and values\n\nWhen we launch, you'll have access to tools and resources that help you become the best partner you can be - even before you find "the one."\n\nGet ready to invest in yourself and your future relationship!\n\nWith love,\nThe One 2 One Love Team\n\n---\nLove. Grow. Evolve. Together.`
        },
        dating: {
          subject: 'Strengthen Your Dating Journey 💕',
          body: `Hi ${formData.name || 'there'}!\n\nThank you for joining the One 2 One Love waitlist!\n\nNavigating the dating phase can be exciting and challenging. Our platform will help you:\n\n💬 Improve communication with your partner\n🎯 Set healthy boundaries and relationship expectations\n💝 Understand each other's love languages\n🌟 Create meaningful experiences together\n📈 Track your relationship growth and milestones\n\nWhen we launch, you'll get access to expert guidance, fun date ideas, and tools to help your relationship flourish during this important stage.\n\nWe're excited to support your journey together!\n\nWith love,\nThe One 2 One Love Team\n\n---\nLove. Grow. Evolve. Together.`
        },
        engaged: {
          subject: 'Prepare for Your Forever Together 💍',
          body: `Hi ${formData.name || 'there'}!\n\nThank you for joining the One 2 One Love waitlist! Congratulations on your engagement!\n\nThis exciting time is perfect for strengthening your foundation. Our platform will help you:\n\n💑 Build strong communication patterns before marriage\n🏡 Align on important life goals and values\n💰 Navigate important discussions (finances, family, future)\n💝 Keep romance alive during wedding planning stress\n🎉 Create rituals and traditions for your marriage\n\nWhen we launch, you'll have access to tools specifically designed to help engaged couples transition smoothly into married life.\n\nHere's to your beautiful journey ahead!\n\nWith love,\nThe One 2 One Love Team\n\n---\nLove. Grow. Evolve. Together.`
        },
        married: {
          subject: 'Deepen Your Marriage Connection ❤️',
          body: `Hi ${formData.name || 'there'}!\n\nThank you for joining the One 2 One Love waitlist!\n\nMarriage is a beautiful journey that requires continuous nurturing. Our platform will help you:\n\n💑 Strengthen your emotional and physical intimacy\n🔥 Reignite the spark and romance\n💬 Master conflict resolution and communication\n📅 Never miss important dates and anniversaries\n🎯 Set and achieve relationship goals together\n🌟 Create new memories and break routine patterns\n\nWhen we launch, you'll have access to expert advice, creative date ideas, and tools to help your marriage thrive for years to come.\n\nHere's to growing deeper in love!\n\nWith love,\nThe One 2 One Love Team\n\n---\nLove. Grow. Evolve. Together.`
        },
        other: {
          subject: 'Your Unique Love Journey Matters 🌈',
          body: `Hi ${formData.name || 'there'}!\n\nThank you for joining the One 2 One Love waitlist!\n\nEvery love story is unique, and we're here to support yours. Our platform will help you:\n\n💝 Build deeper connections in your relationship\n💬 Improve communication and understanding\n🌟 Create meaningful experiences together\n🎯 Set and achieve relationship goals\n🤝 Access inclusive, supportive resources\n\nWhen we launch, you'll have access to tools and guidance designed to support all types of relationships and love journeys.\n\nWe're honored to be part of your story!\n\nWith love,\nThe One 2 One Love Team\n\n---\nLove. Grow. Evolve. Together.`
        }
      };
      
      const emailContent = personalizedContent[formData.relationship_status] || personalizedContent.other;
      
      // Send personalized confirmation email to subscriber
      await base44.integrations.Core.SendEmail({
        from_name: 'One 2 One Love',
        to: formData.email,
        subject: emailContent.subject,
        body: emailContent.body
      });
      
      // Send notification email to admin
      await base44.integrations.Core.SendEmail({
        to: 'subscriptions@one2onelove.com',
        subject: '💕 [ONE2ONE WAITLIST] New Signup - One 2 One Love',
        body: `🌟 NEW WAITLIST SUBSCRIBER 🌟\n━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n✨ Another couple is joining the One 2 One Love journey!\n\nName: ${formData.name || 'Not provided'}\nEmail: ${formData.email}\nRelationship Status: ${formData.relationship_status || 'Not provided'}\n\n━━━━━━━━━━━━━━━━━━━━━━━━━━\nLove. Grow. Evolve. Together. 💜`
      });
      
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
                  <SelectItem value="single">{translations.statusOptions.single}</SelectItem>
                  <SelectItem value="dating">{translations.statusOptions.dating}</SelectItem>
                  <SelectItem value="engaged">{translations.statusOptions.engaged}</SelectItem>
                  <SelectItem value="married">{translations.statusOptions.married}</SelectItem>
                  <SelectItem value="other">{translations.statusOptions.other}</SelectItem>
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