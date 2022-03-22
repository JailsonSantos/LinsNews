import { useEffect, useState } from 'react';

export function Async() {

  /*   //Exemplo 1
    const [isButtonVisible, setIsButtonVisible] = useState(false);
  
    useEffect(() => {
      setTimeout(() => {
        setIsButtonVisible(true)
      }, 1000)
    }, [])
  
    return (
      <div>
        <div>Hello World</div>
        {isButtonVisible && <button>Button</button>}
      </div>
    )
   */
  //Exemplo 1
  const [isButtonInvisible, setIsButtonInvisible] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsButtonInvisible(true)
    }, 1000)
  }, [])

  return (
    <div>
      <div>Hello World</div>
      {!isButtonInvisible && <button>Button</button>}
    </div>
  )
}