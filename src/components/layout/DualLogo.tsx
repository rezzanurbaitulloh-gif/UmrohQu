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
          src="/logos/logo-icon.svg"
          alt="UmrohQu"
          width={40}
          height={40}
        />
      </div>
    )
  }

  if (textOnly) {
    return (
      <div className={`flex items-center ${className}`}>
        <Image
          src="/logos/logo-text.svg"
          alt="UmrohQu"
          width={140}
          height={30}
        />
      </div>
    )
  }

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className="flex items-center">
        <Image
          src="/logos/logo-icon.svg"
          alt="UmrohQu"
          width={36}
          height={36}
        />
      </div>
      <div className="flex items-center">
        <Image
          src="/logos/logo-text.svg"
          alt="UmrohQu"
          width={130}
          height={28}
        />
      </div>
    </div>
  )
}
