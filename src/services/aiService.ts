// AI Service for generating personalized greeting content
export interface GreetingVariation {
  id: string;
  text: string;
  style: 'formal' | 'casual' | 'poetic';
}

export async function generateGreetingVariations(
  recipientName: string,
  occasion: string,
  personalNote: string,
  festivalType?: string,
  weddingType?: string
): Promise<GreetingVariation[]> {
  // For MVP, we'll use predefined templates with dynamic content
  // In production, this would call OpenAI API
  
  const occasionContext = getOccasionContext(occasion, festivalType, weddingType);
  
  const variations: GreetingVariation[] = [
    {
      id: 'formal',
      style: 'formal',
      text: generateFormalGreeting(recipientName, occasionContext, personalNote)
    },
    {
      id: 'casual',
      style: 'casual', 
      text: generateCasualGreeting(recipientName, occasionContext, personalNote)
    },
    {
      id: 'poetic',
      style: 'poetic',
      text: generatePoeticGreeting(recipientName, occasionContext, personalNote)
    }
  ];

  return variations;
}

function getOccasionContext(occasion: string, festivalType?: string, weddingType?: string) {
  const contexts = {
    birthday: {
      emoji: '🎂🎉',
      wishes: ['another year of joy', 'happiness and success', 'wonderful memories'],
      actions: ['celebrate', 'party', 'make wishes']
    },
    anniversary: {
      emoji: '💖💕',
      wishes: ['continued love', 'togetherness', 'beautiful moments'],
      actions: ['celebrate your journey', 'cherish memories', 'look forward']
    },
    wedding: {
      emoji: weddingType === 'engagement' ? '💍✨' : '💒🎊',
      wishes: ['lifetime of happiness', 'endless love', 'beautiful future'],
      actions: ['begin forever', 'unite hearts', 'celebrate love']
    },
    festival: {
      emoji: getFestivalEmoji(festivalType),
      wishes: ['joy and prosperity', 'blessings', 'celebration'],
      actions: ['celebrate traditions', 'spread joy', 'share happiness']
    }
  };

  return contexts[occasion as keyof typeof contexts] || contexts.birthday;
}

function getFestivalEmoji(festivalType?: string) {
  const emojis = {
    diwali: '🪔✨',
    holi: '🎨🌈',
    christmas: '🎄🎅',
    eid: '🌙⭐',
    'raksha-bandhan': '🎗️👫',
    'new-year': '🎊🥳'
  };
  return emojis[festivalType as keyof typeof emojis] || '🎉✨';
}

function generateFormalGreeting(name: string, context: any, note: string): string {
  return `${context.emoji} Dear ${name},

On this special occasion, I extend my warmest wishes to you. May this celebration bring you ${context.wishes[0]} and fill your life with beautiful moments.

${note ? `${note}\n\n` : ''}With heartfelt regards and best wishes for your continued happiness and success.`;
}

function generateCasualGreeting(name: string, context: any, note: string): string {
  return `Hey ${name}! ${context.emoji}

Hope you have an absolutely amazing celebration! Wishing you all the ${context.wishes[1]} and lots of fun times ahead.

${note ? `${note}\n\n` : ''}Can't wait to ${context.actions[0]} with you! 🎉`;
}

function generatePoeticGreeting(name: string, context: any, note: string): string {
  return `${context.emoji} For ${name} ${context.emoji}

Like stars that shine in darkest night,
Your special day brings pure delight.
May ${context.wishes[2]} dance around,
And joy in every moment be found.

${note ? `${note}\n\n` : ''}Here's to you and all the magic this day brings! ✨`;
}