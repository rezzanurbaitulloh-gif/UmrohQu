import Image from 'next/image'

interface DualLogoProps {
  iconOnly?: boolean
  textOnly?: boolean
  className?: string
}

export function DualLogo({ iconOnly, textOnly, className = '' }: DualLogoProps) {
  if (iconOnly) {
    return (
      <div className={`flex items-center ${className}`}>
        <Image
          src="/assets/logo.jpg"
          alt="UmrohQu Logo"
          width={40}
          height={40}
          className="bg-transparent"
        />
      </div>
    )
  }

  if (textOnly) {
    return (
      <div className={`flex items-center ${className}`}>
        <Image
          src="/assets/nama-logo.jpg"
          alt="UmrohQu"
          width={140}
          height={30}
          className="bg-transparent"
        />
      </div>
    )
  }

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className="flex items-center">
        <Image
          src="/assets/logo.jpg"
          alt="UmrohQu Logo"
          width={36}
          height={36}
          className="bg-transparent"
        />
      </div>
      <div className="flex items-center">
        <Image
          src="/assets/nama-logo.jpg"
          alt="UmrohQu"
          width={130}
          height={28}
          className="bg-transparent"
        />
      </div>
    </div>
  )
}
