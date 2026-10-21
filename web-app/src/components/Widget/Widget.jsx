import './widget.css'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import MonetizationOnOutlinedIcon from '@mui/icons-material/MonetizationOnOutlined';
import AccountBalanceWalletOutlinedIcon from '@mui/icons-material/AccountBalanceWalletOutlined';
import HourglassBottomIcon from '@mui/icons-material/HourglassBottom';
import AddAlertIcon from '@mui/icons-material/AddAlert';
import EmojiPeopleIcon from '@mui/icons-material/EmojiPeople';
import { width } from '@mui/material/node_modules/@mui/system';
import { sizeWidth } from '@mui/system';

const Widget = ({type}) => {

    let data;

    // temporary amount of money
   

    switch (type) {
        case 'users':
            data = {
                title: 'Le nombre des utilisateurs',
                isMoney: false,
                link: 'See All Users',
                icon: (
                    <PersonOutlinedIcon className='icon' style={{
                        color: 'crimson', 
                        fontSize:'35px',
                        backgroundColor: 'rgba(255, 0, 0, 0.2)'}} />
                ),
                value: localStorage.getItem("nbuser")
            }
            break;
        case 'orders':
            data = {
                title: 'Le nombre maximal des visiteurs',
                isMoney: false,
                link: 'See All Oders',
                icon: (
                    <AddAlertIcon className='icon' style={{
                        color: 'goldenrod', 
                        fontSize:'35px',
                        backgroundColor: 'rgba(218, 65, 32, 0.2)'}} 
                        
                        />
                ),
                value: localStorage.getItem("max")
            }
            break;
        case 'earnings':
            data = {
                title: 'Le nombre actuel des visiteurs',
                isMoney: true,
                link: 'View Earnings',
                icon: (
                    <EmojiPeopleIcon className='icon'  style={{
                        color: 'green', 
                        fontSize:'35px',
                        backgroundColor: 'rgba(0, 128, 0, 0.2)'}} />
                ),
                value: localStorage.getItem("cur")
            }
            break;
        case 'balance':
            data = {
                title: 'Le nombre des places disponibles',
                isMoney: true,
                link: 'See Details',
                icon: (
                    <HourglassBottomIcon className='icon' style={{
                        color: 'purple', 
                        fontSize:'35px',
                        backgroundColor: 'rgba(128, 0, 128, 0.2)'}} />
                ),
                value: localStorage.getItem("max")-localStorage.getItem("cur")
            }
            break;
        default:
            break;
    }



  return (
    <div className='widget'  style={{ height: '120px' }}>
        <div className='left'>
            <span className='title'>{data.title}</span>
            <span className='counter'>{data.value} </span>
            
        </div>
        <div className='right'>
            <div >
                
            {data.icon}
            </div>
                
        </div>
    </div>
  )
}

export default Widget