import Image from 'next/image'

export default function HeroImage({ image }) {
  return (
    <div>
      <Image
        src={image.url}
        width="1440"
        height="484"
        layout="responsive"
        alt={image.name}
        priority
      />
    </div>
  )
}
