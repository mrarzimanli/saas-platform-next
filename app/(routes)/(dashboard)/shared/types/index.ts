// Post Types
export interface Post {
  postId: string;
  metric: PostMetric;
}

export interface PostMetric {
  likes: number;
  reach: number;
  saved: number;
  shares: number;
  comments: number;
  impressions: number;
  video_views: number;
  engagement_rate: number;
  total_interactions: number;
}

// Reels Types
export interface Reels {
  reelId: string;
  metric: ReelsMetric;
}

export interface ReelsMetric {
  likes: number;
  plays: number;
  reach: number;
  saved: number;
  shares: number;
  comments: number;
  engagement_rate: number;
  total_interactions: number;
}

// Performance Types
export interface MetricDifference {
  amount: number;
  unit: "number" | "%";
}

export interface Performance {
  id: string;
  name: string;
  value: number;
  difference: MetricDifference;
}
