import Image from 'next/image'
import personPlus from '../../../public/icons/person-plus.svg'
import video from '../../../public/icons/video.svg'
import inbox from '../../../public/icons/inbox.svg'
import phone from '../../../public/icons/phone.svg'
import help from '../../../public/icons/help.svg'
import pin from '../../../public/icons/pin.svg'
import at from '../../../public/icons/at.svg'
import style from '../chatheader/ChatHeader.module.scss'
import ethLogo from '../../../public/eth.png'
import { useContext } from 'react'
// import { DiscordContext } from '../context/context'

const ChatHeader = () => {
//   const { roomName, currentAccount, connectWallet } = useContext(DiscordContext)
  return (
    <div className={style.chatHeader}>
      <div className={style.roomNameContainer}>
        <Image height={20} width={20} src={at} className={style.svg} alt='' />
        <h3 className={style.title}>roomname</h3>
        <div className={style.chatHeaderStatus} id='online' />
      </div>
      {/* {currentAccount ? (
        <div className={style.connectedWallet}>
          <Image src={ethLogo} height={20} width={15} alt='ethLogo' />
          <span className={style.separator}>{'|'}</span>
          {currentAccount.slice(0, 6)}...{currentAccount.slice(39)}
        </div>
      ) : (
        <div className={style.connectWallet} onClick={() => connectWallet()}>
          Connect Wallet
        </div>
      )} */}

      <div className={style.headerIconsContainer}>
        <div className={style.headerItem}>
          <Image
            height={25}
            width={25}
            src={phone}
            className={style.svg}
            alt=''
          />
        </div>
        <div className={style.headerItem}>
          <Image
            height={25}
            width={25}
            src={video}
            className={style.svg}
            alt=''
          />
        </div>
      </div>
      <div className={style.headerItem}>
        <Image height={25} width={25} src={pin} className={style.svg} alt='' />
      </div>
      <div className={style.headerItem}>
        <Image
          height={25}
          width={25}
          src={personPlus}
          className={style.svg}
          alt=''
        />
      </div>
      <div className={style.headerItem}>
        <input type='search' placeholder='Search' />
      </div>
      <div className={style.headerItem}>
        <Image
          height={25}
          width={25}
          src={inbox}
          className={style.svg}
          alt=''
        />
      </div>
      <div className={style.headerItem}>
        <Image
          height={25}
          width={25}
          src={help}
          className={style.svg}
          alt=''
        />
      </div>
    </div>
  )
}

export default ChatHeader