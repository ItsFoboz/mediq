import React from 'react'

interface LanguageBadgeProps {
  language: string
  variant?: 'default' | 'prominent'
  className?: string
}

const flagMap: Record<string, string> = {
  english:    '🇬🇧',
  bulgarian:  '🇧🇬',
  german:     '🇩🇪',
  russian:    '🇷🇺',
  french:     '🇫🇷',
  spanish:    '🇪🇸',
  italian:    '🇮🇹',
  turkish:    '🇹🇷',
  greek:      '🇬🇷',
  arabic:     '🇸🇦',
  chinese:    '🇨🇳',
  japanese:   '🇯🇵',
  portuguese: '🇵🇹',
  dutch:      '🇳🇱',
  romanian:   '🇷🇴',
  serbian:    '🇷🇸',
}

function getFlag(language: string): string {
  return flagMap[language.toLowerCase()] ?? '🌐'
}

const LanguageBadge: React.FC<LanguageBadgeProps> = ({
  language,
  variant = 'default',
  className = '',
}) => {
  const flag = getFlag(language)
  const isEnglish = language.toLowerCase() === 'english'

  if (variant === 'prominent') {
    return (
      <span
        className={`
          inline-flex items-center gap-1.5
          px-3 py-1.5 rounded-full
          bg-[#0D9E6E]/10 text-[#0D9E6E]
          text-sm font-semibold font-sans
          ${className}
        `}
        title={`Speaks ${language}`}
      >
        <span role="img" aria-label={language} className="text-base leading-none">
          {flag}
        </span>
        <span>
          {isEnglish ? 'Speaks English' : `Speaks ${language}`}
        </span>
      </span>
    )
  }

  return (
    <span
      className={`
        inline-flex items-center gap-1
        px-2 py-0.5 rounded-full
        bg-gray-100 text-gray-600
        text-xs font-medium font-sans
        whitespace-nowrap
        ${className}
      `}
      title={language}
    >
      <span role="img" aria-label={language} className="leading-none">
        {flag}
      </span>
      <span>{language}</span>
    </span>
  )
}

export default LanguageBadge
export { LanguageBadge }
export type { LanguageBadgeProps }
