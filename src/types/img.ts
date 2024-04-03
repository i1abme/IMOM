export interface Img {
  originalImageName: string;
  uploadImageName: string;
  imagePath: string;
  imageUrl: string;
}

export interface BannerImg extends Img {
  link: string;
}
