export const occasions = [
  {
    id: 'birthday' as const,
    title: 'Birthday',
    emoji: '🎂',
    description: 'Celebrate another year of joy',
    colors: {
      primary: 'from-purple-500 to-pink-500',
      secondary: 'from-purple-100 to-pink-100',
      accent: 'purple-500',
      text: 'purple-900'
    }
  },
  {
    id: 'anniversary' as const,
    title: 'Anniversary',
    emoji: '💖',
    description: 'Celebrate love and togetherness',
    colors: {
      primary: 'from-rose-500 to-red-500',
      secondary: 'from-rose-100 to-red-100',
      accent: 'rose-500',
      text: 'rose-900'
    }
  },
  {
    id: 'wedding' as const,
    title: 'Wedding',
    emoji: '💒',
    description: 'Celebrate the beginning of forever',
    colors: {
      primary: 'from-pink-300 to-rose-400',
      secondary: 'from-pink-50 to-rose-50',
      accent: 'pink-400',
      text: 'pink-900'
    }
  },
  {
    id: 'festival' as const,
    title: 'Festival',
    emoji: '🎉',
    description: 'Celebrate traditions and joy',
    colors: {
      primary: 'from-yellow-400 via-orange-500 to-red-500',
      secondary: 'from-yellow-100 to-orange-100',
      accent: 'orange-500',
      text: 'orange-900'
    }
  }
];

export const festivals = [
  { id: 'diwali', name: 'Diwali', emoji: '🪔', colors: 'from-yellow-400 to-orange-500' },
  { id: 'holi', name: 'Holi', emoji: '🎨', colors: 'from-pink-400 to-purple-500' },
  { id: 'christmas', name: 'Christmas', emoji: '🎄', colors: 'from-green-500 to-red-500' },
  { id: 'eid', name: 'Eid', emoji: '🌙', colors: 'from-blue-400 to-green-400' },
  { id: 'raksha-bandhan', name: 'Raksha Bandhan', emoji: '🎗️', colors: 'from-orange-400 to-red-400' },
  { id: 'new-year', name: 'New Year', emoji: '🎊', colors: 'from-purple-500 to-blue-500' },
  { id: 'other', name: 'Other Festival', emoji: '🎉', colors: 'from-indigo-400 to-purple-500' }
];

export const weddingTypes = [
  { id: 'invitation', name: 'Wedding Invitation', emoji: '💌' },
  { id: 'announcement', name: 'Wedding Announcement', emoji: '📢' },
  { id: 'save-the-date', name: 'Save the Date', emoji: '📅' },
  { id: 'reception', name: 'Reception Invitation', emoji: '🥂' },
  { id: 'engagement', name: 'Engagement Announcement', emoji: '💍' }
];

export const templates = [
  // Birthday Templates
  {
    id: 'birthday-balloons',
    name: 'Balloon Celebration',
    category: 'birthday',
    preview_url: 'https://images.pexels.com/photos/1729931/pexels-photo-1729931.jpeg',
    colors: { primary: 'from-purple-500 to-pink-500', secondary: 'from-purple-100 to-pink-100', accent: 'purple-500', text: 'purple-900' },
    animations: ['bounce', 'float']
  },
  {
    id: 'birthday-cake',
    name: 'Birthday Cake',
    category: 'birthday',
    preview_url: 'https://images.pexels.com/photos/1729931/pexels-photo-1729931.jpeg',
    colors: { primary: 'from-pink-400 to-rose-500', secondary: 'from-pink-100 to-rose-100', accent: 'pink-500', text: 'pink-900' },
    animations: ['sparkle', 'glow']
  },
  // Wedding Templates
  {
    id: 'wedding-elegant',
    name: 'Elegant Wedding',
    category: 'wedding',
    preview_url: 'https://images.pexels.com/photos/1729931/pexels-photo-1729931.jpeg',
    colors: { primary: 'from-rose-300 to-pink-400', secondary: 'from-rose-50 to-pink-50', accent: 'rose-400', text: 'rose-900' },
    animations: ['fade', 'slide']
  },
  {
    id: 'wedding-traditional',
    name: 'Traditional Indian',
    category: 'wedding',
    preview_url: 'https://images.pexels.com/photos/1729931/pexels-photo-1729931.jpeg',
    colors: { primary: 'from-red-500 to-orange-500', secondary: 'from-red-100 to-orange-100', accent: 'red-500', text: 'red-900' },
    animations: ['mandala', 'lotus']
  },
  // Festival Templates
  {
    id: 'diwali-diyas',
    name: 'Diwali Diyas',
    category: 'festival',
    festival: 'diwali',
    preview_url: 'https://images.pexels.com/photos/1729931/pexels-photo-1729931.jpeg',
    colors: { primary: 'from-yellow-400 to-orange-500', secondary: 'from-yellow-100 to-orange-100', accent: 'orange-500', text: 'orange-900' },
    animations: ['flicker', 'glow']
  },
  {
    id: 'holi-colors',
    name: 'Holi Colors',
    category: 'festival',
    festival: 'holi',
    preview_url: 'https://images.pexels.com/photos/1729931/pexels-photo-1729931.jpeg',
    colors: { primary: 'from-pink-400 to-purple-500', secondary: 'from-pink-100 to-purple-100', accent: 'purple-500', text: 'purple-900' },
    animations: ['splash', 'rainbow']
  }
];
export function getOccasionById(id: string) {
  return occasions.find(occasion => occasion.id === id);
}

export function getTemplatesByCategory(category: string, subType?: string) {
  return templates.filter(template => {
    if (template.category !== category) return false;
    if (subType && 'festival' in template && template.festival !== subType) return false;
    return true;
  });
}

export function getTemplateById(id: string) {
  return templates.find(template => template.id === id);
}