import styles from './CharacterGroup.module.scss'

type CharacterGroupProps = {
  className?: string
}

export function CharacterGroup({ className }: CharacterGroupProps) {
  const classNames = [styles.characters, className].filter(Boolean).join(' ')

  return (
    <img
      className={classNames}
      src="/characters/weddddy-character-group.png"
      alt=""
      aria-hidden="true"
      draggable="false"
    />
  )
}
