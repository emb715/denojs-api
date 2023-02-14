
export type ChannelImage = {
  default: string
  small: string
  medium: string
  large: string
}

export type Channel = {
  id: string
  name: string
  title?: string
  images?: ChannelImage
  streamUrl: string
  streamAuth: {
    type: string
    key: string
  }
}