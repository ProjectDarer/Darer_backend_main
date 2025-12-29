// Dummy data for the Twitch-style streaming dashboard

export interface Channel {
  id: string;
  username: string;
  displayName: string;
  avatar: string;
  streamTitle: string;
  category: string;
  categoryId: string;
  viewers: number;
  thumbnail: string;
  isLive: boolean;
  tags: string[];
  isPartner: boolean;
  followers: number;
  description: string;
}

export interface Category {
  id: string;
  name: string;
  image: string;
  viewers: number;
  tags: string[];
}

export interface ChatMessage {
  id: string;
  username: string;
  displayName: string;
  message: string;
  color: string;
  badges: string[];
  timestamp: Date;
}

export interface Notification {
  id: string;
  type: 'follow' | 'subscription' | 'raid' | 'mention' | 'system';
  title: string;
  message: string;
  avatar?: string;
  timestamp: Date;
  read: boolean;
}

export interface AnalyticsData {
  date: string;
  followers: number;
  views: number;
  streamHours: number;
  revenue: number;
}

export const channels: Channel[] = [
  {
    id: '1',
    username: 'ninja',
    displayName: 'Ninja',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop',
    streamTitle: 'FORTNITE WORLD CUP PRACTICE 🏆 !prime !merch',
    category: 'Fortnite',
    categoryId: 'fortnite',
    viewers: 45230,
    thumbnail: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=440&h=248&fit=crop',
    isLive: true,
    tags: ['English', 'Competitive', 'DropsEnabled'],
    isPartner: true,
    followers: 18500000,
    description: 'Professional Fortnite player and content creator. 18x Tournament Champion.',
  },
  {
    id: '2',
    username: 'pokimane',
    displayName: 'Pokimane',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
    streamTitle: 'Cozy Valorant Ranked with friends 💜',
    category: 'Valorant',
    categoryId: 'valorant',
    viewers: 32150,
    thumbnail: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=440&h=248&fit=crop',
    isLive: true,
    tags: ['English', 'FPS', 'Chill'],
    isPartner: true,
    followers: 9200000,
    description: 'Just chatting and gaming with the community!',
  },
  {
    id: '3',
    username: 'shroud',
    displayName: 'shroud',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
    streamTitle: 'CS2 RANK GRIND - Road to Global Elite',
    category: 'Counter-Strike 2',
    categoryId: 'cs2',
    viewers: 28900,
    thumbnail: 'https://images.unsplash.com/photo-1552820728-8b83bb6b2b0a?w=440&h=248&fit=crop',
    isLive: true,
    tags: ['English', 'FPS', 'Pro'],
    isPartner: true,
    followers: 10100000,
    description: 'Former CS:GO professional, now full-time streamer.',
  },
  {
    id: '4',
    username: 'xqc',
    displayName: 'xQc',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop',
    streamTitle: 'REACT ANDY - YOUTUBE VIDEOS + GAMING LATER',
    category: 'Just Chatting',
    categoryId: 'just-chatting',
    viewers: 67800,
    thumbnail: 'https://images.unsplash.com/photo-1593305841991-05c297ba4575?w=440&h=248&fit=crop',
    isLive: true,
    tags: ['English', 'Variety', 'React'],
    isPartner: true,
    followers: 12300000,
    description: 'Professional Overwatch player turned variety streamer.',
  },
  {
    id: '5',
    username: 'lirik',
    displayName: 'LIRIK',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
    streamTitle: 'GTA RP - NoPixel Day 1 of new update!',
    category: 'Grand Theft Auto V',
    categoryId: 'gta5',
    viewers: 41200,
    thumbnail: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=440&h=248&fit=crop',
    isLive: true,
    tags: ['English', 'Roleplay', 'Variety'],
    isPartner: true,
    followers: 2900000,
    description: 'Variety streaming since 2011. Longest active streamer on Twitch.',
  },
  {
    id: '6',
    username: 'summit1g',
    displayName: 'summit1g',
    avatar: 'https://images.unsplash.com/photo-1463453091185-61582044d556?w=100&h=100&fit=crop',
    streamTitle: 'Sea of Thieves Adventures 🏴‍☠️',
    category: 'Sea of Thieves',
    categoryId: 'sea-of-thieves',
    viewers: 18500,
    thumbnail: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=440&h=248&fit=crop',
    isLive: true,
    tags: ['English', 'Adventure', 'Chill'],
    isPartner: true,
    followers: 6100000,
    description: 'Former CS pro. Now sailing the seas.',
  },
  {
    id: '7',
    username: 'hasanabi',
    displayName: 'HasanAbi',
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&h=100&fit=crop',
    streamTitle: 'POLITICS + NEWS + REACT CONTENT',
    category: 'Just Chatting',
    categoryId: 'just-chatting',
    viewers: 35600,
    thumbnail: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=440&h=248&fit=crop',
    isLive: true,
    tags: ['English', 'Politics', 'News'],
    isPartner: true,
    followers: 2400000,
    description: 'Political commentator and Twitch streamer.',
  },
  {
    id: '8',
    username: 'moistcr1tikal',
    displayName: 'moistcr1tikal',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=100&h=100&fit=crop',
    streamTitle: 'Horror Game Marathon 👻',
    category: 'Horror',
    categoryId: 'horror',
    viewers: 22400,
    thumbnail: 'https://images.unsplash.com/photo-1509248961895-b5c3a4824bf0?w=440&h=248&fit=crop',
    isLive: true,
    tags: ['English', 'Horror', 'Variety'],
    isPartner: true,
    followers: 5800000,
    description: 'Charlie. Making content since 2009.',
  },
];

export const categories: Category[] = [
  {
    id: 'just-chatting',
    name: 'Just Chatting',
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=285&h=380&fit=crop',
    viewers: 423000,
    tags: ['IRL'],
  },
  {
    id: 'fortnite',
    name: 'Fortnite',
    image: 'https://images.unsplash.com/photo-1589241062272-c0a000072dfa?w=285&h=380&fit=crop',
    viewers: 187000,
    tags: ['Shooter', 'Battle Royale'],
  },
  {
    id: 'valorant',
    name: 'Valorant',
    image: 'https://images.unsplash.com/photo-1542751110-97427bbecf20?w=285&h=380&fit=crop',
    viewers: 165000,
    tags: ['FPS', 'Shooter'],
  },
  {
    id: 'league-of-legends',
    name: 'League of Legends',
    image: 'https://images.unsplash.com/photo-1560419015-7c427e8ae5ba?w=285&h=380&fit=crop',
    viewers: 156000,
    tags: ['MOBA', 'Strategy'],
  },
  {
    id: 'gta5',
    name: 'Grand Theft Auto V',
    image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=285&h=380&fit=crop',
    viewers: 142000,
    tags: ['RPG', 'Adventure'],
  },
  {
    id: 'cs2',
    name: 'Counter-Strike 2',
    image: 'https://images.unsplash.com/photo-1552820728-8b83bb6b2b0a?w=285&h=380&fit=crop',
    viewers: 134000,
    tags: ['FPS', 'Shooter'],
  },
  {
    id: 'minecraft',
    name: 'Minecraft',
    image: 'https://images.unsplash.com/photo-1587573089734-09cb69c0f2b4?w=285&h=380&fit=crop',
    viewers: 98000,
    tags: ['Sandbox', 'Survival'],
  },
  {
    id: 'apex-legends',
    name: 'Apex Legends',
    image: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=285&h=380&fit=crop',
    viewers: 87000,
    tags: ['Battle Royale', 'FPS'],
  },
  {
    id: 'music',
    name: 'Music',
    image: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=285&h=380&fit=crop',
    viewers: 76000,
    tags: ['IRL', 'Creative'],
  },
  {
    id: 'art',
    name: 'Art',
    image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=285&h=380&fit=crop',
    viewers: 45000,
    tags: ['Creative', 'IRL'],
  },
  {
    id: 'sports',
    name: 'Sports',
    image: 'https://images.unsplash.com/photo-1461896836934- voices-of-champions?w=285&h=380&fit=crop',
    viewers: 67000,
    tags: ['IRL', 'Sports'],
  },
  {
    id: 'horror',
    name: 'Horror',
    image: 'https://images.unsplash.com/photo-1509248961895-b5c3a4824bf0?w=285&h=380&fit=crop',
    viewers: 34000,
    tags: ['Horror', 'Adventure'],
  },
];

export const chatMessages: ChatMessage[] = [
  {
    id: '1',
    username: 'coolviewer123',
    displayName: 'CoolViewer123',
    message: 'LET\'S GOOO! 🔥🔥🔥',
    color: '#FF6B6B',
    badges: ['subscriber'],
    timestamp: new Date(),
  },
  {
    id: '2',
    username: 'gamerpro',
    displayName: 'GamerPro',
    message: 'That play was insane!',
    color: '#4ECDC4',
    badges: ['vip', 'subscriber'],
    timestamp: new Date(),
  },
  {
    id: '3',
    username: 'twitchfan',
    displayName: 'TwitchFan',
    message: 'First time here, loving the stream!',
    color: '#45B7D1',
    badges: [],
    timestamp: new Date(),
  },
  {
    id: '4',
    username: 'modmaster',
    displayName: 'ModMaster',
    message: 'Keep the chat clean, folks!',
    color: '#96CEB4',
    badges: ['moderator', 'subscriber'],
    timestamp: new Date(),
  },
  {
    id: '5',
    username: 'pogchamp2024',
    displayName: 'PogChamp2024',
    message: 'POGGERS',
    color: '#DDA0DD',
    badges: ['subscriber'],
    timestamp: new Date(),
  },
  {
    id: '6',
    username: 'nightowl',
    displayName: 'NightOwl',
    message: 'Can we get some Ws in chat?',
    color: '#F7DC6F',
    badges: ['subscriber'],
    timestamp: new Date(),
  },
  {
    id: '7',
    username: 'streamlover',
    displayName: 'StreamLover',
    message: 'WWWWWWWWWW',
    color: '#BB8FCE',
    badges: [],
    timestamp: new Date(),
  },
  {
    id: '8',
    username: 'epicgamer',
    displayName: 'EpicGamer',
    message: 'What\'s your sensitivity settings?',
    color: '#85C1E9',
    badges: ['subscriber'],
    timestamp: new Date(),
  },
];

export const notifications: Notification[] = [
  {
    id: '1',
    type: 'follow',
    title: 'New Follower',
    message: 'CoolViewer123 started following you',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=40&h=40&fit=crop',
    timestamp: new Date(Date.now() - 1000 * 60 * 5),
    read: false,
  },
  {
    id: '2',
    type: 'subscription',
    title: 'New Subscriber',
    message: 'GamerPro subscribed for 6 months!',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=40&h=40&fit=crop',
    timestamp: new Date(Date.now() - 1000 * 60 * 15),
    read: false,
  },
  {
    id: '3',
    type: 'raid',
    title: 'Raid Incoming!',
    message: 'StreamKing is raiding with 1,234 viewers',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop',
    timestamp: new Date(Date.now() - 1000 * 60 * 30),
    read: true,
  },
  {
    id: '4',
    type: 'mention',
    title: 'You were mentioned',
    message: '@user123 mentioned you in chat',
    timestamp: new Date(Date.now() - 1000 * 60 * 60),
    read: true,
  },
  {
    id: '5',
    type: 'system',
    title: 'Stream Summary',
    message: 'Your last stream had 5,234 peak viewers',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
    read: true,
  },
];

export const analyticsData: AnalyticsData[] = [
  { date: '2024-01-01', followers: 1000, views: 5000, streamHours: 4, revenue: 150 },
  { date: '2024-01-02', followers: 1050, views: 5500, streamHours: 5, revenue: 180 },
  { date: '2024-01-03', followers: 1120, views: 6200, streamHours: 6, revenue: 220 },
  { date: '2024-01-04', followers: 1180, views: 5800, streamHours: 4, revenue: 165 },
  { date: '2024-01-05', followers: 1250, views: 7100, streamHours: 8, revenue: 310 },
  { date: '2024-01-06', followers: 1340, views: 8500, streamHours: 7, revenue: 380 },
  { date: '2024-01-07', followers: 1420, views: 7800, streamHours: 5, revenue: 290 },
  { date: '2024-01-08', followers: 1500, views: 9200, streamHours: 9, revenue: 420 },
  { date: '2024-01-09', followers: 1580, views: 8100, streamHours: 6, revenue: 350 },
  { date: '2024-01-10', followers: 1680, views: 10500, streamHours: 10, revenue: 520 },
  { date: '2024-01-11', followers: 1780, views: 11200, streamHours: 8, revenue: 480 },
  { date: '2024-01-12', followers: 1900, views: 12800, streamHours: 9, revenue: 560 },
];

export const userProfile = {
  id: 'current-user',
  username: 'mystream',
  displayName: 'MyStream',
  email: 'user@example.com',
  avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
  bio: 'Variety streamer | Gaming enthusiast | Building a community!',
  followers: 15234,
  following: 234,
  isPartner: false,
  isAffiliate: true,
  createdAt: new Date('2022-06-15'),
  streamKey: 'live_xxxxxxxxxxxxxxxxxxxx',
  settings: {
    notifications: {
      email: true,
      push: true,
      raids: true,
      hosts: true,
    },
    privacy: {
      showOnline: true,
      allowWhispers: true,
    },
  },
};

export const followedChannels = channels.slice(0, 6);
