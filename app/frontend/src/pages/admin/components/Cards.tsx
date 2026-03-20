interface CardProps{
  label: string;
  value: string;
  bgColor: string;
  iconColor: string;
  icon: any 
  // icon : React.ElementType
}

const Cards = ({icon:Icon, label, value, iconColor}:CardProps ) => {
  
  return (
    <div className=" mt-6 mb-3  border-4 border-zinc-800/50 hover:bg-zinc-800/80  rounded-md  transition-colors">
      <div className={`flex p-3 items-center gap-3 `}>
        <div className={iconColor }><Icon className="w-8 h-8 size-6" /></div>
        <div>
        <h1 className="text-2xl text-zinc-800 font-bold ">{label}</h1>
        <p className="text-zinc-400 mt-1">{value}</p>
        </div>
      </div>
    </div>
  )
}

export default Cards
