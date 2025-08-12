import Selectbox from "@/components/ui/Selectbox"
import icons from "../../icons"


const TopTracker = () => {
    const { Plus, Play, Stop, AngleRight } = icons
    return (
        <section className='flex items-center justify-between '>
            <div className="flex justify-center items-center gap-5">
                <button className="bg-green-600 rounded-full cursor-pointer size-10 flex justify-center 
                    items-center hover:bg-green-700 duration-300">
                    <Plus className="text-3xl hidden" />
                    <Play className="text-xl mb-.5 ml-1" />
                </button>
                <button className="bg-red-600 rounded-full cursor-pointer size-10 flex justify-center 
                    items-center hover:bg-red-700 duration-300">
                    <Stop className="text-xl" />
                </button>
                <Selectbox />
            </div>
            <div className="flex justify-center items-center gap-3">
                <button className="p-1 bg-dark rounded-full mt-1">
                    <AngleRight className="text-xl cursor-pointer" />
                </button>
                <p className="mt-1 text-2xl">یکشنبه</p>
                <button className="p-1 bg-dark rounded-full mt-1 rotate-180">
                    <AngleRight className="text-xl cursor-pointer" />
                </button>
            </div>
        </section>
    )
}

export default TopTracker