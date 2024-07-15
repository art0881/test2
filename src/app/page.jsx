
import Image from 'next/image';
import { gsap } from 'gsap';

import Text from './pageText'
import Aos from './ui/aosClient'
import Mouse from './ui/mouseGsap'
const Home=()=> {
  
  return (
    <div className='tx-center'>
      <Mouse />
      <h1>Page</h1>
    <br/>
    <Aos>
    <Text/>
    </Aos>
 </div>
  )
}
export default Home;