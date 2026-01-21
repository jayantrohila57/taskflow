export interface HomePageProps {
  icon?: React.ReactNode
  heading: string
  description: string
  button: {
    text: string
    icon?: React.ReactNode
    url: string
  }
  trustText?: string
  imageSrc?: string
  imageAlt?: string
}
