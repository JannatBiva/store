export type ContentCardDTO = {
  id?: string | number;
  title: string;
  shortDescription?: string;
  price?: number;
  priceBDT?: number;
  originalPriceBDT?: number;
  discountPct?: number;
  imageUrl?: string;
  imagePath?: string;

  sellerName?: string;
  sellerAvatarUrl?: string; 
  sellerAvatarPath?: string;
};
