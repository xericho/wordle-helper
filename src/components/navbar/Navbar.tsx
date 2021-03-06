import {
    SupportIcon,
    SearchIcon,
    CollectionIcon,
    ChartBarIcon,
    CogIcon,
    InformationCircleIcon,
  } from '@heroicons/react/outline'
  import { GAME_TITLE } from '../../constants/strings'
  
  type Props = {
    setIsInfoModalOpen: (value: boolean) => void
    setIsWordListModalOpen: (value: boolean) => void
    setIsSettingsModalOpen: (value: boolean) => void
  }
  
  export const Navbar = ({
    setIsInfoModalOpen,
    setIsWordListModalOpen,
    setIsSettingsModalOpen,
  }: Props) => {
    return (
      <div className="navbar ">
        <div className="navbar-content ">
          <InformationCircleIcon
            className="h-6 w-6 ml-2 cursor-pointer dark:stroke-white"
            onClick={() => setIsInfoModalOpen(true)}
          />
          <p className="text-xl game-title font-bold dark:text-white font-['Sansita_Swashed']">{GAME_TITLE}</p>
          <div className="right-icons">
            <SupportIcon
              className="h-6 w-6 mr-3 cursor-pointer dark:stroke-white"
              onClick={() => setIsWordListModalOpen(true)}
            />
            <CogIcon
              className="h-6 w-6 mr-3 cursor-pointer dark:stroke-white"
              onClick={() => setIsSettingsModalOpen(true)}
            />
          </div>
        </div>
        <hr></hr>
      </div>
    )
  }