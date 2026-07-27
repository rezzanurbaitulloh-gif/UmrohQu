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
          src="/assets/logo.png"
          alt="UmrohQu Logo"
          width={40}
          height={40}
          className="object-contain"
        />
      </div>
    )
  }

  if (textOnly) {
    return (
      <div className={`flex items-center ${className}`}>
        <Image
          src="/assets/nama-logo.png"
          alt="UmrohQu"
          width={140}
          height={41}
          className="object-contain"
          style={{ height: 'auto' }}
        />
      </div>
    )
  }

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className="flex items-center">
        <Image
          src="/assets/logo.png"
          alt="UmrohQu Logo"
          width={36}
          height={36}
          className="object-contain"
        />
      </div>
      <div className="flex items-center">
        <Image
          src="/assets/nama-logo.png"
          alt="UmrohQu"
          width={130}
          height={39}
          className="object-contain"
          style={{ height: 'auto' }}
        />
      </div>
    </div>
  )
}
