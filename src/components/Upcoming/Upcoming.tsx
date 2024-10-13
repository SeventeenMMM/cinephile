import { useEffect, useRef, useState } from "react"
import upcomingStore, { selectUpcoming } from "../../store/upcomingStore"
import UpcomingItem from "./UpcomingItem"

const Upcoming:React.FC = () => {
  const fetchUpcoming = upcomingStore((state) => state.fetchUpcoming)
  const upcoming = upcomingStore(selectUpcoming)
  const [slideView, setSlideView] = useState<number>(0)
  const isMounted = useRef<boolean>(false)
  useEffect(() => {
    if(isMounted.current){
      const interval = setInterval(() => {
        if(upcoming && upcoming.length > 0){
          if(slideView < upcoming.length - 1){
            setSlideView(slideView + 1)
          }else{
            setSlideView(0)
          }
        }
      }, 10000)
      return () => clearInterval(interval)
    }    
    isMounted.current = true
  }, [slideView, upcoming])
  useEffect(() => {
    if(!upcoming){
      fetchUpcoming()
    }
  }, [fetchUpcoming, upcoming])
  
  
  const handleNextSlide = () => {
    if(upcoming){
      setSlideView((prevSlide) => prevSlide === upcoming.length - 1 ? 0 : prevSlide + 1)
    }
  }
  
  
  return (
    <section className="main__upcoming">
      { 
        upcoming && 
        <>
          {upcoming.map((movie, idx) => (
            <div key={idx} className={`main__upcoming-animate ${idx === slideView ? 'active' : ''}`}>
              <UpcomingItem 
                  movie={movie}
                  nextSlide={upcoming[slideView + 1 != upcoming.length ? slideView + 1 : 0]}
                  next={handleNextSlide}
                />
            </div>
          ))}
        </>
      }
    </section>
  )
}

export default Upcoming